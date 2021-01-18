import React from 'react'
import logo from './../logo.png'
import './login.css'
import API from "./../api"
import jwt from "jwt-decode"
import {Link, Redirect} from 'react-router-dom'
import {faEye, faEyeSlash, faUser, faUserSecret} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.passwordInput = React.createRef()
        this.accessToken = localStorage.getItem('accessToken')
        this.isAuthenticated = !!this.accessToken && !this.hasTokenExpired(this.accessToken)
        this.state = {
            error: '',
            token: '',
            id: '',
            identity: '',
            password: '',
            eye: true,
            loading: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value.trim()
        })
        this.setState({error: ''})
    }

    saveToLocalStorage(token, id) {
        localStorage.clear()
        localStorage.setItem('accessToken', token)
        localStorage.setItem('userId', id)
    }

    togglePasswordEye(event) {
        event.preventDefault()
        const showEye = !this.state.eye
        this.setState({eye: showEye})
        return this.passwordInput.current.type === 'password' ?
            this.passwordInput.current.type = 'text' :
            this.passwordInput.current.type = 'password'
    }

    hasTokenExpired = (token) => {
        const expDate = jwt(token).exp
        const today = Date.now() / 1000
        if (expDate < today) {
            localStorage.clear()
            return true
        }
        return false
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        const loginType = this.state.identity.trim().includes('@') ? 'email': 'phone'
        API.post('/users/login', {
            identity: this.state.identity.trim(),
            loginType,
            password: this.state.password.trim()
        }).then(res => {
            const token = res.data.accessToken
            const userId = res.data.id
            this.setState({token, userId})
            this.saveToLocalStorage(token, userId)
            window.location.href = '/profile'
        }).catch(e => {
            this.setState({
                error: 'Authentication fail',
                loading: false
            })
        })
    }

    render() {
        return this.isAuthenticated ? (
            <Redirect to={{pathname: '/profile'}}/>
        ) : (
            <div className="App">
                <div id='main'>
                    <img id="logo" alt="logo" src={logo}/>
                </div>
                <div id='form'>
                    <form name="form0" method="POST" action="#" onSubmit="return false">
                        <div className="input-group-custom">
                            <FontAwesomeIcon className="dark" icon={faUser}/>
                            <label htmlFor="identity">Email or Phone</label>
                            <input type="email" name="identity" id="identity" value={this.state.identity}
                                   onChange={this.handleChange} placeholder="Email or Phone" required/>
                        </div>

                        {this.state.loading ? <progress className="pure-material-progress-circular"/> : ''}

                        <div className="input-group-custom">
                            <FontAwesomeIcon className="dark" icon={faUserSecret}/>
                            <label htmlFor="password">Password</label>
                            <input type="password" ref={this.passwordInput} name="password" id="password"
                                   value={this.state.password}
                                   onChange={this.handleChange} placeholder="Password"
                                   required/>
                            <FontAwesomeIcon className="light clickable"
                                             onClick={(event => this.togglePasswordEye(event))} icon={this.state.eye ? faEyeSlash : faEye}/>
                        </div>

                        {this.state.error ? <p id={'error'}>{this.state.error}</p> : ''}

                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Create an account</Link>
                        </li>
                        <input type="submit" onClick={this.handleSubmit} value="Sign In"/>
                    </form>
                </div>
                <div id='bottom'>
                    <small className="light">&copy; profiler.io 2021</small>
                </div>
            </div>
        )
    }
}