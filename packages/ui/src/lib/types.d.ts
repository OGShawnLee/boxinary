import type { Readable, Unsubscriber, Writable } from "svelte/store";
import type { ElementBinder } from "$lib/core";
import { Navigation, Toggler } from "$lib/stores";

interface Action {
	(element: HTMLElement): void | { destroy?: Unsubscriber };
}

interface ActionComponent<T = void> {
	action: (element: HTMLElement) => {
		destroy: Unsubscriber;
	};
	binder: ElementBinder;
	context: T;
}

type Collectable =
	| Unsubscriber
	| { destroy: Collectable }
	| Array<Collectable>
	| Nullable<boolean>
	| void;

interface ComponentInitialiser<T = void> {
	(id?: string, binder?: ElementBinder): ActionComponent<T>;
}

type ComponentTagName = keyof HTMLElementTagNameMap | "fragment";

// --> ClassName Resolver
type ClassName<S extends ComponentState> = Nullable<
	| FunctionClassName<S>
	| string
	| ({
			base?: Nullable<string>;
	  } & {
			[P in S as Lowercase<P>]?: Nullable<string | SwitchClassName>;
	  })
>;

type ComponentState = "CHECKED" | "DISABLED" | "OPEN" | "SELECTED";

interface FunctionClassName<S extends ComponentState> {
	(predicate: StatePredicate<S>): Nullable<string>;
}

type PredicateString<K extends string> = `is${Capitalize<Lowercase<K>>}`;

type StatePredicate<T extends ComponentState> = {
	[P in T as PredicateString<P>]: boolean;
};

interface SwitchClassName {
	on?: string;
	off?: string;
}

type KeyBack = "ArrowUp" | "ArrowLeft" | "Home";

type KeyNext = "ArrowDown" | "ArrowRight" | "End";

type NavigationKey = KeyBack | KeyNext;

type Nullable<T> = T | null | undefined;

interface Ref<T> extends Writable<T> {
	value: T;
}

declare type Refs =
	| ReadableRef<any>
	| [ReadableRef<any>, ...Array<ReadableRef<any>>]
	| Array<ReadableRef<any>>;

interface ReadableRef<T> extends Readable<T> {
	readonly value: T;
}

type Plugin<T extends object> = (this: T, element: HTMLElement) => Unsubscriber;

namespace Navigable {
	type Directions = "BACK" | "NEXT";

	interface FinderSettings {
		direction: Directions | "BOUNCE";
		edge?: boolean;
		index?: number;
	}

	type Handler = (this: Navigation, event: KeyboardEvent) => void;

	interface Item {
		binder: ElementBinder;
		element?: HTMLElement;
		index: number;
		disabled: Nullable<boolean>;
	}

	interface RootSettings {
		handler?: Handler;
		plugins?: Plugin<Navigation>[];
	}

	interface Settings {
		initialIndex?: number;
		isDisabled?: boolean;
		isFinite?: boolean;
		isGlobal?: boolean;
		isManual?: boolean;
		isVertical?: boolean;
		isWaiting?: boolean;
	}
}

declare type StoresValues<T> = T extends Readable<infer U>
	? U
	: {
			[K in keyof T]: T[K] extends Readable<infer U> ? U : never;
	  };

interface Switch extends Ref<boolean> {
	toggle(): void;
}

namespace Toggleable {
	export interface Configuration {
		isOpen?: boolean;
		isFocusForced?: boolean;
	}

	export interface Plugin {
		(this: Toggler, element: HTMLElement): Unsubscriber;
	}

	export interface ButtonOptions {
		plugins?: Array<Plugin>;
	}

	export interface PanelOptions {
		plugins?: Array<Plugin>;
	}
}
