import type { SToggler } from "$lib/types";
import { useGarbageCollector, useListener } from "$lib/hooks";
import { ref } from "$lib/utils";
import { isNullish } from "@boxinary/predicate-core";
import { isFocusable, isHTMLElement, isWithinContainer } from "$lib/predicate";

export default class Toggler {
	readonly open = ref(false);
	protected readonly button = ref<HTMLElement | undefined>(undefined);
	protected readonly panel = ref<HTMLElement | undefined>(undefined);

	constructor(initialValue: boolean) {
		this.open.value = initialValue;
	}

	get subscribe() {
		return this.open.subscribe;
	}

	get isClosed() {
		return this.open.value === false;
	}

	get isOpen() {
		return this.open.value;
	}

	protected isValidFocusTarget(this: Toggler, target: HTMLElement) {
		if (!isFocusable(target)) return false;
		const panel = this.panel.value;
		return panel ? !isWithinContainer(panel, target) : true;
	}

	createButton(this: Toggler, element: HTMLElement, config?: SToggler.ButtonOptions) {
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

	createPanel(this: Toggler, element: HTMLElement, config?: SToggler.PanelOptions) {
		this.panel.value = element;
		return useGarbageCollector({
			beforeCollection: () => {
				this.panel.value = undefined;
			},
			init: () => this.initialisePlugins(element, config?.plugins)
		});
	}

	handleOpen(this: Toggler) {
		this.open.value = true;
	}

	handleClose(this: Toggler, event?: Event | HTMLElement) {
		this.open.value = false;
		this.handleFocus(event);
	}

	handleToggle(this: Toggler) {
		this.open.value = !this.open.value;
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
		plugins: SToggler.Plugin[] = []
	) {
		return plugins.map((plugin) => plugin.bind(this)(element));
	}
}

type Bound<T extends Object> = {
	[K in keyof T]: OmitThisParameter<T[K]>;
};
