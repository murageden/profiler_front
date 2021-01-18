import axios from 'axios'

export default axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 30000,
    headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
        'X-ACCESS-TOKEN': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json;charset=utf-8'
    }
})