import React from 'react'
import './../login/login.css'
import API from "../api"
import ShowProfiles from "./showprofiles"

export default class AdminProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        API.get('/users').then(res => {
            this.setState({
                users: res.data.users
            })
        })
    }

    handleClickEdit(userId) {
        console.log(userId)
        // window.location.replace(`/profile/admin/edit/${userId}`)
    }

    handleClickDelete(userId) {
        console.log(userId)
    }

    render() {
        return (
            <div className="App">
                <ShowProfiles users={this.state.users} handleClickEdit={this.handleClickEdit} handleClickDelete={this.handleClickDelete}/>
                <div id='bottom'>
                    <small className="light">&copy; profiler.io 2021</small>
                </div>
            </div>
        )
    }
}
