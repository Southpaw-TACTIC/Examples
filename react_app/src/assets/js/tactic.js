// @ts-nocheck
// -----------------------------------------------------------------------------
//
//  Copyright (c) 2017, Southpaw Technology Inc., All Rights Reserved
//
//  PROPRIETARY INFORMATION.  This software is proprietary to
//  Southpaw Technology Inc., and is not to be reproduced, transmitted,
//  or disclosed in any way without written permission.
//
//

// NOTE: this code is not completely TypeScript compliant yet

/* Bootstrap TACTIC API */

var spt = {};

// Fixes
spt.browser = {};
spt.browser.is_IE = function() { return false; }


// simple exception class to just rethrow exception
spt.exception = {};

spt.exception.handle_fault_response = function( response_text ) {
    alert( response_text )
}

spt.exception.handler = function( ex ) {
    alert( ex )
}


/* START: environment.js */

// -----------------------------------------------------------------------------
//
//  Copyright (c) 2008, Southpaw Technology Inc., All Rights Reserved
//
//  PROPRIETARY INFORMATION.  This software is proprietary to
//  Southpaw Technology Inc., and is not to be reproduced, transmitted,
//  or disclosed in any way without written permission.
//
//

// ---------------------------------------------------------------------
// Global environment
// ---------------------------------------------------------------------


/* *****************************************************************************

    SPT Environment
    ---------------

********************************************************************************
*/


