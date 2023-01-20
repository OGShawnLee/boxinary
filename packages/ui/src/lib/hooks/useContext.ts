import type { Predicate } from "@boxinary/predicate-core";
import { getContext, hasContext, setContext } from "svelte";
import { coolString } from "$lib/utils";

export default function useContext<T>(config: {
	component: string;
	predicate: Predicate<T>;
	prefix?: string;
}) {
	const { component, predicate, prefix = "boxinary" } = config;
	const key = coolString(`${prefix}-${component}`);
	return {
		getContext<S extends boolean = true>(
			isStrict = true as S
		): [S] extends [true] ? T : T | undefined {
			const context = getContext(key);
			if (context) {
				if (predicate(context)) return context;
				throw Error(`Invalid ${key} Context`);
			} else {
				if (isStrict) throw Error(`Unable to Get ${key} Context. Did you set it?`);
				return undefined as [S] extends [true] ? T : T | undefined;
			}
		},
		hasContext() {
			return hasContext(key);
		},
		setContext(value: T) {
			setContext(key, value);
		}
	};
}
