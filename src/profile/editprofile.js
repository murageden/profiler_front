import React from 'react'
import './../login/login.css'
import API from "../api"

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: {},
            id: localStorage.getItem('userId') || ''
        }
    }

    componentDidMount() {
        API.get(`/users/${this.state.id}`).then(res => {
            this.setState({
                profile: res.data.user
            })
        })
    }

    render() {
        return (
            <div className="App">

                <div id='bottom'>
                    <small className="light">&copy; profiler.io 2021</small>
                </div>
            </div>
        )
    }
}