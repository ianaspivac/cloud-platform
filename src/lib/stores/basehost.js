import { writable } from "svelte/store"

/* Default store value */
let host = "c8be-188-138-181-144.ngrok-free.app"

/* Set store to default value or localStorage value */
const basehost = writable(host);

/* Export store */
export default basehost;
