import type { ElementBinder } from "$lib/core";
import type { KeyBack, KeyNext, Navigable, Plugin, ReadableRef, Ref } from "$lib/types";
import type { Updater } from "svelte/store";
import Hash from "./Hash";
import { findIndex, findLastIndex, ref } from "$lib/utils";
import { handleNavigation } from "$lib/plugins";
import { isAround, isNumber } from "@boxinary/predicate-core";
import { isFocusable, isWithinContainer } from "$lib/predicate";
import { onDestroy } from "svelte";
import { derived } from "svelte/store";
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
	readonly isFocusEnabled: Ref<boolean>;
	protected readonly items = new Hash<string, T>({ entries: false, keys: false });
	protected readonly elements: HTMLElement[] = [];
	readonly active: ReadableRef<T | undefined>;
	readonly selected: ReadableRef<T | undefined>;

	constructor(settings: Navigable.Settings = {}) {
		this.index = ref(settings.initialIndex ?? 0);
		this.manualIndex = ref(settings.initialIndex ?? 0, this.index.subscribe);
		this.isDisabled = ref(settings.isDisabled ?? false);
		this.isFinite = ref(settings.isFinite ?? false);
		this.isFocusEnabled = ref(settings.isFocusEnabled ?? true);
		this.isGlobal = ref(settings.isGlobal ?? false);
		this.isManual = ref(settings.isManual ?? false);
		this.isVertical = ref(settings.isVertical ?? false);
		this.isWaiting = ref(settings.isWaiting ?? false);
		this.targetIndexRef = createDerivedRef(this.isManual, (isManual) => {
			return isManual ? this.manualIndex : this.index;
		});
		this.active = createDerivedRef([this.items.values, this.isWaiting], ([items, isWaiting]) => {
			if (isWaiting) return;
			return items.find((item) => item.isActive);
		});
		this.selected = createDerivedRef([this.items.values, this.isWaiting], ([items, isWaiting]) => {
			if (isWaiting) return;
			return items.find((item) => item.isSelected);
		});
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

	initNavigation(this: Navigation, element: HTMLElement, settings: Navigable.RootSettings = {}) {
		const { handler = handleNavigation, plugins = [] } = settings;
		const onKeydown = handler.bind(this);
		return useCleanup(
			this.index.subscribe(this.manualIndex.set),
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
		const finalItem = {
			...item,
			binder,
			disabled: binder.disabled.value,
			index,
			isActive: false,
			isSelected: false
		};
		this.items.set(name, finalItem as T);
		binder.isSelected.value = this.isSelected(name);
		this.handleItemActiveState(index, binder, name);
		this.handleItemSelectedState(index, binder, name);
		onDestroy(() => {
			const index = this.elements.findIndex((element) => element === binder.element.value);
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
			useListener(element, "click", () => {
				this.set(index, false);
			}),
			useListener(element, "focus", () => {
				if (this.targetIndex.value !== index && isFocusable(element)) {
					this.interact(index, false);
				}
			})
		]);
	}

	protected handleItemActiveState(
		this: Navigation,
		index: number,
		binder: ElementBinder,
		name: string
	) {
		const isActive = derived([this.manualIndex, binder.disabled], ([manualIndex, isDisabled]) => {
			if (isDisabled) return false;
			return manualIndex === index;
		});
		onDestroy(
			isActive.subscribe((isActive) => {
				this.items.update(name, (item) => {
					item.isActive = binder.isActive.value = isActive;
					return item;
				});
			})
		);
	}

	protected handleItemSelectedState(
		this: Navigation,
		index: number,
		binder: ElementBinder,
		name: string
	) {
		const isSelected = derived(
			[this.index, binder.disabled, this.isWaiting],
			([globalIndex, isDisabled, isWaiting]) => {
				if (isWaiting || isDisabled) return false;
				return globalIndex === index;
			}
		);
		onDestroy(
			isSelected.subscribe((isSelected) => {
				this.items.update(name, (item) => {
					item.isSelected = binder.isSelected.value = isSelected;
					return item;
				});
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

	set(this: Navigation, index: number, focus = true) {
		if (this.isValidIndex(index)) {
			this.index.value = index;
			this.isWaiting.value = false;
			if (this.isFocusEnabled.value && focus) this.elements.at(index)?.focus();
		}
	}

	interact(this: Navigation, index: number | Updater<number>, focus = true) {
		index = isNumber(index) ? index : index(this.targetIndex.value);
		if (this.isValidIndex(index)) {
			this.targetIndex.value = index;
			if (!this.isManual.value) this.isWaiting.set(false);
			if (this.isFocusEnabled.value && focus) {
				this.elements.at(this.targetIndex.value)?.focus();
			}
		}
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
