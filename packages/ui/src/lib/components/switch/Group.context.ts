import type { Readable, Writable } from "svelte/store";
import type { ComponentInitialiser, Switch } from "$lib/types";
import type { ElementBinder } from "$lib/core";
import { useContext } from "$lib/hooks";
import { isFunction, isInterface } from "@boxinary/predicate-core";
import { isStore, isWritable } from "@boxinary/predicate-svelte";
import { isElementBinder } from "$lib/predicate";

interface Context {
	isChecked: Switch;
	isPassive: Writable<boolean>;
	button: ElementBinder;
	descriptions: Readable<string | undefined>;
	labels: Readable<string | undefined>;
	createSwitchDescription: ComponentInitialiser;
	createSwitchLabel: ComponentInitialiser<Writable<boolean>>;
}

export default useContext<Context>({
	component: "switch-group",
	predicate: (context): context is Context =>
		isInterface<Context>(context, {
			isChecked(value): value is Switch {
				return isStore(value);
			},
			isPassive: isWritable,
			button: isElementBinder,
			descriptions: isStore,
			labels: isStore,
			createSwitchDescription: isFunction,
			createSwitchLabel: isFunction
		})
});
