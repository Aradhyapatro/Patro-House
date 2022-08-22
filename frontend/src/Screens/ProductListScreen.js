import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message'
import SpinnerCom from '../Components/SpinnerCom'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listProduct, productDeleteAction, productCreateAction } from '../Actions/ProductActions';
import { PRODUCT_CREATE_RESET } from "../Constants/ProductConstants.js"
import Paginate from '../Components/Paginate.js';
import { useParams } from 'react-router-dom';

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pageNumber = useParams().pageNumber || 1;

    const list = useSelector(state => state.productList)
    const { Loading, products, error, page, pages } = list

    const user = useSelector(state => state.userLogin)
    const { userInfo } = user

    const deletePro = useSelector(state => state.ProductDelete);
    const { Loading: LoadingProduct, success: successProduct, error: errorProduct } = deletePro;

    const createPro = useSelector(state => state.ProductCreate)
    const { Loading: LoadingProductCreate, success: successCreate, product: createdProduct, error: errorCreating } = createPro

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProduct('', pageNumber))
        }

    }, [dispatch, navigate, userInfo, successProduct, successCreate, createdProduct])

    const deleteHandler = (id) => {
        // delete product
        if (window.confirm('Are you sure')) {
            dispatch(productDeleteAction(id))
        }
    }

    const createProductHandler = () => {
        dispatch(productCreateAction())
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col className='m-5 Text-Center'>
                </Col>
                <Col className='text-right mx-4'>
                    <Button style={{ marginLeft: 'auto', display: 'block', }} onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            <h1 className='Text-Center'>Products</h1>
            {LoadingProduct && <SpinnerCom></SpinnerCom>}
            {LoadingProductCreate && <SpinnerCom></SpinnerCom>}
            {errorProduct && <Message message={error}></Message>}
            {
                Loading ? <SpinnerCom></SpinnerCom> : error ? <Message message={error}></Message> :
                    <>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>
                                                {product.category}
                                            </td>
                                            <td>{product.brand}</td>
                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button varient='light' className='btn-sm'>
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                </LinkContainer>

                                            </td>
                                            <td>
                                                <Button varient="danger" className="btn-sm padding" onClick={() => { deleteHandler(product._id) }}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        <Paginate Page={page} Pages={pages} isAdmin={true} />
                    </>
            }
        </>
    )
}

export default ProductListScreen