import type { Readable, Unsubscriber, Writable } from "svelte/store";
import type { ElementBinder } from "$lib/core";
import { Navigation, Toggler } from "$lib/stores";

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
	(id?: string, binder?: ElementBinder): ActionComponent;
}

type ComponentTagName = keyof HTMLElementTagNameMap | "fragment";

type KeyBack = "ArrowUp" | "ArrowLeft" | "Home";

type KeyNext = "ArrowDown" | "ArrowRight" | "End";

type NavigationKey = KeyBack | KeyNext;

type Nullable<T> = T | null | undefined;

interface Ref<T> extends Writable<T> {
	value: T;
}

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
	}

	interface RootSettings {
		handler?: Handler;
		plugins?: Plugin<Navigation>[];
	}

	interface Settings {
		initialIndex?: number;
		isFinite?: boolean;
		isVertical?: boolean;
		isGlobal?: boolean;
	}
}

namespace SToggler {
	export interface Configuration {
		isOpen?: boolean;
		isFocusForced?: boolean;
	}

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
