import {get, patch} from "../fetcher.js";

export async function getProfile() {
    return await get("/profile");
}
export async function editProfile(data) {
    return await patch("/profile", data);
}