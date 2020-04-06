export default async function logoff(url, token){
    let hitApi = await fetch(
      `${url}/api/user/logout`,
      {
        method: "GET",
        headers: {
          'Authorization': `Token ${token}`,
        },
      },
      )
      .then(response => response.status)
      .catch(error => console.log(error));
    
      return hitApi;
  }