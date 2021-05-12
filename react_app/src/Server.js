import { TACTIC, spt } from "./assets/js/tactic";

let server_url = "https://portal.southpawtech.com"
let site = "trial"
let project = "api_test"
let user = "trial_api"
let password = "tactic123"

let ticket = ""

let base_endpoint = server_url+ "/" + site + "/" + project + "/REST";

const get_ticket = async () => {
    if (ticket != "") {
        console.log("ticket exists:" + ticket)
        return ticket;
    }
    ticket = await generateTicket();
    return ticket;
}

const generateTicket = async() => {

    let url = base_endpoint + "/" + "get_ticket";
    let headers = {
        Accept: 'application/json'
    }
    let data = {
        'login': user,
        'password': password,
    };
    let r = await fetch( url, {
        method: 'POST',
        body: JSON.stringify(data),
    } )
    let ticket = await r.json()
    return ticket;
}

const get_endpoint = () => {
    return base_endpoint;
}

const get_server_url = () => {
    return server_url;
}

const get_project = () => {
    return project
}

const get_server = () => {
    console.log("Using get_server from tactic.js.")
    let server = TACTIC.get();
    server.set_server(server_url)
    server.set_site(site)
    server.set_project(project)

    if (ticket != "") {
        console.log("ticket exists:" + ticket)
        server.set_ticket(ticket);
        return server;
    }
    try {
      let ticket = server.get_ticket(user, password);
      server.set_ticket(ticket);

    } catch(e) {
      alert("Error:", e)
    }
    return server;
}

const call_tactic = async (method, kwargs) => {

    let data = kwargs

    let url = get_endpoint() + "/" + method
    console.log(ticket)

    let headers = {
        "Authorization": "Bearer " + ticket,
        Accept: 'application/json',
    }
    let r = await fetch( url, {
        method: 'POST',
        mode: 'cors',
        headers: headers,
        body: JSON.stringify(data),
    } )

    if (r.status == 200) {
        let ret = await r.json();
        return ret;
    }
    else {
        throw("ERROR: " + r.statusText);
    }

}

export { get_endpoint, get_ticket, call_tactic, get_server, get_server_url, get_project };
