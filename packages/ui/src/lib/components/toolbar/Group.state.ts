import { ElementBinder, ElementLabel, defineActionComponent } from "$lib/core";
import { useComponentNaming } from "$lib/hooks";
import Context from "./Group.context";

export function createToolbarGroupState() {
	const { baseName, nameChild } = useComponentNaming({ component: "toolbar" });
	const labels = new ElementLabel();
	const toolbar = new ElementBinder();
	toolbar.name.value = baseName;

	Context.setContext({ createToolbarLabel, labels, toolbar });

	function createToolbarLabel(id: string | undefined, binder: ElementBinder) {
		return defineActionComponent({
			id: id,
			name: nameChild("label"),
			onInit({ name }) {
				labels.onInitLabel(name, id);
				return toolbar.finalName;
			},
			onMount({ name }) {
				return labels.onMountLabel(name, binder);
			}
		});
	}
}
