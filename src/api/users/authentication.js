import {get, post} from "../fetcher.js";


// Process user creating account
export async function processRegister(data) {
    // TODO data validation
    return !!await post("/auth/register", data);

}

// Process user authenticate
export async function processLogin(data) {
    // TODO data validation ?
    const res = await post("/auth/login", data);
    const token = res.token;
    if (token) {
        localStorage.setItem("access_token", token);
        return true;
    }
    return false;
}

// Process user disconnection
export async function processLogout() {
    const res = await get("/auth/logout");
    if (res.status === 200) {
        localStorage.removeItem("access_token");
        return true
    }
    return false;
}

// Process user disconnection from all devices
export async function processForceLogout() {
    const res = await get("/auth/force-logout");
    if (res.status === 200) {
        localStorage.removeItem("access_token");
        return true
    }
    return false;
}