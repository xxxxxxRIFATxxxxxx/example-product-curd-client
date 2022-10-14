import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import EditProductForm from '../EditProductForm/EditProductForm';

const Product = ({product}) => {
    const [ editModal, setEditModal ] = useState(false);

    const handleDeleteProduct = (id) => {
        fetch(`http://localhost:5000/product/${id}`, {
            method: 'DELETE',
        });
    };

    const handleEditModal = () => {
        setEditModal(!editModal);
    };

    return (
        <Col key={product._id}>
            <Card>
                <Card.Img variant="top" src={product.images[0]} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>{product.price}$</Card.Text>
                </Card.Body>

                <div className='d-flex'>
                    <button 
                        className="btn btn-primary w-100 rounded-0"
                        onClick={handleEditModal}
                    >
                        Edit
                    </button>

                    <button 
                        className="btn btn-danger w-100 rounded-0"
                        onClick={() => handleDeleteProduct(product._id)}
                    >
                        Delete
                    </button>
                </div>

                {/* Modal For Edit Product */}
                <Modal show={editModal} onHide={handleEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{product.name}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <EditProductForm product={product} />            
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleEditModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>               
            </Card>                      
        </Col>
    );
};

export default Product;