import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const submitHandle = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/')
        }
    }

    return (
        <Form onSubmit={submitHandle} inline>
            <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeHolder='Search for Product...' className='mr-sm-2 ml-sm-5'></Form.Control>
            <Button type='submit' varient='outline-success' className='p-2'>
                Search
            </Button>
        </Form>
    )
}

export default SearchBox