import React from 'react'
import './../login/login.css'
import API from "../api"
import ShowProfile from "./showprofile"

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.passwordInput = React.createRef()
        this.state = {
            profile: {},
            isEditing: false,
            id: localStorage.getItem('userId') || ''
        }
        this.handleClickEdit = this.handleClickEdit.bind(this)
    }

    componentDidMount() {
        API.get(`/users/${this.state.id}`).then(res => {
            this.setState({
                profile: res.data.user
            })
        })
    }

    handleClickEdit() {
        window.location.replace('/profile/edit')
    }

    render() {
        return (
            <div className="App">
                <ShowProfile profile={this.state.profile} passwordInput={this.passwordInput} state={this.state} handleClickEdit={this.handleClickEdit} />
                <div id='bottom'>
                    <small className="light">&copy; profiler.io 2021</small>
                </div>
            </div>
        )
    }
}
