import { useState } from "react";
import Alert from 'react-bootstrap/Alert';

const EditProductForm = ({ product }) => {
    const [ name, setName ] = useState(product.name);
    const [ price, setPrice ] = useState(product.price);
    const [ description, setDescription ] = useState(product.description);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const handleEditProduct = (e) => {
        e.preventDefault();
        setIsSuccess(false);
        setError("");
        setIsLoading(true);

        const newProduct = JSON.stringify({
            name,
            price,
            description,
            images: product.images
        });


        fetch(`http://localhost:5000/product/${product._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: newProduct,
        })
            .then((res) => {
                if (res) {
                    setIsLoading(false);
                    setIsSuccess(true);
                    setTimeout(() => {
                        setIsSuccess(false);
                    }, 5000)
                };
            })
            .catch(err => {
                setError(err.message);
            });
    };

    return (
        <form onSubmit={handleEditProduct}>
            {/* Success Message */}
            {
                isSuccess && <Alert key="success" variant="success">Product Edited Successfully!</Alert>
            }

            {/* Error Message */}
            {
                error && <Alert key="danger" variant="danger">{error}</Alert>
            }

            <input 
                type="text" 
                className="form-control mb-3"
                placeholder="Name"
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />

            <input 
                type="number" 
                className="form-control mb-3"
                placeholder="Price"
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
            />

            <textarea 
                className="form-control mb-3"
                placeholder="Description"
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            >
            </textarea>

            <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
            >
                { isLoading ? "Loading..." : "Submit"}
            </button>
        </form>
    );
};

export default EditProductForm;