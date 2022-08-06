import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap';
import SpinnerCom from './SpinnerCom';
import Message from './Message';
import { productTopRatedAction } from '../Actions/ProductActions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ProductCarousel = () => {
    const dispatch = useDispatch();

    const topProducts = useSelector(state => state.ProductTopRated)
    const { Loading, error, products } = topProducts;

    useEffect(() => {
        dispatch(productTopRatedAction())
    }, [dispatch])

    return (
        Loading ? <SpinnerCom></SpinnerCom> : error ? <Message message={error}></Message> :
            <Carousel pause='hover' className='color'>
                {products.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link to={`products/${product._id}`}>
                            <br />
                            <br />
                            <Image className="mx-auto d-block" src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className='carousel-caption'>
                                <h2>
                                    {product.name} ({product.price})
                                </h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
    )
}

export default ProductCarousel