import API_URL from '../../conf';

const DEFAULT_OPTIONS = {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
};

export function APIHandler(url, options={}) {
    let URL = API_URL + url;

    let OPTIONS = {
        ...DEFAULT_OPTIONS,
        ...options,
        headers: {
            ...DEFAULT_OPTIONS.headers,
            ...options.headers
        },
    };
    if(OPTIONS.method !== "GET" && OPTIONS.body){
        let body = OPTIONS.body;
        let BODY = (typeof(body) === "object") ? JSON.stringify(body): null;
        OPTIONS.body = BODY;
        console.log(OPTIONS);
    }

    async function fetchAPI() {
        let response = await fetch(
            URL,
            OPTIONS
        )
        .then(response => response.json())

        return response;
    }

    return fetchAPI()

}