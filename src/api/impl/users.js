import {get, patch, remove} from "../fetcher.js";


// Get users with filter and pagination
export async function getUsers(limit, page, name, role, order) {
    const query = {
        limit: limit && `limit=${limit}`,
        page: page && `page=${page}`,
        name: name && `name=${name}`,
        role: role && `role=${role}`,
        order: order && `order=${order}`,
    }
    return await get("users", query);
}

// Get user by this id
export async function getUser(id) {
    return await get("users/" + id);
}

// Update a user
export async function updateUser(id, data) {
    return await patch("users/" + id, data);
}

// Delete a user
export async function deleteUser(id) {
    return await remove("users/" + id);
}