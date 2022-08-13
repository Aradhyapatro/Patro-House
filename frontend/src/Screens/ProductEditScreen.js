import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Spinner } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import Message from '../Components/Message';
import { producUpdateAction } from '../Actions/ProductActions';
import { productDetails } from "../Actions/ProductDetailsActions";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PRODUCT_UPDATE_RESET } from '../Constants/ProductConstants';

const ProductEditScreen = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const [searchParam, setSearchParam] = useSearchParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const proDetails = useSelector(state => state.productDetail)
    const { Loading, error, product } = proDetails

    const proUpdate = useSelector(state => state.ProductUpdate)
    const { Loading: LoadingUpdate, success: successUpdate, error: errorUpdate, product: productUpdate } = proUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch(productDetails(id))
            navigate('/admin/productsList')
        } else {
            if (!product.name || product._id !== id) {
                dispatch(productDetails(id))
            } else {
                setName(product.name);
                setPrice(product.price);
                setBrand(product.brand);
                setImage(product.image);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [id, dispatch, product, navigate, successUpdate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const fileData = new FormData();
        fileData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }

            const { data } = await axios.post('http://localhost:5000/api/uploads', fileData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(producUpdateAction({
            _id: id,
            name,
            price,
            brand,
            description,
            image,
            countInStock,
            category
        }));
    };

    return (
        <>
            <Link to={'/admin/productsList'} className='btn btn-light m-3'>Go Back</Link>
            <FormContainer>
                {LoadingUpdate && <Spinner></Spinner>}
                {error && <Message message={error}></Message>}
                {errorUpdate && <Message message={errorUpdate}></Message>}
                {Loading && <Spinner />}
                <h1>Edit Product</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group id="Image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Image URL'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        <br />
                        <Form.Control id="image-file" type="file" label="chose a file" onChange={uploadFileHandler} />
                        {uploading && <Spinner></Spinner>}
                    </Form.Group>

                    <Form.Group id="Brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Brand'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group id="countInStock">
                        <Form.Label>CountInStock</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter countInStock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group id="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
            </FormContainer>
        </>

    );
};

export default ProductEditScreen;