spt.Environment = function() {
    this.site = null;
    this.project_code = null;
    //this.url = null;
    this.user = null;
    this.user_id = null;
    this.login_groups = [];
    this.ticket = null;
    this.palette = null;
    this.transfer_mode = null;
    this.client_handoff_dir = null;
    this.client_repo_dir = null;
    this.colors = {};
    this.libraries = {};
    this.kiosk_mode = false;

    // by default, look at the browser
    if (typeof(document) !== 'undefined') {
        var location = document.location;
        var port = location.port;
        this.server_url = location.protocol + "//" + location.hostname;
        if (port)
            this.server_url = this.server_url + ':' + port
    }



    this.set_site = function(site) {
        if (site) {
            this.site = site;
        }
    }
    this.get_site = function() {
        return this.site;
    }


    this.set_project = function(project_code) {
        this.project_code = project_code;
    }
    this.get_project = function(project_code) {
        return this.project_code;
    }

    this.set_user = function(user) {
        this.user = user;
    }
    this.get_user = function() {
        return this.user;
    }

    this.set_user_id = function(user_id) {
        this.user_id = user_id;
    }
    this.get_user_id = function() {
        return this.user_id;
    }
    this.set_login_groups = function(login_groups) {
        this.login_groups = login_groups;
    }
    this.get_login_groups = function() {
        return this.login_groups;
    }

    this.set_client_handoff_dir = function(dir) {
        this.client_handoff_dir = dir;
    }
    this.get_client_handoff_dir = function(dir) {
        return this.client_handoff_dir;
    }

    this.set_client_repo_dir = function(dir) {
        this.client_repo_dir = dir;
    }
    this.get_client_repo_dir = function(dir) {
        return this.client_repo_dir;
    }

    this.set_transfer_mode = function(transfer_mode) {
        this.transfer_mode = transfer_mode;
    }
    this.get_transfer_mode = function() {
        return this.transfer_mode;
    }


    this.set_palette = function(palette) {
        this.palette = palette;
    }
    this.get_palette = function() {
        return this.palette;
    }


    this.set_colors = function(colors) {
        this.colors = colors;
    }
    this.get_colors = function() {
        return this.colors;
    }


    this.add_library = function(library) {
        this.libraries[library] = true;
    }
    this.get_libraries = function() {
        return this.libraries;
    }
    this.has_library = function(library) {
        var state = this.libraries[library];
        if (!state) {
            return false;
        }
        else {
            return true;
        }
    }

    this.set_kiosk_mode = function(mode) {
        if (mode === 'true' || mode === true)
            this.kiosk_mode = true;
    }
    this.get_kiosk_mode = function() {
        return this.kiosk_mode;
    }






    /*
     * Url methods
     */
    this.set_server_url = function(server_url) {
        if (! server_url.match(/^http(s?):/)) {
            server_url = "http://" + server_url;
        }
        this.server_url = server_url;
    }
    this.get_server_url = function() {
        return this.server_url;
    }

    this.get_api_url = function(server_name) {
        if (typeof(server_name) === 'undefined') {
            return this.server_url + "/tactic/default/Api/"
        }
        else if (server_name.substr(0, 4) === "http") {
            return server_name + "/tactic/default/Api/"
        }
        else {
            return "http://" + server_name + "/tactic/default/Api/"
        }
    }


    this.is_local_url = function() {
        if (this.server_url.test(/\/\/localhost/) ||
                this.server_url.test(/\/\/127\.0\.0\.1/) ) {
            return true;
        }
        return false;
    }


    this.set_ticket = function(ticket) {
        this.ticket = ticket;
    }

    this.get_ticket = function() {
        if (this.ticket !== null) {
            return this.ticket;
        }

        var ticket = this.read_cookie('login_ticket');
        return ticket;
    }

    this.read_cookie = function(key) {
        if (typeof(document) !== 'undefined') {
            var value = document.cookie.match('(?:^|;)\\s*' + key.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1') + '=([^;]*)');
                    return (value) ? decodeURIComponent(value[1]) : null;
        }
        else return null;
    }

    this.get_widget_server_url = function(param_dict) {

        var location = window.location;
        var base = location.protocol + "//" + location.host;

        var url = base + '/tactic/default/WidgetServer/?project=' + this.project_code +'&';

        if (this.site !== "default" && this.site !== null)
        {
            url = base + '/tactic/' + this.site + '/default/WidgetServer/?project=' + this.project_code +'&';
        }

        for (let param in param_dict)
            url += param + '=' + param_dict[param] + '&';

        return url
    }



}



spt.Environment._environment = null;
spt.Environment.get = function() {
    if (this._environment === null) {
        this._environment = new spt.Environment();
    }
    return this._environment;
}


/* END: environment.js */


/* START: xmlrpc.js */

/*
    Copyright (c) 2005 Redstone Handelsbolag

    This library is free software; you can redistribute it and/or modify it under the terms
    of the GNU Lesser General Public License as published by the Free Software Foundation;
    either version 2.1 of the License, or (at your option) any later version.

    This library is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
    See the GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License along with this
    library; if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330,
    Boston, MA  02111-1307  USA


    Note from Southpaw Technology:
        This library was taken from http://xmlrpc.sourceforge.net/
    It was distributed as ajax.js which we have renamed to xmlrpc.js.  There
    was no license under the original file, so we have added the same
    GNU Lesser General Public License that came with the rest of the
    distribution (which was all in Java).

    We have made a number of enhancements including reworking the serialization
    so that it does not affect change the prototype of base types
*/



/**
 *  Creates a connection object that may be used to post messages
 *  to a server.
 */
function Connection()
{
    var self = this;
    this.callback = null;

    this.set_callback = function(callback) {
        this.callback = callback;
    }


    /**
     *  Returns an XmlHttpRequest object for the current browser.
     */
    this.getXmlHttpRequest = function()
    {
        var result = null;

        try
        {
            result = new XMLHttpRequest();
        }
        catch ( e )
        {
            throw(e);
/*
            try
            {
                result = new ActiveXObject( 'Msxml2.XMLHTTP' )
            }
            catch( e )
            {
                var success = false;

                var MSXML_XMLHTTP_PROGIDS = new Array(
                    'Microsoft.XMLHTTP',
                    'MSXML2.XMLHTTP',
                    'MSXML2.XMLHTTP.5.0',
                    'MSXML2.XMLHTTP.4.0',
                    'MSXML2.XMLHTTP.3.0' );

                for ( let i = 0; i < MSXML_XMLHTTP_PROGIDS.length && !success; i++ )
                {
                    try
                    {
                        result = new ActiveXObject( MSXML_XMLHTTP_PROGIDS[ i ] );
                        success = true;
                    }
                    catch ( e )
                    {
                        result = null;
                    }
                }
            }
*/
        }

        self.xmlHttpRequest = result;
        return result;
    }

    /**
     *  Posts a message to a server.
     */
    this.post = function( url, content, contentType )
    {
        if ( typeof self.xmlHttpRequest.abort === 'function' && self.xmlHttpRequest.readyState !== 0 )
        {
            self.xmlHttpRequest.abort();
        }

        // by default, async is false
        var async = false;

        // handle asynchronous mode
        if (this.callback !== null) {
            async = true;
            var callback = this.callback;
            var request = self.xmlHttpRequest;
            self.xmlHttpRequest.onreadystatechange = function() {
                callback(request);
            }
        }


        self.xmlHttpRequest.open( 'POST', url, async );

        if ( typeof self.xmlHttpRequest.setRequestHeader === 'function' )
        {
            self.xmlHttpRequest.setRequestHeader(
                'Content-Type',
                contentType );
        }

        try {
            self.xmlHttpRequest.send( content );
        }
        catch(e) {
            // spt.error("Error connecting to TACTIC server.  Please contact the Administrator of this server." );
            throw(e);
        }

        //return self.xmlHttpRequest.responseText;
        //return self.xmlHttpRequest.responseXML;
        // only send the request back now
        return self.xmlHttpRequest
    }



    if ( !this.getXmlHttpRequest() )
    {
        throw new Error( "Could not load XMLHttpRequest object" );
    }
}



/**
 *  Client object constructor.
 */
function AjaxService( url, handlerName )
{
    this.url = url;
    this.handlerName = handlerName;
    this.connection = new Connection();
}

AjaxService.prototype.set_callback = function(callback) {
    this.connection.set_callback(callback);
}


/**
 *  Posts an XML-RPC message to the supplied method using the
 *  given arguments.
 */
AjaxService.prototype.invoke = function( method, arguments2 )
{
    return this.connection.post( this.url, this.getMessage( method, arguments2 ), 'text/xml' );
}

/**
 *  Generates an XML-RPC message based on the supplied method name
 *  and argument array.
 */
AjaxService.prototype.getMessage = function( method, arguments2 )
{
    if ( arguments2 === null ) {
        arguments2 = new Array();
    }

/*
    var message =
        '<?xml version="1.0"?><methodCall><methodName>' +
        this.handlerName + '.' + method +
        '</methodName>';
*/
    var message =
        '<?xml version="1.0"?><methodCall><methodName>' +
        method +
        '</methodName>';

    if ( arguments.length > 0 )
    {
        message += '<params>';

        for ( let i = 0; i < arguments2.length; i++ )
        {
            var argument = arguments2[ i ];
            if (argument === undefined) {
                alert("WARNING: argument index ["+i+"] of method ["+method+"] is undefined");
            }
            var serialized = '<param><value>' + spt.xmlrpc.serialize(argument) + '</value></param>';
            message += serialized;

        }

        message += '</params>';
    }

    message += '</methodCall>';
    //alert(message);
    return message;
}


spt.xmlrpc = {};

//
// Main serialization function
//
spt.xmlrpc.serialize = function(element) {
    //var type = $type(element);
    // Avoid using Mootools type to handle their base types as well
    //var type = typeOf(element)
    var type = typeof element
    /*
    if (type === 'element') {
        spt.alert('Illegal attempt to serialize an html element. Please use a hash as arguments of a JS Client API call.');
        return;
    }
    */

    if (type === 'array') {
        return spt.xmlrpc.array(element);
    }
    else if (type === 'hash') {
        return spt.xmlrpc.hash(element);
    }
    else if (type === 'string') {
        return spt.xmlrpc.string(element);
    }
    else if (type === 'number') {
        return spt.xmlrpc.number(element);
    }
    else if (type === 'boolean') {
        return spt.xmlrpc.boolean(element);
    }
    else if (type === 'date') {
        return spt.xmlrpc.boolean(element);
    }
    else {
        if (type === 'object') {
            // TODO, when js 1.8 is more common, use Array.isArray()
            if (Object.prototype.toString.call( element ) === '[object Array]') {
                return spt.xmlrpc.array(element);
            }
        }
        return spt.xmlrpc.object(element);
    }

}


//
// Serialization functions for the complex datatypes.
//
spt.xmlrpc.object = function(element)
{
    var result = '<struct>';
    for ( var member in element )
    {
        var sub_element = element[member];
        if ( sub_element === undefined ) {
            continue;
        }
        if ( typeof( sub_element ) !== 'function' )
        {
            result += '<member>';
            result += '<name>' + member + '</name>';
            result += '<value>' + spt.xmlrpc.serialize(sub_element) + '</value>';
            result += '</member>';
        }
    }

    result += '</struct>';
    return result;
}


spt.xmlrpc.array = function(element)
{
    var result = '<array><data>';

    for ( let i = 0; i < element.length; i++ )
    {
        var sub_element = element[i];
        result += '<value>' + spt.xmlrpc.serialize(sub_element) + '</value>';
    }

    result += '</data></array>';
    return result;
}



spt.xmlrpc.hash = function(element)
{
    var result = '<struct>';
    for ( var member in element )
    {
        var sub_element = element[member];
        if ( sub_element === undefined ) {
            continue;
        }
        if ( typeof( sub_element ) !== 'function' )
        {
            result += '<member>';
            result += '<name>' + member + '</name>';
            result += '<value>' + spt.xmlrpc.serialize(sub_element) + '</value>';
            result += '</member>';
        }
    }

    result += '</struct>';
    return result;
}



//
// Serialization functions for the String datatype.
//
spt.xmlrpc.string = function(element)
{
    var expression = '' + element;

    // process unicode
    /*
    var value = expression;
    var new_value = "";
    for ( let i = 0; i < value.length; i++ ) {
        var char = value.substr(i,1);
        var ord = String.charCodeAt(char);
        if (ord > 127) {
            char = "&#" + ord + ";";
        }
        new_value += char;
    }
    expression = new_value;
    */

    expression = expression.replace(/&/g, "&amp;");
    expression = expression.replace(/</g, "&lt;");
    expression = expression.replace(/>/g, "&gt;");



    expression = '<string>' + expression + '</string>';
    return expression
}

/**
 *  Serialization functions for the Number datatype.
 */
spt.xmlrpc.number = function(element)
{
    if ( element % 1 !== 0 ) // Very crude way of determining type. May be mismatch at server.
    {
        return '<double>' + element + '</double>';
    }
    else
    {
        return '<i4>' + element + '</i4>';
    }
}

/**
 *  Serialization function for the Boolean datatype.
 */
spt.xmlrpc.boolean = function(element)
{
    if (element === true)
        element = 1;
    else
        element = 0;
    return '<boolean>' + element + '</boolean>';
}


/**
 *  Serialization function for Date datatype.
 */
spt.xmlrpc.date = function(element)
{
    return '<dateTime.iso8601>' +
       element.getFullYear() +
       ( element.getMonth() < 10 ? '0' : '' ) + element.getMonth() +
       ( element.getDay() < 10 ? '0' : '' ) + element.getDay() + 'T' +
       ( element.getHours() < 10 ? '0' : '' ) + element.getHours() + ':' +
       ( element.getMinutes() < 10 ? '0' : '' ) + element.getMinutes() + ':' +
       ( element.getMinutes() < 10 ? '0' : '' ) + element.getSeconds() +
       '</dateTime.iso8601>'; // Phew :-)
}



/* END: xmlrpc.js */


/* START: client_api.js */

// -----------------------------------------------------------------------------
//
//  Copyright (c) 2008, Southpaw Technology Inc., All Rights Reserved
//
//  PROPRIETARY INFORMATION.  This software is proprietary to
//  Southpaw Technology Inc., and is not to be reproduced, transmitted,
//  or disclosed in any way without written permission.
//
// -----------------------------------------------------------------------------
//
//


class TacticServerStub {
    url = null;
    transaction_ticket = null;
    login_ticket = null;
    server_name = null;
    site = null;
    project = null;

    servers = {};
    server = null;


    constructor() {}



    get_promise = () => {
        var promise = new Promise( function(resolve, reject) {
           resolve();
        })
        return promise;
    }

    get = (name) => {
        if (!name) {
            name = "default";
        }

        //if (this.server === null) {
        if (! this.servers[name] ) {
            this.server = new TacticServerStub();

            var env = spt.Environment.get();
            var login_ticket = env.get_ticket();
            var url = env.get_api_url();
            var site = env.get_site();
            var project_code = env.get_project();

            this.server.set_url(url);
            this.server.set_ticket(login_ticket);
            this.server.set_site(site);
            this.server.set_project(project_code);

            this.servers[name] = this.server;

        }
        return this.servers[name];
    }



    set_transaction_ticket = function(ticket) {
        this.transaction_ticket = ticket;
    }


    set_ticket = function(login_ticket) {
        this.login_ticket = login_ticket;
    }

    get_login_ticket = function() {
        return this.login_ticket;
    }


    set_url = function(url) {
        this.url = url;
    }

    get_url = function() {
        return this.url;
    }



    set_site = function(site) {
        if (site) {
            this.site = site;
        }
    }
    get_site = function() {
        return this.site;
    }


    set_project = function(project) {
        this.project = project;
        //this.set_project_state(project);
    }
    get_project = function() {
        return this.project;
    }


    set_palette = function(palette) {
        var env = spt.Environment.get();
        env.set_palette(palette);
    }
    get_palette = function() {
        var env = spt.Environment.get();
        return env.get_palette();
    }



    set_server = function(server_name) {
        this.server_name = server_name;
        var env = spt.Environment.get();
        this.url = env.get_api_url(this.server_name);
    }


    get_server = function() {
        return this.server_name;
    }




    get_transaction_ticket = function() {
        return this.transaction_ticket;
    }


    // a key is an encoded
    set_key = function(key) {

        var str = '';
        if (key.indexOf("http") === 0) {
            str = key;
        }
        else {
            var hex = key.toString();
            for (let i = 0; i < hex.length; i += 2)
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }


        // The format of key is as follows
        // https://portal.southpawtech.com/tegna/tank/key/ABCDEFG
        var parts = str.split("/");
        if (parts.length === 7) {
            var login_ticket = parts[6];
            var hash = parts[5];
            var project = parts[4];
            var site = parts[3];
        }
        else {
            var login_ticket = parts[5];
            var hash = parts[4];
            var project = parts[3];
        }

        if (hash !== "ticket" && hash !== "login_ticket") {
            throw("Malformed key [http<s>://<server>/<site>/<project>/ticket/<ticket>]");
        }

        var server = parts[0] + "/" + parts[1] + "/" + parts[2];

        var env = spt.Environment.get();
        var url = env.get_api_url(server);


        console.log(str);
        console.log("server: " + server);
        console.log("site: " + site);
        console.log("project: " + project);
        console.log("ticket: " + login_ticket);

        /*
        env.set_server_url(server);
        env.set_site(site)
        env.set_project(project);
        env.set_ticket(login_ticket);
        */

        this.set_url(url);
        this.set_ticket(login_ticket);
        if (site)
            this.set_site(site);
        this.set_project(project);

    }

    get_key = function(key) {

        var env = spt.Environment.get();

        var server = env.get_server_url();
        var site = this.get_site();
        var project = this.get_project();
        var ticket = this.get_login_ticket();

        var str = [];
        str.push(server);
        if (site)
            str.push(site)
        str.push(project)
        str.push(ticket)

        str = str.join("/");

        var hex = '';
        for(let i=0;i<str.length;i++) {
            hex += ''+str.charCodeAt(i).toString(16);
        }

        return hex;
    }


    build_search_key = function(search_type, code, project_code, column) {
        if (project_code === null) {
            project_code = this.project;
        }
        if (column === null) {
            column = 'code';
        }
        var temps = search_type.split("?project=");
        search_type = temps[0];
        var search_key;
        if (search_type.test(/^sthpw\//))
            search_key = search_type +"?"+ column +"="+ code;
        else
            search_key = search_type +"?project="+ project_code +"&"+ column +"="+ code;
        return search_key;
    }

    split_search_key = function(search_key) {

        var list = [];
        if (!search_key)
            return search_key;

        if (search_key.test(/&/))
            var tmps = search_key.split('&');
        else
            var tmps = search_key.split('?');
        var codes = tmps[1].split('=')
        //assert len(codes) === 2;
        list.push(tmps[0]);
        list.push(codes[1]);
        return list;
    }


    generate_ticket = function() {
        return this._delegate("generate_ticket");
    }


    get_ticket = function(login, password, kwargs, on_complete, on_error) {
        [on_complete, on_error] = this._handle_callbacks(kwargs, on_complete, on_error);
        let on_complete2 = function(value) {
            value = value.replace(/(\r\n|\n|\r)/gm, '');
            on_complete(value);
        }
        var func_name = "get_ticket";
        var client = new AjaxService( this.url, '' );
        var args = [login, password];
        if (kwargs && kwargs.site)
            args.push(kwargs.site);
        // handle asynchronous mode
        if (typeof(on_complete) != 'undefined' && on_complete != null) {
            var self = this;
            client.set_callback( function(request) {
                self.async_callback(client, request, on_error); //markmark
            } );
            client.invoke( func_name, args );
            // Store on the client
            client.func_name = func_name;
            client.ret_type = "string";
            client.callback = on_complete2;
            return;
        }
        // just do it synchronously
        else {
            var ret_val = client.invoke( func_name, args );
            ret_val = this._handle_ret_val(func_name, ret_val, 'string');
            ret_val = ret_val.replace(/(\r\n|\n|\r)/gm, '');
        }
        return ret_val;
    }

    p_get_ticket = function(login, password, kwargs) {
        return new Promise( function(resolve, reject) {
            if (!kwargs) kwargs = {}
            kwargs.on_complete = function(x) { resolve(x); }
            kwargs.on_error = function(x) { reject(x); }
            this.get_ticket(login, password, kwargs);
        }.bind(this) )
    }


    get_server_version = function(project) {
        var kwargs = null;
        return this._delegate("get_server_version", arguments, kwargs);
    }

    get_server_api_version = function(project) {
        var kwargs = null;
        return this._delegate("get_server_api_version", arguments, kwargs);
    }


    /*
     * Transaction methods
     */
    set_project_state = function(project) {
        var kwargs = null;
        return this._delegate("set_project", arguments, kwargs);
    }



    start = function(kwargs) {
        if (this.project === null) {
            alert("Project is null on start()");
            throw("Project is null on start()");
        }



        var client = new AjaxService( this.url, '' );
        var args = [];
        var ticket = {
            'ticket': this.login_ticket,
            'site': this.site,
            'project': this.project,
            'palette': this.get_palette(),
            'language': 'javascript'
        };
        //args.push(this.login_ticket);
        args.push(ticket);
        args.push(this.project);
        args.push(kwargs);
        var ret_val = client.invoke( "start", args );
        this.transaction_ticket = this._parse_result(ret_val, "start");

        // put this transaction on the undo queue
        //var server_cmd = new TacticServerCmd(this);
        //Command.add_to_undo(server_cmd);

        return this.transaction_ticket;
    }

    finish = function(kwargs) {
        var ret_val = this._delegate("finish", arguments, kwargs);
        this.transaction_ticket = null;
        return ret_val;
    }

    abort = function() {
        return this._delegate("abort", arguments);
    }

    undo = function(kwargs) {
        return this._delegate("undo", arguments, kwargs);
    }

    redo = function(kwargs) {
        return this._delegate("redo", arguments, kwargs);
    }

    /*
     * Simple Ping Test
     */
    ping = function() {
        return this._delegate("ping");
    }


    get_connection_info = function() {
        return this._delegate("get_connection_info");
    }



    /*
     * Preferences
     */
    get_preference = function(key) {
        return this._delegate("get_preference", arguments);
    }



    set_preference = function(key, value) {
        return this._delegate("set_preference", arguments);
    }



    /*
     * Logging facilities
     */
    log = function(level, message, kwargs) {
        return this._delegate("log", arguments);
    }


    /*
     * Messaging facilities
     */

    get_message = function(key) {
        return this._delegate("get_message", arguments);
    }

    get_messages = function(keys) {
        return this._delegate("get_messages", arguments);
    }




    log_message = function(key, message, kwargs) {
        return this._delegate("log_message", arguments, kwargs);
    }

    subscribe = function(key, kwargs) {
        return this._delegate("subscribe", arguments, kwargs);
    }

    unsubscribe = function(key, kwargs) {
        return this._delegate("unsubscribe", arguments, kwargs);
    }

    /*
     * interaction logging
     */
    add_interaction = function(key, data, kwargs) {
        let callback = function() {console.log("done")};
        return this._delegate("add_interaction", arguments, kwargs, null, callback);
    }

    get_interaction_count = function(key, kwargs) {
        return this._delegate("get_interaction_count", arguments, kwargs);
    }

    /*
     * Checkin/checkout methods
     */
    upload_file = function(file_path, ticket, subdir) {
        if (typeof(ticket) === 'undefined') {
            ticket = this.login_ticket;
        }
        var applet = spt.Applet.get();
        applet.upload_file(file_path, ticket, subdir);
    }


    upload_directory = function(dir_path, ticket) {
        if (typeof(ticket) === 'undefined') {
            ticket = this.login_ticket;
        }
        var applet = spt.Applet.get();
        return applet.upload_directory(dir_path, ticket);
    }



    get_upload_file_size = function(file_path) {
        return this._delegate("get_upload_file_size", arguments);
    }




    create_snapshot = function(search_key, context, kwargs) {
        return this._delegate("create_snapshot", arguments, kwargs);
    }


    _find_source_path = function(path) {
        var applet = spt.Applet.get();

        var sandbox_root = null;
        var parts = path.split("/");
        for (let i = parts.length-1; i > 0; i--) {
            var dir = parts.slice(0, i);
            dir = dir.join("/");
            let root_dir = dir + "/.tactic/sandbox_root";
            if (applet.exists(root_dir) ) {
                sandbox_root = dir;
                break;
            }
        }

        if (sandbox_root === null) {
            return path;
        }

        var pattern = sandbox_root + "/";
        path = path.replace(pattern, "")
        return path;
    }


    simple_checkin = function(search_key, context, file_path, kwargs) {
        if (typeof(kwargs) === "undefined") {
            kwargs = {__empty__:true};
        }
        var mode_options = ['upload','uploaded', 'copy', 'move', 'inplace','local'];
        var mode = kwargs['mode'];
        if (mode === undefined) mode = "upload";
        if (typeof(file_path) !== 'string') {
            spt.alert("file_path should be a string instead of an array.");
            return;
        }
        var applet = null;
        if (mode !== 'uploaded') {
            // put in a check for Perforce for the moment because file.exists()
            // is very slow when looking for //depot
            if (file_path.substr(0, 2) !== '//') {
                var applet = spt.Applet.get();
                if (applet.is_dir(file_path)){
                    alert('[' + file_path + '] is a directory. Exiting...');
                    return;
                }
            }
        }

        if (mode === 'upload') {
            var ticket = this.transaction_ticket;

            this.upload_file(file_path, ticket);
            //file_path = spt.path.get_filesystem_path(file_path);
            kwargs.use_handoff_dir = false;
        }
        // already uploaded
        else if (mode === 'uploaded') {
            kwargs.use_handoff_dir = false;
            //file_path = spt.path.get_filesystem_path(file_path);
        }
        else if (['copy', 'move'].contains(mode)) {
            var handoff_dir = this.get_handoff_dir();
            kwargs.use_handoff_dir = true;
            applet.makedirs(handoff_dir);
            applet.exec("chmod 777 " + handoff_dir);
            var basename = spt.path.get_basename(file_path);

            if (mode === 'move') {
                applet.move_file(file_path, handoff_dir + '/' +  basename);
            }
            else if (mode === 'copy') {
                applet.copy_file(file_path, handoff_dir + '/' +  basename);
                // it moves from handoff to repo during check-in
            }
            mode = 'create';

            // this is meant for 3.8, commented out for now
            /*
            var delayed = true;
            if (delayed) {
                mode = 'local'; // essentially, local just means delayed
                kwargs.mode = 'local';
            }*/
        }


        // find the source path
        // DISABLING for now until client can recognize this
        //var source_path = this._find_source_path(file_path);
        //console.log("source_path: " + source_path);
        //kwargs['source_path'] = source_path;

        /* Test check-in to SCM
        if (spt.scm) {
            var editable = true;
            var scm_info = spt.scm.run("commit_file", [file_path, description, editable]);
            return;
        }

        */


        // do the checkin
        var snapshot = this._delegate("simple_checkin", arguments, kwargs);
        var files = snapshot['__file_sobjects__'];

        if (mode === 'local') {
            var applet = spt.Applet.get();
            var files = this.eval("@SOBJECT(sthpw/file)", {search_keys:snapshot});
            var base_dirs = this.get_base_dirs();
            var client_repo_dir = base_dirs.win32_local_repo_dir;
            if (typeof(client_repo_dir) === 'undefined' || client_repo_dir === '')
            {
                client_repo_dir = base_dirs.win32_local_base_dir + "/repo";
            }


            // move the files directly to the local repo
            for (let i = 0; i < files.length; i++) {
                var file = files[i];
                var rel_path = file.relative_dir + "/" + file.file_name;
                var repo_path = client_repo_dir + "/" + rel_path;
                var tmp_path = repo_path + ".temp";
                applet.copy_file(file_path, tmp_path);
                applet.move_file(tmp_path, repo_path);
                var md5 = applet.get_md5(repo_path);
                this.update(file, {md5: md5});

            }
        }

        return snapshot;
    }




    group_checkin = function(search_key, context, file_path, file_range, kwargs)
    {
        if (typeof(kwargs) === 'undefined') {
            kwargs = {__empty__:true};
        }

        var mode = kwargs.mode;
        // default is "uploaded"??
        //if (typeof(mode) === 'undefined') mode = 'copy';

        var mode_options = ['upload', 'copy', 'move'];
        if (typeof(mode) !== "undefined") {
            //if mode not in mode_options:
            //    raise TacticApiException('Mode must be in %s' % mode_options);

            // brute force method
            //dir = os.path.dirname(file_path)
            var handoff_dir = this.get_handoff_dir();

            var use_handoff_dir;

            var expanded_paths;
            if (typeof(file_path) === 'object') {
                expanded_paths = file_path;
            }
            else {
                expanded_paths = spt.file.expand_paths(file_path, file_range);
            }

            if (mode === 'move') {
                for (let i = 0; i < expanded_paths.length; i++) {
                    var path = expanded_paths[i];
                    var parts = path.split("/");
                    var basename = parts[parts.length-1];
                    let applet = spt.Applet.get();
                    applet.move_file(path, handoff_dir+'/'+basename);
                }
                use_handoff_dir = true;
                mode = 'create';
            }
            else if (mode === 'copy') {
                for (let i = 0; i < expanded_paths.length; i++) {
                    var path = expanded_paths[i];
                    var parts = path.split(/[\/\\]/);
                    var basename = parts[parts.length-1];
                    let applet = spt.Applet.get();
                    applet.copy_file(path, handoff_dir+'/'+basename);
                }
                use_handoff_dir = true;
                mode = 'create';
            }
            // use a custom protocol
            else if (mode === 'custom') {

                var command = kwargs.command;
                if (typeof(command) === 'undefined') {
                    return "No command defined";
                }
                for (let i = 0; i < expanded_paths.length; i++) {
                    var path = expanded_paths[i];
                    var parts = path.split(/[\/\\]/);
                    var basename = parts[parts.length-1];
                    let applet = spt.Applet.get();
                    let actual = command;
                    actual = actual.replace("%s", path);
                    actual = actual.replace("%s", handoff_dir+'/'+basename);
                    // convert all of the paths back to windows paths??
                    actual = actual.replace(/\//g, "\\");
                    applet.makedirs(handoff_dir);
                    applet.exec(actual);
                }
                use_handoff_dir = true;


            }
            else if (mode === 'upload') {
                let applet = spt.Applet.get();
                for (let i = 0; i < expanded_paths.length; i++) {
                    var path = expanded_paths[i];
                    applet.upload_file(path);
                }
                use_handoff_dir = false;
            }
        }

        delete(kwargs.command);
        return this._delegate("group_checkin", arguments, kwargs);

    }


    directory_checkin = function(search_key, context, dir, kwargs)
    {
        if (typeof(kwargs) === 'undefined') {
            kwargs = {__empty__:true};
        }

        //if mode not in ['copy', 'move', 'inplace']:
        //    raise TacticApiException('mode must be either [move] or [copy]')

        if (!kwargs.mode) {
            kwargs.mode = 'copy';
        }
        var mode = kwargs.mode;

        // make sure that handoff dir is empty
        var applet = spt.Applet.get();

        if (!applet.is_dir(dir)){
            alert('[' + dir + '] is not a directory. Exiting...');
            return;
        }

        // remove trailing / or \
        dir = dir.replace(/[\/\\]+$/, '');
        // replace all slashes
        dir = dir.replace(/\\/g, "/");

        if (mode === 'move' || mode === 'copy') {
            var handoff_dir = this.get_handoff_dir();
            applet.rmtree(handoff_dir);
            applet.makedirs(handoff_dir);
            applet.exec("chmod 777 " + handoff_dir);

            // copy or move the tree
            var parts = dir.split(/[\/\\]/);
            var dirname = parts.splice(0, parts.length-1).join("/");
            var basename = parts[parts.length-1];

            if (mode === 'move') {
                applet.move(dir, handoff_dir + "/" + basename);
                kwargs.use_handoff_dir = true;
            }
            else if (mode === 'copy') {
                applet.copytree(dir, handoff_dir + "/" + basename);
                kwargs.use_handoff_dir = true;
            }
            mode = 'create';
        }
        else if (mode === 'upload') {
            var files = applet.upload_directory(dir);
            kwargs.use_handoff_dir = false;

        }
        else if (mode === 'uploaded') {
            kwargs.use_handoff_dir = false;
        }


        return this._delegate("simple_checkin", arguments, kwargs);

    }



    add_dependency = function(snapshot_code, file_path, kwargs) {
        return this._delegate("add_dependency", arguments, kwargs);
    }


    add_dependency_by_code = function(to_snapshot_code, from_snapshot_code, kwargs) {
        return this._delegate("add_dependency_by_code", arguments, kwargs);
    }

    add_directory = function(snapshot_code, dir, kwargs) {
        if (!kwargs) {
            kwargs = {__empty__:true};
        }
        if (!kwargs.mode) {
            kwargs.mode = 'copy';
        }

        var mode = kwargs.mode;
        if ( !(mode in {'copy':'', 'move':'', 'preallocate':'', 'manual':''}) ) {
            throw("Mode must be in [copy, move, preallocate, manual]");
        }

        var use_handoff_dir;
        var handoff_dir;

        if (mode in {'copy':'', 'move':''}) {
            var applet = spt.Applet.get();

            handoff_dir = this.get_handoff_dir()

            // make sure that handoff dir is empty
            applet.rmtree(handoff_dir);
            applet.makedirs(handoff_dir);

            // remove trailing / or \
            dir = dir.replace(/[\/\\]+$/, '');

            // copy or move the tree
            var parts = dir.split(/[\/\\]/);
            var basename = parts[parts.length-1];

            if (mode === 'move') {
                applet.move(dir, handoff_dir + "/" + basename);
            }
            else if (mode === 'copy') {
                applet.copytree(dir, handoff_dir + "/" + basename);
            }
            use_handoff_dir = true;
            mode = 'create';
        }
        else if (mode in {'manual':''}) {
            // files are already in handoff
            use_handoff_dir = true;
        }
        else {
            use_handoff_dir = false;
        }

        kwargs.use_handoff_dir = use_handoff_dir;
        return this._delegate("add_file", arguments, kwargs )
    }


    add_file = function(snapshot_code, file, kwargs) {
        // If no mode is specified, set the default mode to 'copy'.
        if (!kwargs) {
            kwargs = {__empty__:true};
        }
        if (!kwargs.mode) {
            kwargs.mode = 'preallocate';
        }
        var mode = kwargs.mode;
        if ( !(mode in {'copy':'', 'move':'', 'preallocate':'', 'manual': '', 'upload': '', 'uploaded': ''}) ) {
            throw("Mode '" + mode + "' must be in [copy, move, preallocate, manual, upload, uploaded]");
        }

        //file = spt.path.get_filesystem_path(file);
        var use_handoff_dir;
        var handoff_dir;

        if (mode in {'copy':'', 'move':''}) {
            var applet = spt.Applet.get();

            handoff_dir = this.get_handoff_dir()

            // make sure that handoff dir is empty
            applet.rmtree(handoff_dir);
            applet.makedirs(handoff_dir);

            // copy or move the file
            var basename = spt.path.get_basename(file);

            if (mode === 'move') {
                applet.move(file, handoff_dir + "/" + basename);
            }
            else if (mode === 'copy') {
                applet.copy_file(file, handoff_dir + "/" + basename);
            }
            use_handoff_dir = true;
            mode = 'create';
        }
        else if (mode in {'manual':''}) {
            // files are already in handoff
            use_handoff_dir = true;
        }
        else if (mode === 'upload') {
            var ticket = this.transaction_ticket;
            this.upload_file(file, ticket);
            use_handoff_dir = false;
        }
        else {
            use_handoff_dir = false;
        }

        kwargs.use_handoff_dir = use_handoff_dir;
        return this._delegate("add_file", arguments, kwargs )
    }


    add_sequence = function(snapshot_code, file, file_type, file_range, kwargs) {
        return this.add_group(snapshot_code, file, file_type, file_range, kwargs);
    }

    add_group = function(snapshot_code, file_pattern, file_type, file_range, kwargs) {
        // If no mode is specified, set the default mode to 'copy'.
        if (!kwargs) {
            kwargs = {__empty__:true};
        }
        if (!kwargs.mode) {
            kwargs.mode = 'preallocate';
        }
        var mode = kwargs.mode;
        if ( !(mode in {'copy':'', 'move':'', 'preallocate':'', 'manual': '', 'upload': '', 'uploaded': ''}) ) {
            throw("Mode '" + mode + "' must be in [copy, move, preallocate, manual, upload, uploaded]");
        }

        //file = spt.path.get_filesystem_path(file);
        var use_handoff_dir;
        var handoff_dir;

        if (mode in {'copy':'', 'move':''}) {
            var applet = spt.Applet.get();

            handoff_dir = this.get_handoff_dir()

            // make sure that handoff dir is empty
            applet.rmtree(handoff_dir);
            applet.makedirs(handoff_dir);

            // copy or move the file
            // FIXME: file is not defined
            var file = null;
            var basename = spt.path.get_basename(file);

            if (mode === 'move') {
                applet.move(file, handoff_dir + "/" + basename);
            }
            else if (mode === 'copy') {
                applet.copy_file(file, handoff_dir + "/" + basename);
            }
            use_handoff_dir = true;
            mode = 'create';
        }
        else if (mode in {'manual':''}) {
            // files are already in handoff
            use_handoff_dir = true;
        }
        else if (mode === 'upload') {
            var ticket = this.transaction_ticket;
            this.upload_file(file, ticket);
            use_handoff_dir = false;
        }
        else { // preallocate
            use_handoff_dir = false;
        }



        kwargs.use_handoff_dir = use_handoff_dir;
        return this._delegate("add_group", arguments, kwargs )
    }





    // DEPRECATED: use checkout_snapshot
    checkout = function(search_key, context, kwargs) {

        // get the files for this search_key, defaults to latest version and checkout to current directory
        if (!kwargs) {
            kwargs = {version: -1, file_type: 'main', to_dir: null, to_sandbox_dir: true, mode: 'download', __empty__:true};
        }
        else if (!kwargs.to_dir && kwargs.to_sandbox_dir==null) {
            kwargs.to_sandbox_dir = true;
        }


        if (kwargs.mode in {'download':'', 'copy':''} === false) {
            throw("Mode '" + kwargs.mode + "' must be in [download, copy]");
        }
        // get the server paths and the client paths to copy
        //var paths = this.get_all_paths_from_snapshot(search_key, {'mode': kwargs.mode});
        //var sand_paths = this.get_all_paths_from_snapshot(search_key, {'mode':'sandbox', filename_mode:'source'});
        var mode = kwargs.mode;
        var to_sandbox_dir = kwargs.to_sandbox_dir;
        var to_dir = kwargs.to_dir;

        delete kwargs.mode;
        delete kwargs.to_sandbox_dir;
        delete kwargs.to_dir;
        let paths = this._delegate("checkout", arguments, kwargs);

        var client_lib_paths = paths['client_lib_paths'];
        var sandbox_paths = paths['sandbox_paths'];
        var web_paths = paths['web_paths'];
        var to_paths = [];

        var applet = spt.Applet.get();
        var env = spt.Environment.get();
        try {
            for (let i=0; i < client_lib_paths.length; i++){
                var client_lib_path = client_lib_paths[i];
                if (to_sandbox_dir){
                    var to_path = sandbox_paths[i];
                    var filename = spt.path.get_basename(to_path);
                }
                else {
                    var filename = spt.path.get_basename(client_lib_path);
                    if (!to_dir)
                        throw("If to_sandbox_dir is set to false, you have to provide a directory for to_dir");

                    var to_path = to_dir + '/' + filename;
                }
                to_paths.push(to_path);

                // copy the file from the repo
                var to_dir = spt.path.get_dirname(to_path);
                if (applet.exists(to_dir) === false)
                    applet.makedirs(to_dir);

                if (mode === 'copy') {
                    if (applet.exists(client_lib_path)) {
                        if (applet.is_dir(client_lib_path))
                            applet.copytree(client_lib_path, to_path);
                        else
                            applet.copy_file(client_lib_path, to_path);
                    }
                    else {
                        throw("Path [" + client_lib_path + "] does not exist");
                    }
                }
                else if (mode === 'download'){
                    let web_path = web_paths[i];
                    applet.download_file(web_path, to_path);
                }


            }
        }
        catch(e) {
           alert(spt.exception.handler(e));
        }
        return to_paths

    }



    checkout_snapshot = function(search_key, sandbox_dir, kwargs) {
        // get the files for this snapshot
        if (!kwargs) {
            kwargs = {};
        }
        if (! kwargs.mode ) {
            let transfer_mode = spt.Environment.get().get_transfer_mode();
            kwargs.mode = transfer_mode;
        }
        if (! kwargs.mode ) {
            kwargs.mode = 'web';
        }


        if (kwargs.mode in {'client_repo':'', 'web':'', 'browser':''} === false) {
            throw("Mode '" + kwargs.mode + "' must be in [client_repo, web, browser]");
        }

        var file_types;
        if (! kwargs.file_types ) {
            file_types = [];
        }
        else {
            file_types = kwargs.file_types;
        }

        var expand_paths;
        if (! kwargs.expand_paths ) {
            expand_paths = true;
        }
        else {
            expand_paths = kwargs.expand_paths;
        }

        // get the server paths and the client paths to copy
        var paths = this.get_all_paths_from_snapshot(search_key, {'mode': kwargs.mode, file_types:file_types, expand_paths: expand_paths});
        var sand_paths = this.get_all_paths_from_snapshot(search_key, {'mode':'sandbox', filename_mode: kwargs.filename_mode, file_types:file_types, expand_paths: expand_paths});

        var applet;
        var dst_paths = [];
        if (kwargs.mode in {'client_repo':'', 'web':''}) {
            applet = spt.Applet.get();
        }
        var env = spt.Environment.get();
        var server_root = env.get_server_url();

        var filename_mode;
        if (!kwargs.filename_mode) {
            filename_mode = 'repo';
        }
        else {
            filename_mode = kwargs.filename_mode;
        }

        try {
        for (let i = 0; i < paths.length; i++ ) {
            var path = paths[i];
            var dst = sand_paths[i];
            var basename;
            if (filename_mode === 'repo') {
                basename = spt.path.get_basename(dst);
            }
            else if (filename_mode === 'versionless') {

                basename = spt.path.get_basename(dst);
                var dir_name = spt.path.get_dirname(dst);
                basename = basename.replace(/_v\d+/i, '');
                dst = dir_name + '/' + basename;

            }
            else if (filename_mode === 'source') {
                basename = spt.path.get_basename(dst);
            }


            // FIXME: this doesn't work for directory checkins.  It flattens
            // the directories
            // remap sandbox paths if one is explicitly supplied
            if (sandbox_dir){
                dst = sandbox_dir + "/" + basename;
            }

            dst_paths.push(dst);

            if (kwargs.mode === 'client_repo'){
                applet.copytree(path, dst);
            }
            else if (kwargs.mode ==='web'){
                var url = server_root + path;
                if (spt.url.exists(url)){
                    applet.download_file(url, dst);
                }
                else {
                    alert(url + ' does not exist on the server. It may have been backed up.');
                }
            }
            else if (kwargs.mode === 'browser'){
                var download_el = document.createElement("a");
                download_el.setAttribute("href",path);
                download_el.setAttribute("download",basename);
                document.body.appendChild(download_el);
                download_el.click();
                document.body.removeChild(download_el);
            }
        }
        }
        catch(e){
           alert(spt.exception.handler(e));
        }
        return dst_paths;
    }



    set_current_snapshot = function(snapshot_code) {
        return this._delegate("set_current_snapshot", arguments, null);
    }

    query_snapshots = function(kwargs) {
        return this._delegate("query_snapshots", arguments, kwargs);
    }

    get_snapshot = function(search_key, kwargs) {
        return this._delegate("get_snapshot", arguments, kwargs);
    }


    get_snapshots_by_relative_dir = function(relative_dir, kwargs) {
        return this._delegate("get_snapshots_by_relative_dir", arguments, kwargs);
    }

    get_sobjects_by_relative_dir = function(relative_dir, kwargs) {
        return this._delegate("get_sobjects_by_relative_dir", arguments, kwargs);
    }



    get_client_dir = function(snapshot_code, kwargs) {
        return this._delegate("get_client_dir", arguments, kwargs);
    }



    get_preallocated_path = function(snapshot_code, kwargs) {
        return this._delegate("get_preallocated_path", arguments, kwargs);
    }

    get_virtual_snapshot_path = function(search_key, context, kwargs) {
        return this._delegate("get_virtual_snapshot_path", arguments, kwargs);
    }

    get_all_dependencies = function(snapshot_code, kwargs) {
        return this._delegate("get_all_dependencies", arguments, kwargs);
    }



    /*
     * Task methods
     */
    create_task = function(search_key, kwargs) {
        return this._delegate("create_task", arguments, kwargs);
    }

    get_tasks = function(search_key, kwargs) {
        return this._delegate("get_tasks", arguments, kwargs);
    }

    get_task_status_colors = function() {
        return this._delegate("get_task_status_colors", arguments);
    }


    add_initial_tasks = function(search_key, kwargs) {
        return this._delegate("add_initial_tasks", arguments, kwargs);
    }


    get_input_tasks = function(search_key, kwargs) {
        return this._delegate("get_input_tasks", arguments, kwargs);
    }

    get_output_tasks = function(search_key, kwargs) {
        return this._delegate("get_output_tasks", arguments, kwargs);
    }



    /*
     * Low Level Database methods
     */
    get_related_types = function(search_type) {
        return this._delegate("get_related_types", arguments);
    }



    query = function(search_type, kwargs, on_complete, on_error) {
        var newArgs = Array.prototype.slice.call(arguments).slice(0,2);
        if(on_complete){
          if(!on_error){
            on_error = function(err){
                console.log(err);
            };
          }
          return this._delegate("query", newArgs, kwargs, "string", on_complete, on_error);
        }

        var value = this._delegate("query", newArgs, kwargs, "string");
        //return this._delegate("query", arguments, kwargs);
        value = JSON.parse(value);
        return value
    }



    /* TEST Promises */
    /*
    query2 = function(search_type, kwargs, on_complete, on_error) {

        [on_complete, on_error] = this._handle_callbacks(kwargs, on_complete, on_error);
        on_complete2 = function(value) {
            value = JSON.parse(value);
            on_complete(value);
        }

        var value = this._delegate("query", arguments, kwargs, "string", on_complete2, on_error);
        // asynchronouse
        if (on_complete) {
            return;
        }
        value = JSON.parse(value);
        return value
    }
    */


    p_query = function(expression, kwargs) {
        return new Promise(function(resolve, reject) {
            if (!kwargs) kwargs = {};
            kwargs.on_complete = function(x){ resolve(x); }
            kwargs.on_error = function (x) { reject(x); }
            return this.query2(expression, kwargs);
        }.bind(this) )
    }




    get_by_search_key = function(search_key, kwargs, on_complete, on_error) {
    	var tmp = this._handle_callbacks(kwargs, on_complete, on_error);
		on_complete = tmp[0]
		on_error = tmp[1]

//         [on_complete, on_error] = this._handle_callbacks(kwargs, on_complete, on_error);
        var value = this._delegate("get_by_search_key", arguments, kwargs, null, on_complete, on_error);
        // asynchronouse
        if (on_complete) {
            return;
        }
        return value

    }

    p_get_by_search_key = function(search_key, kwargs) {
        return new Promise(function(resolve, reject){
            if (!kwargs) kwargs = {}
            kwargs.on_complete = function(x) { resolve(x); }
            kwargs.on_error = function (x) { reject(x); }
            this.get_by_search_key(search_key, kwargs);
        }.bind(this) )
    }




    get_by_code = function(search_type, code) {
        return this._delegate("get_by_code", arguments);
    }


    p_get_by_code = function(search_type, code, kwargs) {
        return new Promise( function(resolve, reject) {
            if (!kwargs) kwargs = {}
            kwargs.on_complete = function(x) { resolve(x); }
            kwargs.on_error = function(x) { reject(x); }
            this.get_by_code(search_type, code, kwargs);
        }.bind(this) )
    }



    insert = function(search_type, data, kwargs) {
        // server.insert(search_type, data, kwargs);
        return this._delegate("insert", arguments, kwargs);

    }

    insert_multiple = function(search_type, data, kwargs) {
        // server.insert(search_type, data, kwargs);
        return this._delegate("insert_multiple", arguments, kwargs);

    }

    update = function(search_type, data, kwargs, on_complete, on_error) {
        var newArgs = Array.prototype.slice.call(arguments).slice(0,3);
        if(on_complete){
          if(!on_error){
            on_error = function(err){
              console.log(err);
            };
          }
          return this._delegate("update", newArgs, kwargs, undefined, on_complete, on_error);
        }

        return this._delegate("update", newArgs, kwargs);
    }



    p_update = function(expression, kwargs) {
        return new Promise(function(resolve, reject) {
            if (!kwargs) kwargs = {};
            kwargs.on_complete =function(x) { resolve(x); }
            return this.query2(expression, kwargs);
        }.bind(this) )
    }






    update_multiple = function(data, kwargs, on_complete, on_error) {
        var newArgs = Array.prototype.slice.call(arguments).slice(0, 2);
        console.log("tactic.js - update_multiple newArgs: ", newArgs);
        data = JSON.stringify(data);
        if(on_complete){
          if(!on_error){
            on_error = function(err){
              console.log(err);
            };
          }
          return this._delegate("update_multiple", arguments, kwargs, undefined, on_complete, on_error);
        }

        return this._delegate("update_multiple", arguments, kwargs);
    }



    //
    // Expression methods
    //
    eval = function(exprssion, kwargs, on_complete, on_error) {

    	var tmp = this._handle_callbacks(kwargs, on_complete, on_error);
		on_complete = tmp[0]
		on_error = tmp[1]

//         [on_complete, on_error] = this._handle_callbacks(kwargs, on_complete, on_error);
        var ret_val = this._delegate("eval", arguments, kwargs, null, on_complete, on_error);
        // asynchronouse
        if (on_complete) {
            return;
        }
        // synchronouse
        if (ret_val && ret_val.status === "ERROR") {
            throw ret_val;
        }
        return ret_val;
    }


    /* Test promises */
    p_eval = function(expression, kwargs) {
        return new Promise(function(resolve, reject) {
            if (!kwargs) kwargs = {}
            kwargs.on_complete = function(x) { resolve(x); }
            kwargs.on_error = function (x) { reject(x); }
            this.eval(expression, kwargs);
        }.bind(this) )
    }



    //
    // SObject methods
    //

    create_search_type = function(search_key, search_type, title, kwargs) {
        return this._delegate("create_search_type", arguments, kwargs);
    }

    add_column_to_search_type = function(search_type, column_name, column_type) {
        return this._delegate("add_column_to_search_type", arguments);
    }

    insert_update = function(search_key, data, kwargs) {
        return this._delegate("insert_update", arguments);
    }


    get_unique_sobject = function(search_type, data) {
        return this._delegate("get_unique_sobject", arguments);
    }


    retire_sobject = function(search_key) {
        return this._delegate("retire_sobject", arguments);
    }

    reactivate_sobject = function(search_key) {
        return this._delegate("reactivate_sobject", arguments);
    }

    delete_sobject = function(search_key, kwargs) {
        return this._delegate("delete_sobject", arguments, kwargs);
    }

    clone_sobject = function(search_key, data) {
        return this._delegate("clone_sobject", arguments);
    }

    set_widget_setting = function(key, value) {
        return this._delegate("set_widget_setting", arguments);
    }

    get_widget_setting = function(key) {
        return this._delegate("get_widget_setting", arguments);
    }

    /*
     * sType Hierarchy Functions
     */

    get_parent = function(search_key, kwargs) {
        return this._delegate("get_parent", arguments)
    }


    get_all_children = function(search_key, child_type, kwargs) {
        return this._delegate("get_all_children", arguments)
    }


    get_parent_type = function(search_key) {
        return this._delegate("get_parent_type", arguments);
    }


    get_child_types = function(search_type) {
        return this._delegate("get_child_types", arguments);
    }


    connect_sobjects = function(src_sobject, dst_sobject, kwargs) {
        return this._delegate("connect_sobjects", arguments, kwargs);
    }


    get_connected_sobjects = function(src_sobject, kwargs) {
        return this._delegate("get_connected_sobjects", arguments, kwargs);
    }

    get_connected_sobject = function(src_sobject, kwargs) {
        return this._delegate("get_connected_sobject", arguments, kwargs);
    }


    /*
     * Instance methods
     */
    add_instance = function(search_key1, search_key2) {
        return this._delegate("add_instance", arguments);
    }

    get_instances = function(search_key, search_type) {
        return this._delegate("get_instances", arguments);
    }

    remove_instance = function(search_key1, search_key2) {
        return this._delegate("remove_instance", arguments);
    }



    /*
     * Note methods
     */
    create_note = function(search_key, note, kwargs) {
        return this._delegate("create_note", arguments, kwargs);
    }

    /*
     * Pipeline methods
     */
    get_pipeline_xml = function(search_key, kwargs) {
        return this._delegate("get_pipeline_xml", arguments, kwargs);
    }

    get_pipeline_processes = function(search_key, kwargs) {
        return this._delegate("get_pipeline_processes", arguments, kwargs);
    }

    get_pipeline_xml_info = function(search_key, kwargs) {
        return this._delegate("get_pipeline_xml_info", arguments, kwargs);
    }

    get_pipeline_processes_info = function(search_key, kwargs) {
        return this._delegate("get_pipeline_processes_info", arguments, kwargs);
    }

    /*
     * Widget methods
     */
    get_widget = function(class_name, kwargs) {
        var libraries = spt.Environment.get().get_libraries();
        kwargs.libraries = libraries;

        try {
            var ret_val = this._delegate("get_widget", arguments, kwargs, "string");
            return ret_val;
        }
        catch(e) {
            var e_msg = spt.exception.handler(e);
            if (/Cannot login with key/.test(e_msg))
                this._redirect_login();
            else
                alert(e_msg);
            return;
        }
    }



    // Test load view
    load_view = function(el, view, kwargs, on_complete, on_error) {

        if (!kwargs) kwargs = {};
        kwargs['view'] = view;

        var class_name = 'tactic.ui.panel.CustomLayoutWdg';
        var wdg_kwargs = {
            args: kwargs,
            cbjs_action: function(widget) {
                var node = document.createElement("div");

                node.innerHTML = widget;

                el.appendChild(node);

                var scripts = node.getElementsByTagName("script");
                for (let i = 0; i < scripts.length; i++) {
                    var func = function() {
                        eval(scripts[i].innerHTML);

                    };
                    func();
                    scripts[i].remove();
                }

                if (on_complete)
                    on_complete(node);
            }


        };
        this.async_get_widget(class_name, wdg_kwargs);
    }






    class_exists = function(class_path) {
        return this._delegate("class_exists", arguments);
    }


    execute_cmd = function(class_name, args, values, kwargs, on_complete, on_error) {
		var tmp = this._handle_callbacks(kwargs, on_complete, on_error);
		on_complete = tmp[0]
		on_error = tmp[1]

//         [on_complete, on_error] = this._handle_callbacks(kwargs, on_complete, on_error);

        var ret_val = this._delegate("execute_cmd", arguments, kwargs, null, on_complete, on_error);
        if (on_complete) {
            return;
        }
        if (ret_val && ret_val.status === "ERROR") {
            throw ret_val;
        }
        return ret_val;
    }


    /* Test promises */
    p_execute_cmd = function(expression, args, kwargs) {
        return new Promise(function(resolve, reject) {
            if (!kwargs) kwargs = {}
            kwargs.on_complete = function (x) { resolve(x); }
            kwargs.on_error = function (x) { reject(x); }
            this.execute_cmd(expression, args, {}, kwargs);
        }.bind(this) )
    }





    execute_class_method = function(class_name, method, kwargs) {
        return this._delegate("execute_class_method", arguments);
    }



    execute_transaction = function(transaction_xml, kwargs) {
        return this._delegate("execute_transaction", arguments, kwargs);
    }




    execute_python_script = function(script_path, script_kwargs, kwargs) {
		let callback;
        if (kwargs) callback = kwargs.on_complete;
        else callback = null;
        return this._delegate("execute_python_script", arguments, kwargs, null, callback);
    }


    execute_js_script = function(script_path, script_kwargs, kwargs) {
		let callback;
        if (kwargs) callback = kwargs.on_complete;
        else callback = null;
        return this._delegate("execute_js_script", arguments, kwargs, null, callback);
    }





    execute = function(code) {
        return this._delegate("execute", arguments, null);
    }

    check_access = function(access_group, key, access, kwargs) {
        return this._delegate("check_access", arguments, kwargs);
    }

    get_column_names = function(search_type) {
        return this._delegate("get_column_names", arguments, null);
    }

    get_column_info = function(search_type) {
        return this._delegate("get_column_info", arguments, null);
    }

    get_column_widgets = function() {
        var value = ''
        try {
            value = this._delegate("get_column_widgets", arguments, null, "string");
            value = JSON.parse(value);
        }
        catch (e) {
            alert("Error adding the column: " + spt.exception.handler(e));
        }
        return value;
    }


    update_config = function(search_type, view, element_names, kwargs) {
        return this._delegate("update_config", arguments, kwargs);
    }


    get_config_definition = function(search_type, view, element_name, kwargs) {
        return this._delegate("get_config_definition", arguments, kwargs);
    }

    set_config_definition = function(search_type, element_name, kwargs) {
        return this._delegate("set_config_definition", arguments, kwargs);
    }

    add_config_element = function(search_type, view, name, kwargs) {
        return this._delegate("add_config_element", arguments, kwargs);
    }

    set_application_state = function() {
        return this._delegate("set_application_state", arguments, null, null, function() {});
    }


    //
    // Directory methods
    //
    get_paths = function(search_key, kwargs) {
        return this._delegate("get_paths", arguments, kwargs);
    }


    get_base_dirs = function() {
        return this._delegate("get_base_dirs", arguments);
    }

    get_handoff_dir = function() {
        return this._delegate("get_handoff_dir", arguments);
    }

    get_plugin_dir = function() {
        return this._delegate("get_plugin_dir", arguments);
    }

    clear_upload_dir = function() {
        return this._delegate("clear_upload_dir", arguments);
    }



    // Doc methods
    get_doc_link = function(alias) {
        return this._delegate("get_doc_link", arguments, null);
    }



    // Misc
    get_path_from_snapshot = function(snapshot_code, kwargs) {
        return this._delegate("get_path_from_snapshot", arguments, kwargs);
    }


    get_all_paths_from_snapshot = function(snapshot_code, kwargs) {
        return this._delegate("get_all_paths_from_snapshot", arguments, kwargs);
    }


    // async functions

    async_get_widget = function(class_name, kwargs) {
        var libraries = spt.Environment.get().get_libraries();
        kwargs.libraries = libraries;

        var callback = kwargs['cbjs_action'];
        if (!callback) {
            callback = kwargs['callback'];
        }
        if (!callback) {
            callback = kwargs['on_complete'];
        }
        var on_error = function(e) {
            if (e === 0)
                e = 'Received an error (Error 0)';
            else if (e === 502)
                e = 'Timeout Error (Error 502)';
            else if (e === 503)
                e = 'Service is unavailable (Error 503)';

            spt.alert(e);
        };
        this._delegate("get_widget", arguments, kwargs, "string", callback, on_error);
        return;
    }

    async_eval = function(class_name, kwargs) {
        var callback = kwargs['cbjs_action'];
        if (!callback) {
            callback = kwargs['callback'];
        }
        this._delegate("eval", arguments, kwargs, null, callback);
        return;
    }


    // methed that handles asynchronous callbacks.
    // It allows for on_complete to be called in the kwargs as well.
    // It also handles a flag "promise" which can be used with promises which
    // defines an oncomplete that is passed to the "then" function of the
    // promise
    //
    _handle_callbacks = function(kwargs, on_complete, on_error) {
        if (typeof(kwargs) !== 'undefined' && kwargs !== null) {

            if (!on_complete) {
                on_complete = kwargs.on_complete;
            }
            if (!on_error) {
                on_error = kwargs.on_error;
            }

            delete kwargs.on_error;
            delete kwargs.on_complete;
        }
        else {
            on_complete = null;
            on_error = null;
        }

        if (on_complete) {
            if (!on_error) {
                on_error = function(err){
                    throw(err);
                };
            }
        }

        return [on_complete, on_error];

    }


    // method that delegates which function in xmlrpc to call
    //
    // @params:
    //   func_name: the name of the function to execute
    //   passed_args: the required arguments passed into the function
    //   kwargs: the optional arguments passed into the function
    //   ret_type: the type of value returned by the function.  Functions that
    //      return lots of data will often return strings back
    //   callback: a function that is run after the data has been returned.
    //   on_error: A function that is run when a request throws an error.
    //      This is used be get_async_widget() and others
    _delegate = function(func_name, passed_args, kwargs, ret_type, callback, on_error) {


        if (spt._delegate) {
            return spt._delegate(func_name, passed_args, kwargs);
        }


        var client = new AjaxService( this.url, '' );

        var args = [];

        // build the transaction bundle
        if (this.transaction_ticket === null) {
            this.transaction_ticket = this.login_ticket;
        }


        if (!this.transaction_ticket ) {
            throw("Login or transaction ticket is empty. Cannot proceed");
            //return;
        }


        var ticket = {
            'ticket': this.transaction_ticket,
            'site': this.site,
            'project': this.project,
            'palette': this.get_palette(),
            'language': 'javascript'
        };
        args.push(ticket);


        if (typeof(passed_args) === 'undefined') {
            passed_args = [];
        }

        // determine if there was a kwargs passed in
        var num_args;
        var has_kwargs;
        if (typeof(kwargs) === 'undefined' || kwargs === null) {
            num_args = passed_args.length;
            has_kwargs = false;
        }
        else if (kwargs.__empty__) {
            num_args = passed_args.length;
            has_kwargs = true;
        }
        else {
            num_args = passed_args.length - 1;
            has_kwargs = true;
        }

        if (passed_args !== undefined) {
            for (let i=0; i < num_args; i++) {
                args.push(passed_args[i]);
            }
        }

        // Always pass in a kwargs as the last argument.  If kwargs is not
        // present, we send an empty one through
        if (!has_kwargs) {
            args.push({});
        }
        else {
            delete kwargs.__empty__;
            args.push(kwargs);
        }

        //console.log(args);

        // handle asynchronous mode
        if (typeof(callback) !== 'undefined' && callback !== null) {
            var self = this;
            client.set_callback( function(request) {
                self.async_callback(client, request, on_error);
            } );
            client.invoke( func_name, args );

            // Store on the client
            client.func_name = func_name;
            client.ret_type = ret_type;
            client.callback = callback;
            return;
        }

        // just do it synchronously
        else {
            let ret_val = client.invoke( func_name, args );
            return this._handle_ret_val(func_name, ret_val, ret_type);
        }

    }

    _show_login = function() {

        var spinners = document.id(document.body).getElements('.spt_spin');
        spinners.each(function(x) {spt.hide(x)});
        var login_scr = document.getElement('.spt_login_screen');
        login_scr.setStyle('z-index','1100');
        var custom_content = login_scr.getParent('.spt_custom_content');
        if (custom_content) {
            custom_content.setStyle('position','absolute');
            custom_content.setStyle('top','30%');
            custom_content.setStyle('left','50%');
        }
        spt.popup.show_background();
        spt.show(login_scr);

    }
    _redirect_login = function() {

        var ok = function() {
            window.location.reload();
        };
        spt.info('Your session has expired.', {'click': ok});
    }
    async_callback = function(client, request, on_error) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                try {
                    var data = this._handle_ret_val(client.func_name, request, client.ret_type);
                    client.callback(data);
                } catch(e) {
                    // This just alerts ... we want to be handled?
                    //var e_msg = spt.exception.handler(e);
                    let e_msg = "??";
                    if (/Cannot login with key/.test(e_msg)) {
                        this._redirect_login();
                    }
                    else if (on_error) {
                        on_error(e);
                    }
                    else {
                        spt.alert(e_msg);
                    }
                }
            } else {

                if (on_error) {
                    on_error("Cannot connect to server: status returned is ["+request.status+"]")
                }
                else
                    throw("status is " + request.status);
            }
        }
    }



    _handle_ret_val = function(func_name, ret_val, ret_type) {
        if (ret_val.status !== 200) {
            throw(ret_val.status);
        }

        if (ret_type === "raw") {
            return ret_val.responseText;
        }
        if (ret_type === "string") {
            // manually extract the value returned

            var value = ret_val.responseText;
            value = value.replace(/^<\?xml version='1.0'\?>\n<methodResponse>\n<params>\n<param>\n<value><string>/, '');
            value = value.replace(/<\/string><\/value>\n<\/param>\n<\/params>\n<\/methodResponse>/, '');

            value = value.replace(/&amp;/g, "&");
            value = value.replace(/&lt;/g, "<");
            value = value.replace(/&gt;/g, ">");

            // fix inline < > that are not part of the html structure
            value = value.replace(/&spt_lt;/g, "&lt;");
            value = value.replace(/&spt_gt;/g, "&gt;");

            if (value.match("<name>faultCode</name>")) {
                var el = document.createElement("div");
                el.innerHTML = value;
                el = el.getElementsByTagName("value")[2];
                el = el.childNodes[0];
                value = el.innerHTML;
                throw(value);
            }

            return value;
        }
        else {
            var value = this._parse_result(ret_val, func_name);
            return value;
        }
    }


    // parse the return value from XMLRPC request.  This is assumed to be
    // a single return value in JSON format which can be parsed.  However,
    // if this produces an exception, then return a string
    //
    _parse_result = function(ret_val, func_name) {

        var result = ret_val.responseXML;
        if (result === null) {
            ret_val = ret_val.responseText;
            spt.exception.handle_fault_response( ret_val );
            return ""
        }
        // join, normalize the data if the browser supports it, mostly for FF
        if (ret_val.responseXML.normalize)
            ret_val.responseXML.normalize();

        var nodeList = result.getElementsByTagName("string");
        if (nodeList.length === 0) {
            // in IE a fault response has a non-null result, but also has no string nodes, and so goes into this
            // block of code ... so handle it here the same as fault response above
            ret_val = ret_val.responseText;
            var patt = /faultCode/g;
            if (patt.test(ret_val)) {
                spt.exception.handle_fault_response( ret_val );
            }
            return "";
        }

        var child = nodeList[0].firstChild;
        if (child === null) {
            alert("Return format not a string or JSON text");
            alert(ret_val.responseText);
            return {};
        }

        var jsontext;
        // FIXME: you can just use child.nodeValue (it is supported by all browsers) instead of .text or .textContent
        if (spt.browser.is_IE()) {
            jsontext = child.text;
        }
        else {
            jsontext = child.textContent;
        }

        if (jsontext === "OK") {
            return ret_val;
        }

        var value;
        try {
            value = JSON.parse(jsontext);
        } catch(e) {
            // assume it is just a string
            value = jsontext;
            if (func_name !== 'start') {

                ret_val = ret_val.responseText;
                var patt = /faultCode/g;
                if(patt.test(ret_val)) {
                    // Value has the error
                    //spt.exception.handle_fault_response( value );
                    throw value;
                }
                else{
                    alert("Error parsing [" + value + "]");
                }
                return {};
            }
        }

        if (typeof(value) === "undefined") {
            alert("Value returned from server is undefined");
            return {};
        }
        if (value && value.status === "ERROR") {
            throw value;
        }

        return value;
    }

}



//-------------------




var TACTIC = new TacticServerStub();




/* END: client_api.js */


export { spt, TACTIC, TacticServerStub };

