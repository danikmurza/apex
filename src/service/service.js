const _base = "https://api.github.com/orgs"

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


const getCompany = async (url) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return await fetch(`${_base}/${url}/repos`, requestOptions)
        .then(handleResponse)
        .then(products => {
                return products
            }
        )
}

export const service = {
    getCompany
}
