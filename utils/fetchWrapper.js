const fetch = require('node-fetch');

const fetchWrapper = async (url, method, body, headers) => {

    try {
        const response = await fetch(url, {
            method: method,
            headers,
            body
        })
        const data = await response.json()
        if(response.status === 200 || response.status === 201){
            return [data, null]
        } else {
            throw new Error(data)
        }
    } catch (error) {
        return [null, error]
    }
       
}

export default fetchWrapper;