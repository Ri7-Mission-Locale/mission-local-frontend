const host = import.meta.env.API_URL;
let isRefreshing = false;
let currentRefresh = null;

export async function get(route, query = null) {
    return await fetcher(route, "GET", null, query);
}
export async function post(route, body, query = null) {
    return await fetcher(route, "POST", body, query);
}
export async function put(route, body, query = null) {
    return await fetcher(route, "PUT", body, query);
}
export async function patch(route, body, query = null) {
    return await fetcher(route, "PATCH", body, query);
}
export async function remove(route, body, query = null) {
    return await fetcher(route, "DELETE", body, query);
}

async function fetcher(route, method = "GET", body = {}, query = null) {
    const token = localStorage.getItem("access_token");

    const queryParams = query ? `?${buildQuery(query)}` : "";

    const request = async () => {
        const options = {
            method,
            credentials: "include",
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                "Content-Type": "application/json",
            },
        };
        if (method !== "GET") options.body = JSON.stringify(body);
        return await fetch(`${host}/${route}${queryParams}`, options);
    };

    if (isRefreshing && currentRefresh) await currentRefresh;
    let response = await request();

    if (response.status === 401 && token) {
        if (!isRefreshing) {
            isRefreshing = true;
            currentRefresh = handleRefresh(token);
        }
        await currentRefresh;
        isRefreshing = false;
        currentRefresh = null;
        response = await request();
    }
    const json = await response.json();
    if (!response.ok) throw new Error(json.message || "Erreur serveur");
    return json;
}

function buildQuery(params) {
    const filtered = params.filter(([, v]) => v != null && v !== "");
    return new URLSearchParams(filtered).toString();
}

async function handleRefresh(token) {
    try {
        const res = await fetch(`${host}/auth/refresh`, {
            method: "GET",
            credentials: "include",
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                "Content-Type": "application/json",
            }
        });
        if (!res.ok) throw "Une erreur est survenue";

        const data = await res.json();
        if (!data || !data.token) throw new Error(res);

        localStorage.setItem("access_token", data.token);
        return data;
    } catch (err) {
        console.error("Error during refresh session: ", err);
        //auth.logout();
        localStorage.removeItem("access_token");
    }
}
