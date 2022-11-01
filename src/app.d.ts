// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import type { Definition, Example, User } from "@prisma/client";
import type { Nullable } from "malachite-ui/types";

declare global {
	declare namespace App {
		interface Locals {
			currentUser: Nullable<{ id: string; name: string; displayName: string }>;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}

	type JWTPayloadState = Pick<User, "displayName" | "email" | "id" | "name">;
}

type ClientExample = Pick<Example, "id" | "createdAt" | "text" | "source"> & {
	definition: Pick<Definition, "name" | "definition">;
};
type ClientUser = Omit<User, "email" | "password">;
