import React from 'react'
import './../login/login.css'
import API from "../api"
import logo from "../logo.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEnvelope, faEye, faEyeSlash, faImage, faPhone, faUser, faUserSecret} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"

export default class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        this.passwordInput = React.createRef()
        this.state = {
            profile: {},
            id: localStorage.getItem('editingId') || '',
            error: '',
            email: '',
            role: 'normal_user',
            fullName: '',
            avatar: '',
            phone: '',
            password: '',
            eye: true,
            upload: null,
            loading: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        API.get(`/users/${this.state.id}`).then(res => {
            this.setState({
                profile: res.data.user
            })
        })
    }

    togglePasswordEye(event) {
        event.preventDefault()
        const showEye = !this.state.eye
        this.setState({eye: showEye})
        return this.passwordInput.current.type === 'password' ?
            this.passwordInput.current.type = 'text' :
            this.passwordInput.current.type = 'password'
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        if (!this.state.upload) {
            this.setState({
                error: "Please upload an image for user profile",
                loading: false
            })
            return false
        } else {
            const data = new FormData()
            data.append('file', this.state.upload)
            API.post('/uploads', data).then(res => {
                if (!(res.status === 200)) {
                    this.setState({
                        error: "There was an error uploading the file",
                        loading: false
                    });
                    return false
                }
                const avatar = res.data.image.sourceUrl
                this.setState({
                    avatar
                })
                if (!this.state.fullName || !this.state.avatar || !this.state.phone || !this.state.email || !this.state.password) {
                    console.log(this.state)
                    this.setState({
                        error: "Missing fields were supplied",
                        loading: false
                    });
                    return false;
                } else {
                    console.log(this.state)
                }
            })
        }
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value.trim()
        })
        this.setState({error: ''})
    }

    onFileChangeHandler = event => {
        event.preventDefault()
        this.setState({
            upload: event.target.files[0]
        })
        this.setState({
            error: null,
            loading: false
        })
    }

    render() {
        return (
            <div className="App">
                <div id='main'>
                    <img id="logo" alt="logo" src={logo}/>
                </div>
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">Back to My Profile</Link>
                </li>
                <div id='form'>
                    <form name="form0" method="POST" action="#" onSubmit="return false">
                        <div className="input-group-custom">
                            <FontAwesomeIcon className="dark" icon={faUser}/>
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" name="fullName" id="fullName"
                                   defaultValue={this.state.profile.fullName} onChange={this.handleChange} placeholder="Full Name" required/>
                        </div>
                        <div className="input-group-custom">
                            <FontAwesomeIcon className="dark" icon={faEnvelope}/>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" defaultValue={this.state.profile.email}
                                   onChange={this.handleChange} placeholder="Email" required/>
                        </div>
                        <div className="input-group-custom">
                            <FontAwesomeIcon className="dark" icon={faPhone}/>
                            <label htmlFor="phone">Phone</label>
                            <input type="phone" name="phone" id="phone" defaultValue={this.state.profile.phone}
                                   onChange={this.handleChange} placeholder="Phone" required/>
                        </div>


                        {this.state.loading ? <progress className="pure-material-progress-circular"/> : ''}

                        <div className="input-group-custom">
                            <FontAwesomeIcon className="dark" icon={faImage}/>
                            <label htmlFor="upload">Email</label>
                            <input type="file" name="upload" accept="image/*" className="form-control-file"
                                   id="upload"
                                   onChange={this.onFileChangeHandler} required/>
                        </div>
                        <div className="input-group-custom">
                            <FontAwesomeIcon className="dark" icon={faUserSecret}/>
                            <label htmlFor="password">Password</label>
                            <input type="password" ref={this.passwordInput} name="password" id="password"
                                   value={this.state.password}
                                   onChange={this.handleChange} placeholder="New Password"
                                   required/>
                            <FontAwesomeIcon className="light clickable"
                                             onClick={(event => this.togglePasswordEye(event))}
                                             icon={this.state.eye ? faEyeSlash : faEye}/>
                        </div>

                        {this.state.error ? <p id={'error'}>{this.state.error}</p> : ''}

                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">Log Out</Link>
                        </li>

                        <input type="submit" onClick={this.handleSubmit} value="Submit Changes"/>
                    </form>
                </div>
                <div id='bottom'>
                    <small className="light">&copy; profiler.io 2021</small>
                </div>
            </div>
        )
    }
}
