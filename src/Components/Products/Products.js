import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import CreateProductForm from '../CreateProductForm/CreateProductForm';
import Product from '../Product/Product';

const Products = () => {
    const [ products, setProducts ] = useState([]);
    const [ createProductModal, setCreateProductModal ] = useState(false);

    const handleCreateProductModal = () => {
        setCreateProductModal(!createProductModal);
    };

    useEffect(() => {
        fetch("http://localhost:5000/product")
            .then(res => res.json())
            .then(data => setProducts(data.result))
            .catch(err => console.log(err));
    }, [products])

    return (
        <>  
            {/* Modal For Create Product */}
            <button className='btn btn-primary m-5' onClick={handleCreateProductModal}>Create Product</button>
            <Modal show={createProductModal} onHide={handleCreateProductModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <CreateProductForm />            
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCreateProductModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> 

            <Row xs={1} md={6} className="g-4 m-5">
                {
                    products.map(product => <Product key={product._id} product={product} />)
                }
            </Row>
        </>
    );
};

export default Products;