import type { Nullable } from "$lib/types";
import { nanoid } from "nanoid";
import { clearString, separateWithDashes } from "$lib/utils";
import { isString, isWhitespace } from "@boxinary/predicate-core";

const UID_LENGTH = 8;

export default function useComponentNaming(config: {
	component: string;
	parentComponent?: Nullable<string>;
	prefix?: string;
	overwriteWith?: string;
}) {
	let { component, parentComponent, prefix = "boxinary", overwriteWith } = config;
	const uid = nanoid(UID_LENGTH);
	parentComponent = parentComponent ? separateWithDashes(parentComponent) : parentComponent;
	component = separateWithDashes(component);
	let baseName = `${prefix}-${component}-${uid}`;
	if (parentComponent) baseName = `${prefix}-${parentComponent}-${component}-${uid}`;
	if (overwriteWith) baseName = overwriteWith;
	return {
		baseName,
		nameChild(childName: string) {
			childName = separateWithDashes(childName);
			const uid = nanoid(UID_LENGTH);
			return `${baseName}-${childName}-${uid}`;
		}
	};
}

{
	function useComponentNaming(name: string | { name: string; parent?: string }) {
		name = isString(name) ? name : name.name;
		const baseName = getUniqueName(name, "component");

		function getChildName(name: string) {
			return getUniqueName(name, "child");
		}

		return { baseName, getChildName };
	}

	function clearAndSeparateWithDashes(str: string) {
		return clearString(str).replace(/\s/, "-");
	}

	function getUniqueName(name: string, type: string, parent?: string) {
		name = clearAndSeparateWithDashes(name);
		const uid = nanoid(UID_LENGTH);

		if (parent) {
			return isWhitespace(name) ? `${parent}-${type}-${uid}` : `${parent}-${name}-${uid}`;
		}

		return isWhitespace(name) ? `boxinary-${type}-${uid}` : `boxinary-${name}-${uid}`;
	}
}
