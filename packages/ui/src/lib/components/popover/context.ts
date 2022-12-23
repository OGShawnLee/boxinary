import type { ElementBinder } from "$lib/core";
import type { Toggler } from "$lib/stores";
import type { ComponentInitialiser, ReadableRef } from "$lib/types";
import { useContext } from "$lib/hooks";
import { isElementBinder, isReadableRef } from "$lib/predicate";
import { isFunction, isInterface } from "@boxinary/predicate-core";

interface Context {
	isOpen: ReadableRef<boolean>;
	close: OmitThisParameter<Toggler["handleClose"]>;
	panel: ElementBinder;
	createPopoverButton: ComponentInitialiser;
	createPopoverOverlay: ComponentInitialiser;
	createPopoverPanel: ComponentInitialiser;
}

export default useContext({
	component: "popover",
	predicate: (context): context is Context => {
		return isInterface<Context>(context, {
			isOpen: isReadableRef,
			close: isFunction,
			panel: isElementBinder,
			createPopoverButton: isFunction,
			createPopoverOverlay: isFunction,
			createPopoverPanel: isFunction
		});
	}
});
