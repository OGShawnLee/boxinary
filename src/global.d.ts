interface JWTPayloadState {
	id: number;
	email: string;
	name: string;
	displayName: string;
}

type OnlyObject<T> = T extends object ? T : never;

type Optional<T> = { [V in keyof T]?: T[V] };

interface FloatingOption {
	title: string;
	path: string;
}

interface FloatingOptionsPathing {
	add?: FloatingOption;
	edit: FloatingOption;
	$bookmark?: FloatingOption & { isBookmarked?: boolean | string };
	$delete: FloatingOption;
}

type ValidationUnit<T = string> =
	| T
	| Optional<Record<"duplicate" | "incorrect" | "invalid" | "missing" | "not-found", boolean>>;

type ValidationForm<T extends string> =
	| {
			[K in T]: ValidationUnit;
	  }
	| null;
