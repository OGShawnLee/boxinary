import type { Toggleable } from "$lib/types";
import { useGarbageCollector, useListener } from "$lib/hooks";
import { focusFirstChildElement, ref } from "$lib/utils";
import { isNullish } from "@boxinary/predicate-core";
import { isFocusable, isHTMLElement, isWithinContainer } from "$lib/predicate";
import { onMount, tick } from "svelte";

export default class Toggler {
	readonly isOpen = ref(false);
	readonly isFocusForced = ref(false);
	protected readonly button = ref<HTMLElement | undefined>(undefined);
	protected readonly panel = ref<HTMLElement | undefined>(undefined);

	constructor({ isFocusForced = false, isOpen = false }: Toggleable.Configuration = {}) {
		this.isFocusForced.value = isFocusForced;
		this.isOpen.value = isOpen;
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

	protected isValidFocusTarget(this: Toggler, target: HTMLElement) {
		if (!isFocusable(target)) return false;
		const panel = this.panel.value;
		return panel ? !isWithinContainer(panel, target) : true;
	}

	createButton(this: Toggler, element: HTMLElement, config?: Toggleable.ButtonOptions) {
		this.button.value = element;
		return useGarbageCollector({
			beforeCollection: () => {
				this.button.value = undefined;
			},
			init: () => [
				useListener(element, "click", () => this.handleToggle()),
				this.initialisePlugins(element, config?.plugins)
			]
		});
	}

	createOverlay(this: Toggler, element: HTMLElement) {
		return useListener(element, "click", () => this.handleClose());
	}

	createPanel(this: Toggler, element: HTMLElement, config?: Toggleable.PanelOptions) {
		this.panel.value = element;
		return useGarbageCollector({
			beforeCollection: () => {
				this.panel.value = undefined;
			},
			init: () => this.initialisePlugins(element, config?.plugins)
		});
	}

	protected async handleFocusForce(this: Toggler, isOpen: boolean) {
		await tick();
		if (this.isFocusForced.value && isOpen && this.panel.value) {
			focusFirstChildElement(this.panel.value, {
				fallback: this.button.value
			});
		}
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
			if (isHTMLElement(target) && this.isValidFocusTarget(target)) target.focus();
			else this.button.value?.focus();
		} else {
			if (this.isValidFocusTarget(event)) event.focus();
			else this.button.value?.focus();
		}
	}

	protected initialisePlugins(
		this: Toggler,
		element: HTMLElement,
		plugins: Toggleable.Plugin[] = []
	) {
		return plugins.map((plugin) => plugin.bind(this)(element));
	}

	isWithinElements(this: Toggler, element: HTMLElement) {
		const button = this.button.value;
		const panel = this.panel.value;
		return (
			(button && isWithinContainer(button, element)) || (panel && isWithinContainer(panel, element))
		);
	}
}
