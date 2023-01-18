import Context from "./Group.context";
import { TogglerGroup } from "$lib/stores";

export function createPopoverGroupState() {
	const group = new TogglerGroup();
	Context.setContext(group);
	return group.isOpen;
}
