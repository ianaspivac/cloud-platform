import { writable } from "svelte/store"

/* Default store value */
let tokenDefault = ""

/* Check for an existing value in localStorage */
if (typeof localStorage !== "undefined") {
    if (localStorage.getItem("token") !== null) {
        tokenDefault = localStorage.getItem("token")
    }
}

/* Set store to default value or localStorage value */
const token = writable(tokenDefault);

/* Export store */
export default token;

/* Listen for changes to the store, and update localStorage with the most recent value */
token.subscribe((newValue) => {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("token", newValue);
    }
});