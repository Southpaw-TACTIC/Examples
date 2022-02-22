// declared variables
let server_url = "https://portal.southpawtech.com"
let site = "tutorial" 
let project = "api_tutorial01" 
let user = ""  //*** contact Southpaw Tech for your free trial contact@southpawtech.com ***//
let password = "" //*** contact Southpaw Tech for your free trial contact@southpawtech.com ***//
let ticket = ""

//creates base URL
const get_endpoint = () => {
    let base_endpoint = server_url + "/" + site + "/" + project + "/REST";
    return base_endpoint;
}

const generateTicket = async () => {
    let url = get_endpoint() + "/get_ticket";  
    let data = {
        'login': user,
        'password': password,
    };
    let response = await fetch( url, {
        method: 'POST',
        body: JSON.stringify(data),
    } )
    ticket = await response.json()
    return ticket;
}

const call_tactic = async (method, kwargs) => {
    ticket = await generateTicket();
    let data = kwargs
    let url = get_endpoint() + "/" + method 
    let headers = {
        "Authorization": "Bearer " + ticket,
        Accept: 'application/json',
    }
    let response = await fetch( url, {
        method: 'POST',
        mode: 'cors',
        headers: headers,
        body: JSON.stringify(data),
    } )
    if (response.status === 200) {
        let sobjects= await response.json();
        return sobjects;
    }
    else {
        throw(response.statusText);
    }
}

export { call_tactic };