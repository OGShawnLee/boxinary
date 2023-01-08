import type { ComponentInitialiser } from "$lib/types";
import type { ElementLabel } from "$lib/core";
import type { Readable } from "svelte/store";
import { useContext } from "$lib/hooks";
import { isElementLabel } from "$lib/predicate";
import { isFunction, isInterface } from "@boxinary/predicate-core";
import { isStore } from "@boxinary/predicate-svelte";

interface Context<T> {
	createRadioGroupDescription: ComponentInitialiser;
	createRadioGroupLabel: ComponentInitialiser;
	createRadioGroupOptionState: (
		initialValue: T,
		isSelected: boolean
	) => {
		createOption: ComponentInitialiser;
		descriptions: Readable<string | undefined>;
		labels: Readable<string | undefined>;
	};
	descriptions: ElementLabel;
	labels: ElementLabel;
	parentName: Readable<string | undefined>;
}

export const GroupContext = useContext<Context<any>>({
	component: "radio-group",
	predicate: (context): context is Context<any> =>
		isInterface<Context<any>>(context, {
			createRadioGroupDescription: isFunction,
			createRadioGroupLabel: isFunction,
			createRadioGroupOptionState: isFunction,
			descriptions: isElementLabel,
			labels: isElementLabel,
			parentName: isStore
		})
});

interface OptionContext {
	descriptions: ElementLabel;
	labels: ElementLabel;
	parentName: Readable<string | undefined>;
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
