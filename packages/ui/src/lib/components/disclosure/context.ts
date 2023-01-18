import type { ComponentInitialiser, ReadableRef } from "$lib/types";
import type { Readable } from "svelte/store";
import type { Toggler } from "$lib/stores";
import { useContext } from "$lib/hooks";
import { isFunction, isInterface } from "@boxinary/predicate-core";
import { isReadableRef } from "$lib/predicate";

interface Context {
	isOpen: ReadableRef<boolean>;
	close: OmitThisParameter<Toggler["handleClose"]>;
	createDisclosureButton: ComponentInitialiser<Readable<string | undefined>>;
	createDisclosurePanel: ComponentInitialiser;
}

export default useContext<Context>({
	component: "disclosure",
	predicate: (context): context is Context => {
		return isInterface<Context>(context, {
			isOpen: isReadableRef,
			close: isFunction,
			createDisclosureButton: isFunction,
			createDisclosurePanel: isFunction
		});
	}
});
