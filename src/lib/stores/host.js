import { writable } from "svelte/store"
// import basehost from '$lib/stores/basehost.js';

/* Default store value */
let base = "c8be-188-138-181-144.ngrok-free.app"
let hostDefault = `https://${base}`

let inactive = ""
/* Set store to default value or localStorage value */
const host = writable(hostDefault);

/* Export store */
export const basehost = writable(base);
export default host;
