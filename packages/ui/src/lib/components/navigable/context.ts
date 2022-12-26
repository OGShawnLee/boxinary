import { useContext } from "$lib/hooks";
import type { ComponentInitialiser } from "$lib/types";
import { isFunction, isInterface } from "@boxinary/predicate-core";

interface Context {
	createNavigableItem: ComponentInitialiser;
}

export default useContext({
	component: "navigable",
	predicate: (context): context is Context =>
		isInterface<Context>(context, {
			createNavigableItem: isFunction
		})
});
