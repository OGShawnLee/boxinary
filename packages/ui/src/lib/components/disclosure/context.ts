import type { ActionComponent, ReadableRef } from "$lib/types";
import type { ElementBinder } from "$lib/core";
import type { Toggler } from "$lib/stores";
import { useContext } from "$lib/hooks";
import { isFunction, isInterface } from "@boxinary/predicate-core";
import { isElementBinder, isReadableRef } from "$lib/predicate";

interface Context {
	isOpen: ReadableRef<boolean>;
	close: OmitThisParameter<Toggler["handleClose"]>;
	panel: ElementBinder;
	createDisclosureButton: (id?: string) => ActionComponent;
	createDisclosurePanel: (id?: string) => ActionComponent;
}

export default useContext<Context>({
	component: "disclosure",
	predicate: (context): context is Context => {
		return isInterface<Context>(context, {
			isOpen: isReadableRef,
			close: isFunction,
			panel: isElementBinder,
			createDisclosureButton: isFunction,
			createDisclosurePanel: isFunction
		});
	}
});
