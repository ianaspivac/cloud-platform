import { writable } from "svelte/store"

/* Default store value */
let hostDefault = "https://7ff8-188-138-181-144.ngrok-free.app"


/* Set store to default value or localStorage value */
const host = writable(hostDefault);

/* Export store */
export default host;
