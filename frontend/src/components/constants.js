

const getPayload = () => {
    const payload = JSON.parse(localStorage.getItem('payload'));
    if (payload) {
        return payload;
    }
    return false
}


export default getPayload