import { useState } from "react";
import Alert from 'react-bootstrap/Alert';

const CreateProductForm = () => {
    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState(0); 
    const [ description, setDescription ] = useState("");
    const [ images, setImages ] = useState(null);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const handleCreateProduct = (e) => {
        e.preventDefault();
        setIsSuccess(false);
        setError("");
        setIsLoading(true);

        const toBase64 = file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        };

        const tobase64Handler = async files => {
            const filePathsPromises = [];

            for (let i = 0; i < files.length; i++) {
                filePathsPromises.push(toBase64(files[i]));
            }

            const filePaths = await Promise.all(filePathsPromises);
            const mappedFiles = filePaths.map(base64File => base64File);
            return mappedFiles;
        };

        tobase64Handler(images)
            .then(data => {
                const product = JSON.stringify({
                    name,
                    price,
                    description,
                    images: data
                });

                fetch(`http://localhost:5000/product`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: product,
                })
                    .then((res) => {
                        if (res) {
                            setName("");
                            setPrice(0);
                            setDescription("");
                            setImages(null)
                            setError("");
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
            });
    };

    return (
        <form onSubmit={handleCreateProduct}>
            {/* Success Message */}
            {
                isSuccess && <Alert key="success" variant="success">Product Created Successfully!</Alert>
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
                required
            />

            <input 
                type="number" 
                className="form-control mb-3"
                placeholder="Price"
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                required
            />

            <textarea 
                className="form-control mb-3"
                placeholder="Description"
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                required
            >
            </textarea>

            <input 
                type="file" 
                className="form-control mb-3"
                onChange={(e) => setImages(e.target.files)}
                multiple
                required
            />

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

export default CreateProductForm;