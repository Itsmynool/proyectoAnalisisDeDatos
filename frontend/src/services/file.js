import axios from 'axios'
const baseUrl = 'http://127.0.0.1:5000'

const sendFile = (formData) => {
    const request = axios.post(`${baseUrl}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return request.then(response => response.data)
}

const fileService = { sendFile }

export default fileService