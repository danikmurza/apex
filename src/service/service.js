const _base = "http://localhost:5000/posts"

function handleResponse(response) {
    return response.text().then(text => {
            const data = text && JSON.parse(text)
            if (!response.ok) {
                const error = (data && data.message) || response.statusText
                return Promise.reject(error)
            }

            return data
        }
    )
}


const getCompany = async (body) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    return await fetch(`${_base}/find`, requestOptions)
        .then(handleResponse)
        .then(products => {
                return products
            }
        )
}

export const service = {
    getCompany
}
