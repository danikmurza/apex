const url = "https://api.github.com/orgs/"

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

const getOrganizations = async (orgName) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return await fetch(url+ orgName+"/repos", requestOptions)
        .then(handleResponse)
        .then(organizations => {
                return organizations
            }
        )
}

export const service = {
    getOrganizations,
}
