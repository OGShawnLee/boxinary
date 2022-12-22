import type { Readable, Unsubscriber, Writable } from "svelte/store";
import type { ElementBinder } from "$lib/core";
import { Toggler } from "$lib/stores";

interface ActionComponent {
	action: (element: HTMLElement) => {
		destroy: Unsubscriber;
	};
	binder: ElementBinder;
}

type Collectable =
	| Unsubscriber
	| { destroy: Collectable }
	| Array<Collectable>
	| Nullable<boolean>
	| void;

interface ComponentInitialiser {
	(id?: string): ActionComponent;
}

type ComponentTagName = keyof HTMLElementTagNameMap | "fragment";

type Nullable<T> = T | null | undefined;

interface Ref<T> extends Writable<T> {
	value: T;
}

interface ReadableRef<T> extends Readable<T> {
	readonly value: T;
}

namespace SToggler {
	export interface Plugin {
		(this: Toggler, element: HTMLElement): Unsubscriber;
	}

	export interface ButtonOptions {
		plugins: Array<Plugin>;
	}

	export interface PanelOptions {
		plugins: Array<Plugin>;
	}
}
