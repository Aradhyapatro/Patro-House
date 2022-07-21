import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Spinner } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import { userDetailsAction, userUpdateAdminAction } from "../Actions/UserActions";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { USER_UPDATE_ADMIN_RESET } from '../Constants/UserConstants';

const UserEditScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchParam, setSearchParam] = useSearchParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const userDetails = useSelector(state => state.userDetails)
    const { Loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { Loading: LoadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_ADMIN_RESET })
            navigate('/admin/usersList');
        } else {
            if (!user || user._id !== id) {
                dispatch(userDetailsAction(id))
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [id, dispatch, user, successUpdate, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userUpdateAdminAction({ _id: id, name, email, isAdmin }))
    };

    return (
        <>
            <Link to={'/admin/usersList'} className='btn btn-light m-3'>Go Back</Link>
            <FormContainer>
                {Loading && <Spinner />}
                <h1>Edit User</h1>
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

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group id="isAdmin">
                        <Form.Check
                            type="checkbox"
                            label="is Admin"
                            checked={isAdmin}
                            onChange={(e) => {
                                setIsAdmin(e.target.checked);
                            }}
                        ></Form.Check>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
            </FormContainer>
        </>

    );
};

export default UserEditScreen;
