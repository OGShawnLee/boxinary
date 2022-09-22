import type { ClientUser } from "@root/app";
import { writable } from "svelte/store";

export const currentUser = writable<ClientUser | null>();
