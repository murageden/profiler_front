import React from 'react'
import { Redirect } from 'react-router-dom'
import jwt from 'jwt-decode'


class Protected extends React.Component {
    render() {
        const Component = this.props.component
        const token = localStorage.getItem('accessToken')
        const isAuthenticated = !!token && !hasTokenExpired(token)
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        )
    }
}

const hasTokenExpired = (token) => {
    const expDate = jwt(token).exp
    const today = Date.now() / 1000
    if (expDate < today) {
        localStorage.clear()
        return true
    }
    return false
}

export default Protected