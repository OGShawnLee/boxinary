// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface PageError {}
	// interface Platform {}
}

interface JWTPayloadState {
	id: number;
	email: string;
	name: string;
}

type Optional<T> = { [V in keyof T]?: T[V] };

type ValidationUnit<T = string> =
	| T
	| Optional<Record<"duplicate" | "incorrect" | "invalid" | "missing" | "not-found", boolean>>;

type ValidationForm<T extends string> =
	| {
			[K in T]: ValidationUnit;
	  }
	| null;
