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
        localStorage.setItem('editingId', userId)
        window.location.replace('/profile/edit')
    }

    handleClickDelete = (userId) => {
        API.delete(`/users/${userId}`, {
            method: 'DELETE'
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    users: this.state.users.filter(function (obj) {
                        return obj.id !== userId
                    })
                })
            }
            else {
                console.log('Error deleting user')
            }
        })
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
