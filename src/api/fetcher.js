const host = import.meta.env.API_URL;
let isRefreshing = false;
let currentRefresh = null;

export async function get(route, body) {
    return await fetcher(route, "GET", body);
}
export async function post(route, body) {
    return await fetcher(route, "POST", body);
}
export async function put(route, body) {
    return await fetcher(route, "PUT", body);
}
export async function patch(route, body) {
    return await fetcher(route, "PATCH", body);
}
export async function remove(route, body) {
    return await fetcher(route, "DELETE", body);
}

async function fetcher(route, method = "GET", body, options) {
    const token = localStorage.getItem("access_token");

    const request = async () => {
        return await fetch(`${host}/${route}`, {
            method,
            credentials: "include",
            ...options,
            headers: {
                ...(options.headers || {}),
                Authorization: token ? `Bearer ${token}` : "",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
    }

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

