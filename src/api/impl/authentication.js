import api from "../fetcher.js";


// Process user creating account
export async function processRegister(data) {
    // TODO data validation
    return !!await api.post("auth/register", data);
}

// Process user authenticate
export async function processLogin(data) {
    try {
        const res = await api.post('/auth/login', data);
        return res.data;
    } catch (e) {
        throw e.response.data.error || e;
    }
}

// Process user disconnection
export async function processLogout() {
    const res = await api.get("auth/logout");
    if (res.status === 200) {
        localStorage.removeItem("access_token");
        return true
    }
    return false;
}

// Process user disconnection from all devices
export async function processForceLogout() {
    const res = await api.get("auth/force-logout");
    if (res.status === 200) {
        localStorage.removeItem("access_token");
        return true
    }
    return false;
}