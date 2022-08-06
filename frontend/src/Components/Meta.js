import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: "Welcome to Patro house",
    description: "It is a E-commerce Web-Site for all your needs",
    keywords: "Electronic, buy electronics , reasonable Priceing"
}

export default Meta