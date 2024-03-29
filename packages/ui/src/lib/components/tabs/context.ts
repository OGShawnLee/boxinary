import type {
	ComponentInitialiser,
	ComponentInitialiserStrict,
	Navigable,
	ReadableRef
} from "$lib/types";
import { useContext } from "$lib/hooks";
import { isFunction, isInterface } from "@boxinary/predicate-core";
import { isReadableRef } from "$lib/predicate";

export interface Tab extends Navigable.Item {
	panelName: string | undefined;
}

interface Context {
	index: ReadableRef<number>;
	createPanel: ComponentInitialiserStrict<Tab>;
	createPanels: ComponentInitialiser;
	createTab: ComponentInitialiserStrict<number>;
	createTabList: ComponentInitialiser<ReadableRef<boolean>>;
}

export default useContext<Context>({
	component: "tabs",
	predicate: (context): context is Context =>
		isInterface<Context>(context, {
			createPanel: isFunction,
			createPanels: isFunction,
			createTab: isFunction,
			createTabList: isFunction,
			index: isReadableRef
		})
});
