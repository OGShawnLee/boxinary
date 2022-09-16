// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import type { User } from "@prisma/client";
import type { Nullable } from "malachite-ui/types";

declare global {
	declare namespace App {
		interface Locals {
			uid: Nullable<number>;
		}
		// interface PageData {}
		// interface PageError {}
		// interface Platform {}
	}
}

type ClientUser = Omit<User, "email" | "password">;
