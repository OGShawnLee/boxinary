interface JWTPayloadState {
	id: number;
	email: string;
	name: string;
	displayName: string;
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
