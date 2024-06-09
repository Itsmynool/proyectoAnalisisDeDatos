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

const generateGraph = (data, variableX, variableY) => {
    const request = axios.post(`${baseUrl}/generate_graph`, {
        data: data,
        variableX: variableX,
        variableY: variableY
    });
    return request.then(response => response.data)
}

const fileService = { sendFile, generateGraph }

export default fileService