import type { ComponentInitialiser, ComponentInitialiserStrict } from "$lib/types";
import type { ElementLabel } from "$lib/core";
import type { Readable } from "svelte/store";
import { useContext } from "$lib/hooks";
import { isElementLabel } from "$lib/predicate";
import { isFunction, isInterface } from "@boxinary/predicate-core";
import { isStore } from "@boxinary/predicate-svelte";

interface Context<T> {
	parentName: Readable<string | undefined>;
	createRadioGroupDescription: ComponentInitialiserStrict;
	createRadioGroupLabel: ComponentInitialiserStrict;
	createRadioGroupOptionState: (
		initialValue: T,
		isSelected: boolean
	) => {
		descriptions: Readable<string | undefined>;
		labels: Readable<string | undefined>;
		createRadioGroupOption: ComponentInitialiser;
	};
	descriptions: ElementLabel;
	labels: ElementLabel;
}

export const GroupContext = useContext<Context<any>>({
	component: "radio-group",
	predicate: (context): context is Context<any> =>
		isInterface<Context<any>>(context, {
			parentName: isStore,
			createRadioGroupDescription: isFunction,
			createRadioGroupLabel: isFunction,
			createRadioGroupOptionState: isFunction,
			descriptions: isElementLabel,
			labels: isElementLabel
		})
});

interface OptionContext {
	parentName: Readable<string | undefined>;
	descriptions: ElementLabel;
	labels: ElementLabel;
}

export const OptionContext = useContext<OptionContext>({
	component: "radio-group-option",
	predicate: (context): context is OptionContext =>
		isInterface<OptionContext>(context, {
			descriptions: isElementLabel,
			labels: isElementLabel,
			parentName: isStore
		})
});
