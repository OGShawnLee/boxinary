import type { Toggler } from "$lib/stores";
import type { Readable } from "svelte/store";
import type { Action, ComponentInitialiser } from "$lib/types";
import type { ElementBinder } from "$lib/core";
import { useContext } from "$lib/hooks";
import { isFunction, isInterface } from "@boxinary/predicate-core";
import { isStore } from "@boxinary/predicate-svelte";
import { isElementBinder } from "$lib/predicate";

interface Context {
	createAccordionItemState(toggler: Toggler): {
		isOpen: Readable<boolean>;
		close: OmitThisParameter<Toggler["handleClose"]>;
		button: Action;
		heading: Action;
		panel: Action;
	};
}

export const GroupContext = useContext<Context>({
	component: "accordion",
	predicate: (context): context is Context =>
		isInterface<Context>(context, {
			createAccordionItemState: isFunction
		})
});

interface ItemContext {
	isOpen: Readable<boolean>;
	button: ElementBinder;
	close: OmitThisParameter<Toggler["handleClose"]>;
	panel: ElementBinder;
	createAccordionButton: ComponentInitialiser;
	createAccordionHeading: ComponentInitialiser;
	createAccordionPanel: ComponentInitialiser;
}

export const ItemContext = useContext<ItemContext>({
	component: "accordion-item",
	predicate: (context): context is ItemContext =>
		isInterface<ItemContext>(context, {
			isOpen: isStore,
			button: isElementBinder,
			panel: isElementBinder,
			close: isFunction,
			createAccordionButton: isFunction,
			createAccordionHeading: isFunction,
			createAccordionPanel: isFunction
		})
});
