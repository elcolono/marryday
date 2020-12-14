import React, { useEffect } from 'react'

import Router from 'next/router';
import { clientAuth } from '../../actions/auth';

const Private = ({ children }) => {
    useEffect(() => {
        if (!clientAuth()) {
            Router.push(`/signin`);
        }
    }, [])

    return <React.Fragment>{children}</React.Fragment>
}

export default Private;