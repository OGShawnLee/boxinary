import type { ActionComponent, ComponentInitialiser, Nullable } from "$lib/types";
import type { ElementBinder } from "$lib/core";
import type { Readable } from "svelte/store";
import { useContext } from "$lib/hooks";
import { isFunction, isInterface } from "@boxinary/predicate-core";
import { isStore } from "@boxinary/predicate-svelte";

interface Context<T> {
	isOpen: Readable<boolean>;
	createListboxButton: ComponentInitialiser;
	createListboxLabel: ComponentInitialiser<Readable<string | undefined>>;
	createListboxOptionState(
		initialValue: T,
		isDisabled: Nullable<boolean>
	): {
		createListboxOption(id: string | undefined, binder: ElementBinder): ActionComponent;
	};
	createListboxPanel: ComponentInitialiser;
}

export default useContext({
	component: "listbox",
	predicate: (context): context is Context<any> =>
		isInterface<Context<any>>(context, {
			isOpen: isStore,
			createListboxButton: isFunction,
			createListboxLabel: isFunction,
			createListboxOptionState: isFunction,
			createListboxPanel: isFunction
		})
});
