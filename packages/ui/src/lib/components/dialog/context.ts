import type { Readable } from "svelte/store";
import type { ComponentInitialiser, ComponentInitialiserStrict } from "$lib/types";
import type { Toggler } from "$lib/stores";
import { useContext } from "$lib/hooks";
import { isFunction, isInterface } from "@boxinary/predicate-core";
import { isStore } from "@boxinary/predicate-svelte";

interface Context {
	close: OmitThisParameter<Toggler["handleClose"]>;
	createDialogContent: ComponentInitialiser;
	createDialogDescription: ComponentInitialiserStrict;
	createDialogTitle: ComponentInitialiserStrict;
	createDialogOverlay: ComponentInitialiser;
	isOpen: Readable<boolean>;
}

export default useContext({
	component: "dialog",
	predicate: (context): context is Context =>
		isInterface<Context>(context, {
			close: isFunction,
			createDialogContent: isFunction,
			createDialogDescription: isFunction,
			createDialogTitle: isFunction,
			createDialogOverlay: isFunction,
			isOpen: isStore
		})
});
