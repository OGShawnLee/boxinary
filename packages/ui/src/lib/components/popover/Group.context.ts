import { TogglerGroup } from "$lib/stores";
import { useContext } from "$lib/hooks";

export default useContext({
	component: "popover-group",
	predicate: (context): context is TogglerGroup => {
		return context instanceof TogglerGroup;
	}
});
