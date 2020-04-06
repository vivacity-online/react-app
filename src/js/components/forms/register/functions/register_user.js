export async function verifyEmail(email, url) {
    let check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if(email.match(check)){
        const verified = await fetch(
            `${url}?email=${email}`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                }
            }
        )
        .then(response => response.status)
        .catch(error => console.log(error));

        let responseCode = verified;
        switch(responseCode){
            case 200:
                return {
                    code: responseCode,
                }
            case 226:
                return {
                    code: responseCode,
                    message: "Email in use"
                }
            default:
                return {
                    code: responseCode,
                    message: "Error"
                }
        }
    }else{
        return false
    }
}

export function verifyPassword(password) {
    if(password.length >= 7) {
        let check = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/; 
        //Password must be 5-20 CHARS LONG contain (1) NUMERIC DIGIT, (1) SPECIAL CHAR
        if(password.match(check)) {
            return {
                code: 200
            }
        }else{
            return {
                code: 404,
                message: "Password must contain at least (1)number and (1)special character"
            }
        }
    }else{
        return {
            code: 404,
            message: "Password must be at least 7 characters long"
        }
    }
}

export async function verifyUsername(username, url) {

    const hitApi = await fetch(
        `${url}?username=${username}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                // "Content-Type": "application/json",
            }
        }
    )
    .then(response => response.status)
    .catch(error => console.log(error));

        let responseCode = hitApi;
        switch(responseCode){
            case 200:
                return {
                    code: responseCode,
                    message: "Username available!"
                };
            case 226:
                return {
                    code: responseCode,
                    message: "Username already in use"
                };
            default:
                return {
                    code: responseCode,
                    message: "Error"
                };

        }
}

export async function register(user, url) {

    let hitApi = await fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }
    )
    .then(response => response.json());

    return hitApi;
}