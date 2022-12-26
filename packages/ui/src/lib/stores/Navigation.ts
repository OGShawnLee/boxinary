import type { ElementBinder } from "$lib/core";
import type { KeyBack, KeyNext, Navigable, Plugin, Ref } from "$lib/types";
import type { Updater } from "svelte/store";
import Hash from "./Hash";
import { findIndex, findLastIndex, ref } from "$lib/utils";
import { handleNavigation } from "$lib/plugins";
import { isAround, isNumber } from "@boxinary/predicate-core";
import { isFocusable, isWithinContainer } from "$lib/predicate";
import { onDestroy } from "svelte";
import { useCleanup, useGarbageCollector, useListener, useWindowListener } from "$lib/hooks";

export default class Navigation {
	readonly index: Ref<number>;
	readonly isFinite: Ref<boolean>;
	readonly isGlobal: Ref<boolean>;
	readonly isVertical: Ref<boolean>;
	protected readonly items = new Hash<string, Navigable.Item>();
	protected readonly elements: HTMLElement[] = [];

	constructor(settings: Navigable.Settings = {}) {
		this.index = ref(settings.initialIndex ?? 0);
		this.isFinite = ref(settings.isFinite ?? false);
		this.isGlobal = ref(settings.isGlobal ?? false);
		this.isVertical = ref(settings.isVertical ?? false);
	}

	get isHorizontal() {
		return !this.isVertical.value;
	}

	initNavigation(this: Navigation, element: HTMLElement, settings: Navigable.RootSettings = {}) {
		const { handler = handleNavigation, plugins = [] } = settings;
		const onKeydown = handler.bind(this);
		return useCleanup(
			useListener(element, "keydown", (event) => {
				if (this.isGlobal.value) return;
				onKeydown(event);
			}),
			useWindowListener("keydown", (event) => {
				if (this.isGlobal.value) onKeydown(event);
			}),
			this.initialisePlugins(element, plugins)
		);
	}

	// RUNS WHEN COMPONENT IS INITIALISED
	onInit(this: Navigation, name: string, binder: ElementBinder) {
		const index = this.items.size;
		this.items.set(name, { binder, index });
		onDestroy(() => {
			this.elements.splice(index, 1);
			this.items.delete(name);
		});
		return index;
	}

	// RUNS WHEN ELEMENT IS MOUNTED
	initItem(this: Navigation, element: HTMLElement, name: string) {
		const { index } = this.items.getSafe(name);
		this.elements.push(element);
		this.items.update(name, (item) => {
			item.element = element;
			return item;
		});
		return useGarbageCollector({
			init: () => [
				useListener(element, "click", () => this.index.set(index)),
				useListener(element, "focus", () => {
					if (isFocusable(element)) this.index.set(index);
				})
			]
		});
	}

	interact(this: Navigation, index: number | Updater<number>) {
		index = isNumber(index) ? index : index(this.index.value);
		if (this.isValidIndex(index)) this.index.value = index;
		this.elements.at(this.index.value)?.focus();
	}

	go(
		this: Navigation,
		direction: Navigable.Directions,
		fn: (index: number, isOverflowed: boolean) => number
	) {
		this.interact((currentIndex) => {
			const index = fn(currentIndex, this.isOverflowed(direction));
			if (this.isValidIndex(index)) return index;
			return this.findValidIndex({ direction, index });
		});
	}

	goFirst(this: Navigation) {
		this.interact(this.findValidIndex({ direction: "BACK", edge: true }));
	}

	goBack(this: Navigation) {
		this.go("BACK", (index, isOverflowed) => {
			if (isOverflowed && this.isFinite.value) return index;
			return isOverflowed ? this.elements.length - 1 : index - 1;
		});
	}

	goNext(this: Navigation) {
		this.go("NEXT", (index, isOverflowed) => {
			if (isOverflowed && this.isFinite.value) return index;
			return isOverflowed ? 0 : index + 1;
		});
	}

	goLast(this: Navigation) {
		this.interact(this.findValidIndex({ direction: "NEXT", edge: true }));
	}

	findIndex(this: Navigation, fn: (element: HTMLElement, index: number) => unknown) {
		return this.elements.findIndex((element, index) => fn(element, index));
	}

	findValidIndex(
		this: Navigation,
		{ edge, direction, index = this.index.value }: Navigable.FinderSettings
	) {
		const defaultIndex = this.index.value;
		switch (direction) {
			case "BACK":
				if (edge) return findIndex(this.elements, isFocusable);
				const previous = findLastIndex(this.elements, isFocusable, index - 1);
				if (previous > -1) return previous;
				return this.isFinite.value ? defaultIndex : findLastIndex(this.elements, isFocusable);
			case "NEXT":
				if (edge) return findLastIndex(this.elements, isFocusable);
				const next = findIndex(this.elements, isFocusable, index + 1);
				if (next > -1) return next;
				return this.isFinite.value ? defaultIndex : findIndex(this.elements, isFocusable);
			case "BOUNCE":
				const validIndex = findIndex(this.elements, isFocusable, index + 1);
				return validIndex > -1 ? validIndex : findIndex(this.elements, isFocusable);
		}
	}

	handleBackKey(this: Navigation, code: KeyBack, ctrlKey = false) {
		if (code === "Home") return this.goFirst();
		if (this.isVertical.value && code !== "ArrowUp") return;
		if (this.isHorizontal && code !== "ArrowLeft") return;
		ctrlKey ? this.goFirst() : this.goBack();
	}

	handleNextKey(this: Navigation, code: KeyNext, ctrlKey = false) {
		if (code === "End") return this.goLast();
		if (this.isVertical.value && code !== "ArrowDown") return;
		if (this.isHorizontal && code !== "ArrowRight") return;
		ctrlKey ? this.goLast() : this.goNext();
	}

	protected initialisePlugins(
		this: Navigation,
		element: HTMLElement,
		plugins: Plugin<Navigation>[]
	) {
		return plugins.map((plugin) => plugin.bind(this)(element));
	}

	isOverflowed(this: Navigation, direction: Navigable.Directions) {
		if (direction === "BACK") return this.index.value - 1 < 0;
		return this.index.value + 1 === this.elements.length;
	}

	isValidIndex(this: Navigation, index: number) {
		if (!isAround(index, { min: 0, max: this.elements.length })) return;
		const element = this.elements.at(index);
		return element ? isFocusable(element) : false;
	}

	isWithin(this: Navigation, element: HTMLElement) {
		return isWithinContainer(this.elements, element);
	}
}
