import React from "react"
import '../card.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Link} from 'react-router-dom'
import {
    faTrash,
    faEdit
} from "@fortawesome/free-solid-svg-icons"
import logo from "../logo.png";

const ShowProfiles = ({handleClickEdit, handleClickDelete, users}) => {
    return (
        <div className="App">
            <div id='main'>
                <img id="logo" alt="logo" src={logo}/>
            </div>
            <li className="nav-item">
                <Link className="nav-link" to="/profile">Back to My Profile</Link>
            </li>
            <div className="card">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Profile Photo</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>
                                <img src={user.profilePhotoUrl} width={40} height={40} alt={user.fullName}/>
                            </td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>
                                <div className="end">
                                    <FontAwesomeIcon className='clickable' icon={faEdit} onClick={() => handleClickEdit(user.id)}/>
                                    <FontAwesomeIcon className='clickable' icon={faTrash} onClick={() => handleClickDelete(user.id)}/>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <li className="nav-item">
                <Link className="nav-link" to="/profile/add">Add New User</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
            </li>
        </div>
    )
}

export default ShowProfiles
