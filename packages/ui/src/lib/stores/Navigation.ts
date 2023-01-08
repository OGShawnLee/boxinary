import type { ElementBinder } from "$lib/core";
import type { KeyBack, KeyNext, Navigable, Nullable, Plugin, ReadableRef, Ref } from "$lib/types";
import type { Updater } from "svelte/store";
import Hash from "./Hash";
import { findIndex, findLastIndex, ref } from "$lib/utils";
import { handleNavigation } from "$lib/plugins";
import { isAround, isNullish, isNumber } from "@boxinary/predicate-core";
import { isFocusable, isWithinContainer } from "$lib/predicate";
import { onDestroy } from "svelte";
import { useCleanup, useListener, useWindowListener } from "$lib/hooks";
import { createDerivedRef } from "$lib/utils";

export default class Navigation<T extends Navigable.Item = Navigable.Item> {
	readonly index: Ref<number>;
	readonly manualIndex: Ref<number>;
	readonly targetIndexRef: ReadableRef<Ref<number>>;
	readonly isDisabled: Ref<boolean>;
	readonly isFinite: Ref<boolean>;
	readonly isGlobal: Ref<boolean>;
	readonly isManual: Ref<boolean>;
	readonly isVertical: Ref<boolean>;
	readonly isWaiting: Ref<boolean>;
	protected readonly items = new Hash<string, T>({ entries: false, keys: false });
	protected readonly elements: HTMLElement[] = [];
	readonly selected: ReadableRef<T | undefined>;

	constructor(settings: Navigable.Settings = {}) {
		this.index = ref(settings.initialIndex ?? 0);
		this.manualIndex = ref(settings.initialIndex ?? 0, this.index.subscribe);
		this.isDisabled = ref(settings.isDisabled ?? false);
		this.isFinite = ref(settings.isFinite ?? false);
		this.isGlobal = ref(settings.isGlobal ?? false);
		this.isManual = ref(settings.isManual ?? false);
		this.isVertical = ref(settings.isVertical ?? false);
		this.isWaiting = ref(settings.isWaiting ?? false);
		this.targetIndexRef = createDerivedRef(this.isManual, (isManual) => {
			return isManual ? this.manualIndex : this.index;
		});
		this.selected = createDerivedRef(
			[this.index, this.items.values, this.isWaiting],
			([index, items, isWaiting]) => {
				if (isWaiting) return;
				const item = items.at(index);
				if (isNullish(item) || item.disabled) return;
				return item;
			}
		);
	}

	get isHorizontal() {
		return !this.isVertical.value;
	}

	get targetIndex() {
		return this.targetIndexRef.value;
	}

	get size() {
		return this.items.size;
	}

	onInit(this: Navigation<T>, fn?: (previous: Nullable<T>, current: Nullable<T>) => void) {
		onDestroy(this.onSelectedChange(fn));
	}

	initNavigation(this: Navigation, element: HTMLElement, settings: Navigable.RootSettings = {}) {
		const { handler = handleNavigation, plugins = [] } = settings;
		const onKeydown = handler.bind(this);
		return useCleanup(
			useListener(element, "keydown", (event) => {
				if (this.isDisabled.value || this.isGlobal.value) return;
				onKeydown(event);
			}),
			useWindowListener("keydown", (event) => {
				if (this.isDisabled.value) return;
				if (this.isGlobal.value) onKeydown(event);
			}),
			this.initialisePlugins(element, plugins)
		);
	}

	// RUNS WHEN COMPONENT IS INITIALISED
	onInitItem(
		this: Navigation<T>,
		name: string,
		binder: ElementBinder,
		item: Omit<T, keyof Navigable.Item>
	) {
		const index = this.items.size;
		if (this.items.has(name)) return index;
		const finalItem = { ...item, binder, disabled: binder.disabled.value, index };
		this.items.set(name, finalItem as T);
		binder.isSelected.value = this.isSelected(name);
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
		return useCleanup([
			useListener(element, "click", () => this.interact(index, false)),
			useListener(element, "focus", () => {
				if (this.targetIndex.value !== index && isFocusable(element)) {
					this.interact(index, false);
				}
			})
		]);
	}

	protected onSelectedChange(
		this: Navigation<T>,
		fn?: (previous: Nullable<T>, current: Nullable<T>) => void
	) {
		let previous: Nullable<T> = null;
		return useCleanup(
			this.selected.subscribe((current) => {
				if (previous) previous.binder.isSelected.value = false;
				if (current !== previous) previous = current;
				if (current && !current.disabled) current.binder.isSelected.value = true;
				fn?.(previous, current);
			})
		);
	}

	get(this: Navigation<T>, fn: (entry: { name: string; item: T }) => unknown) {
		for (const entry of this.items.hash.value) {
			const item = { name: entry[0], item: entry[1] };
			if (fn(item)) return item;
		}
		throw Error("Unable to Get Navigation Item");
	}

	update(this: Navigation<T>, name: string, callback: (item: T) => T) {
		this.items.update(name, callback);
	}

	interact(this: Navigation, index: number | Updater<number>, focus = true) {
		index = isNumber(index) ? index : index(this.targetIndex.value);
		if (this.isValidIndex(index)) {
			this.targetIndex.value = index;
			this.isWaiting.set(false);
		}
		if (focus) this.elements.at(this.targetIndex.value)?.focus();
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
		{ edge, direction, index = this.targetIndex.value }: Navigable.FinderSettings
	) {
		const defaultIndex = this.targetIndex.value;
		const isFocusable = Navigation.isFocusable;
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

	static isFocusable(element: HTMLElement | EventTarget) {
		return isFocusable(element, false);
	}

	isNavigationElement(this: Navigation, element: HTMLElement) {
		return this.elements.includes(element);
	}

	isOverflowed(this: Navigation, direction: Navigable.Directions) {
		if (direction === "BACK") return this.targetIndex.value - 1 < 0;
		return this.targetIndex.value + 1 === this.elements.length;
	}

	isSelected(this: Navigation, name: string) {
		if (this.isWaiting.value) return false;
		const { index, binder } = this.items.getSafe(name);
		return !binder.disabled.value && index === this.index.value;
	}

	isValidIndex(this: Navigation, index: number) {
		if (!isAround(index, { min: 0, max: this.elements.length })) return false;
		const element = this.elements.at(index);
		return element ? Navigation.isFocusable(element) : false;
	}

	isWithin(this: Navigation, element: HTMLElement) {
		return isWithinContainer(this.elements, element);
	}
}
