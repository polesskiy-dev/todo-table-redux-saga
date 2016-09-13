import fetch from 'isomorphic-fetch'
import * as authUtils from './auth-utils'
/**
 * Check http status.
 *
 * If not OK - resolve promise and throw server message text, else - return same response.
 *
 * @param res - server response
 */
const checkHttpStatus = (res) => (res.ok) ? res : res.text().then(err => {
    throw err;
});

/**
 * POST payload to url
 * @param url
 * @param payload
 */
export const post = (url, payload) =>
    fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": authUtils.getTokenFromStorage(),
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(checkHttpStatus)
        .then(res => res.json());

/**
 * GET data from url
 * @param url
 */
export const get = (url) =>
    fetch(url,
        {
            method: 'GET',
            headers: {"Authorization": authUtils.getTokenFromStorage()}
        })
        .then(checkHttpStatus)
        .then(res => res.json());

