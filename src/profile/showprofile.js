import React from "react"
import './../card.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Link} from 'react-router-dom'
import {faUser, faEnvelope, faPhone, faLockOpen} from "@fortawesome/free-solid-svg-icons"

const ShowProfile = ({profile, handleSubmit}) => {
    const url = `${profile.profilePhotoUrl}`
    return (
        <div className="card">
            <div id='main'>
                <img src={url} alt='profile photo'/>
            </div>
            <div className="input-group-custom">
                <FontAwesomeIcon className="dark" icon={faUser}/>
                <li className='line'>{profile.fullName}</li>
            </div>
            <div className="input-group-custom">
                <FontAwesomeIcon className="dark" icon={faEnvelope}/>
                <li className='line'>{profile.email}</li>
            </div>
            <div className="input-group-custom">
                <FontAwesomeIcon className="dark" icon={faPhone}/>
                <li className='line'>{profile.phone}</li>
            </div>
            <div className="input-group-custom">
                <FontAwesomeIcon className="dark" icon={faLockOpen}/>
                <li className='line'>{profile.role === 'normal_user' ? 'Ordinary User' : 'Admin'}</li>
            </div>
            <li className="nav-item">
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </li>
            <input type="submit" onClick={handleSubmit} value="Edit Profile"/>
        </div>
    )
}

export default ShowProfile