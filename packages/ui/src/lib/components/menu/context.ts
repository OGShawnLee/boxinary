import type { ComponentInitialiser, ComponentInitialiserStrict } from "$lib/types";
import type { Readable } from "svelte/store";
import { useContext } from "$lib/hooks";
import { isFunction, isInterface } from "@boxinary/predicate-core";
import { isStore } from "@boxinary/predicate-svelte";

interface Context {
	isOpen: Readable<boolean>;
	createMenuButton: ComponentInitialiser;
	createMenuPanel: ComponentInitialiser;
	createMenuItem: ComponentInitialiserStrict;
}

export default useContext({
	component: "menu",
	predicate: (context): context is Context =>
		isInterface<Context>(context, {
			isOpen: isStore,
			createMenuButton: isFunction,
			createMenuItem: isFunction,
			createMenuPanel: isFunction
		})
});
