import { writable } from "svelte/store";

export const sideBarS = writable(false);

export const user_data = writable(false);
export const invited_users = writable([]);


export const admin = writable(false);
