import URL from '../conf';

const API_URL = URL + '/api/user/login';
// Append the login url to the supplied url from the
// conf file.

export default function login(username, password) {
    /**
     * Login user to the Vivacity.online API.
     * 
     * Sends a fetch request to the supplied url returning 
     * returning an async object to finish unpacking inside 
     * the caller.
     * 
     * @param    {string}    username    The logging in username.
     * @param    {String}    password    The logging in password.
     * 
     * @returns  {Object}    response    Object containing API response.
     * 
     */
    const user = {
        username: username,
        password: password
    };

    async function hitAPI(userObj) {
        // Actual API hit function
        console.log("Logging IN");
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj),
        })
        .then(function(response) {
            if(response.status === 200){
                let responseJSON = response.json();
                return responseJSON;
            }else{
                return response.statusText;
            }
        })

        return response;
    }
    return hitAPI(user);
}