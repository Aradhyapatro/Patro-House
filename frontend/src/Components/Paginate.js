import React from 'react'
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ Page, Pages, keyword = '', isAdmin = false }) => {
    return (
        Pages > 1 && <Pagination>
            {
                [...Array(Pages).keys()].map(x => (
                    <LinkContainer key={x + 1} to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}>
                        <Pagination.Item active={x + 1 === Page} key={x + 1}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))
            }
        </Pagination>
    )
}

export default Paginate;