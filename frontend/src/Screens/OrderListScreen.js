import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message'
import SpinnerCom from '../Components/SpinnerCom'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderListAction, orderDeliverAction } from '../Actions/OrderActions.js';

const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const list = useSelector(state => state.OrdersAll)
    const { Loading, orders, error } = list

    const user = useSelector(state => state.userLogin)
    const { userInfo } = user

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(orderListAction())
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, userInfo])

    const deliverHandler = (id) => {
        dispatch(orderDeliverAction(id));
    }

    return (
        <>
            <h1 className='Text-Center'>Orders</h1>
            {
                Loading ? <SpinnerCom></SpinnerCom> : error ? <Message message={error}></Message> :
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>
                                            {order.totalPrice}
                                        </td>
                                        <td>
                                            {order.isPaid ? (order.paidAt.substring(0, 10)) : (<i className='fas fa-times' style={{ color: 'red' }}></i>)}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button varient='light' className='btn-sm'>
                                                    Details
                                                </Button>
                                            </LinkContainer>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
            }
        </>
    )
}

export default OrderListScreen