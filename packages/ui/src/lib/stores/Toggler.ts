import type { Toggleable } from "$lib/types";
import type { Unsubscriber } from "svelte/store";
import Hash from "./Hash";
import { derived } from "svelte/store";
import { useGarbageCollector, useListener } from "$lib/hooks";
import { focusFirstChildElement, ref } from "$lib/utils";
import { isNullish } from "@boxinary/predicate-core";
import { isFocusable, isHTMLElement, isWithinContainer } from "$lib/predicate";
import { onMount, tick } from "svelte";
import { useHidePanelFocusOnClose } from "$lib/plugins";

export class Toggler {
	readonly isOpen = ref(false);
	readonly isFocusForced = ref(false);
	protected readonly button = ref<HTMLElement | undefined>(undefined);
	protected readonly panel = ref<HTMLElement | undefined>(undefined);
	readonly group?: TogglerGroup;
	protected readonly groupClient?: ReturnType<TogglerGroup["createClient"]>;

	constructor({ isFocusForced = false, isOpen = false, group }: Toggleable.Configuration = {}) {
		this.isFocusForced.value = isFocusForced;
		this.isOpen.value = isOpen;
		this.group = group;
		this.groupClient = this.group?.createClient(this);
		onMount(() => {
			return this.isOpen.subscribe((isOpen) => {
				this.handleFocusForce(isOpen);
			});
		});
	}

	get subscribe() {
		return this.isOpen.subscribe;
	}

	get isClosed() {
		return this.isOpen.value === false;
	}

	createButton(this: Toggler, element: HTMLElement, settings: Toggleable.ButtonOptions = {}) {
		const { plugins, isToggler = true } = settings;
		this.button.value = element;
		element.setAttribute("type", "button");
		return useGarbageCollector({
			beforeCollection: () => {
				this.button.value = undefined;
			},
			init: () => [
				isToggler && useListener(element, "click", () => this.handleToggle()),
				this.initialisePlugins(element, plugins),
				this.groupClient?.createButton(element)
			]
		});
	}

	createOverlay(this: Toggler, element: HTMLElement) {
		return useListener(element, "click", () => this.handleClose());
	}

	createPanel(this: Toggler, element: HTMLElement, config?: Toggleable.PanelOptions) {
		const plugins = [useHidePanelFocusOnClose, ...(config?.plugins ?? [])];
		this.panel.value = element;
		return useGarbageCollector({
			beforeCollection: () => {
				this.panel.value = undefined;
			},
			init: () => [
				config?.onOpen && this.isOpen.subscribe((isOpen) => isOpen && config.onOpen?.(element)),
				this.initialisePlugins(element, plugins),
				this.groupClient?.createPanel(element)
			]
		});
	}

	handleOpen(this: Toggler) {
		this.isOpen.value = true;
	}

	handleClose(this: Toggler, event?: Event | HTMLElement) {
		this.isOpen.value = false;
		this.handleFocus(event);
	}

	handleToggle(this: Toggler) {
		this.isOpen.value = !this.isOpen.value;
	}

	protected handleFocus(this: Toggler, event?: Event | HTMLElement) {
		if (isNullish(event)) return this.button.value?.focus();
		if (event instanceof Event) {
			const target = event.target;
			if (isHTMLElement(target) && this.isValidFocusTarget(target)) return;
			this.button.value?.focus();
		} else {
			if (this.isValidFocusTarget(event)) event.focus();
			else this.button.value?.focus();
		}
	}

	protected async handleFocusForce(this: Toggler, isOpen: boolean) {
		await tick();
		if (this.isFocusForced.value && isOpen && this.panel.value) {
			focusFirstChildElement(this.panel.value, {
				fallback: this.button.value
			});
		}
	}

	protected initialisePlugins(
		this: Toggler,
		element: HTMLElement,
		plugins: Toggleable.Plugin[] = []
	) {
		return plugins.map((plugin) => plugin.bind(this)(element));
	}

	protected isValidFocusTarget(this: Toggler, target: HTMLElement) {
		if (!isFocusable(target)) return false;
		const panel = this.panel.value;
		return panel ? !isWithinContainer(panel, target) : true;
	}

	isWithinElements(this: Toggler, element: HTMLElement) {
		const button = this.button.value;
		const panel = this.panel.value;
		return (
			(button && isWithinContainer(button, element)) || (panel && isWithinContainer(panel, element))
		);
	}
}

interface Item {
	isOpen: boolean;
	toggler: Toggler;
}

export class TogglerGroup {
	protected elements: HTMLElement[] = [];
	protected items = new Hash<Toggler, Item>({ entries: false, keys: false });
	readonly isOpen = derived(this.items.values, (items) => {
		return items.some((item) => item.isOpen);
	});

	createClient(this: TogglerGroup, toggler: Toggler) {
		const self = this;
		this.items.set(toggler, { isOpen: toggler.isOpen.value, toggler });
		return {
			createButton(element: HTMLElement): Unsubscriber {
				self.elements.push(element);
				const free = toggler.isOpen.subscribe((isOpen) => {
					self.items.update(toggler, (item) => {
						item.isOpen = isOpen;
						return item;
					});
				});
				return () => {
					self.elements = self.elements.filter((el) => el !== element);
					free();
				};
			},
			createPanel(element: HTMLElement): Unsubscriber {
				self.elements.push(element);
				return () => {
					self.elements = self.elements.filter((el) => el !== element);
				};
			}
		};
	}

	isWithinElements(this: TogglerGroup, element: HTMLElement) {
		return isWithinContainer(this.elements, element);
	}
}
