import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message'
import SpinnerCom from '../Components/SpinnerCom'
import { userListAction } from '../Actions/UserActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDeleteAction } from '../Actions/UserActions';

const UserListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const list = useSelector(state => state.usersList)
    const { Loading, users, error } = list

    const user = useSelector(state => state.userLogin)
    const { userInfo } = user

    const deleteUser = useSelector(state => state.userDelete);
    const { success } = deleteUser;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(userListAction())
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, success])

    const deleteHandler = (id) => {
        if (window.confirm('Are You Sure')) {
            dispatch(userDeleteAction(id))
        }
    }

    return (
        <>
            <h1 className='Text-Center'>Users</h1>
            {
                Loading ? <SpinnerCom></SpinnerCom> : error ? <Message message={error}></Message> :
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>ADMIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                        <td>
                                            {
                                                user.isAdmin ? <i className='fas fa-check' style={{ color: 'green' }}></i> : <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/user/${user._id}/edit`}>
                                                <Button varient='light' className='btn-sm'>
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>

                                        </td>
                                        <td>
                                            <Button varient="danger" className="btn-sm padding" onClick={() => { deleteHandler(user._id) }}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
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

export default UserListScreen