export async function search(url, token) {
    let hitAPI = await fetch(
        url,
        {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }
    )
    .then(response => response.json())

    return hitAPI;
}