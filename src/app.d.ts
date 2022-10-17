// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import type { Definition, User } from "@prisma/client";
import type { Nullable } from "malachite-ui/types";

declare global {
	declare namespace App {
		interface Locals {
			currentUser: Nullable<{ id: number; name: string; displayName: string }>;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}

type ClientUser = Omit<User, "email" | "password">;

type GameDefinition = Definition & { options: string[] };
