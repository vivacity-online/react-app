export async function save(user, url, token) {

  let hitAPI = await fetch(
      url, 
    {
      url,
      method: "PATCH",
      headers: {
          "Authorization": `Token ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
  })
  .then(response => response.json());

  return hitAPI
};
