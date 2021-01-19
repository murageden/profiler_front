import React from "react"
import './../card.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Link} from 'react-router-dom'
import {
    faUser,
    faEnvelope,
    faPhone,
    faLockOpen,
} from "@fortawesome/free-solid-svg-icons"

const ShowProfile = ({handleClickEdit, state}) => {
    const url = `${state.profile.profilePhotoUrl}`
    return (
        <div className="card">
            <div id='main'>
                <img src={url} alt='profile'/>
            </div>
            <div className="input-group-custom">
                <FontAwesomeIcon className="dark" icon={faUser}/>
                <li className='line'>{state.profile.fullName}</li>
            </div>
            <div className="input-group-custom">
                <FontAwesomeIcon className="dark" icon={faEnvelope}/>
                <li className='line'>{state.profile.email}</li>
            </div>
            <div className="input-group-custom">
                <FontAwesomeIcon className="dark" icon={faPhone}/>
                <li className='line'>{state.profile.phone}</li>
            </div>
            <div className="input-group-custom">
                <FontAwesomeIcon className="dark" icon={faLockOpen}/>
                <li className='line'>{state.profile.role === 'normal_user' ? 'Ordinary User' : 'Admin'}</li>
            </div>
            <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
            </li>
            {state.profile.role === 'super_admin' ? <li className="nav-item">
                <Link className="nav-link" to="/profile/admin">Go to Admin Dashboard</Link>
            </li> : '' }
            <input type="submit" onClick={() => handleClickEdit(state.profile.id)} value="Edit Profile"/>
        </div>
    )
}

export default ShowProfile
