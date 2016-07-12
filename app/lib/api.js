//package isomorphic-fetch is used to make asynchronous calls to external APIs
import fetch from 'isomorphic-fetch';
import url from 'url';

function makeUrl(token) {
    const pathname = `users/${token}`;
    return url.format({
        hostname: "react-blackjack-yamidgc9.c9users.io",
        port: 8081,
        pathname
    });
}

/* "Fetch" is a built-in JavaScript function.
The Isomorphic Fetch package allows that fetch() calls can be made
from JavaScript environments outside of the browser (like a NodeJS server or a Mocha test).*/

export function fetchUser(token) {
    return fetch(makeUrl(token), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}

//Fetch returns a Promise. After the promise is resolved, 
//we convert the response to a JSON object.

export function patchUser(token, body) {
    return fetch(makeUrl(token), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    }).then(response => response.json());
}