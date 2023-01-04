import type { Switch } from "$lib/types";
import { ref } from "$lib/utils";

export default function useSwitch(initialValue: boolean): Switch {
	const isChecked = ref(initialValue);
	return {
		subscribe: isChecked.subscribe,
		set: isChecked.set,
		toggle() {
			isChecked.update((isChecked) => !isChecked);
		},
		get value() {
			return isChecked.value;
		},
		update: isChecked.update
	};
}
