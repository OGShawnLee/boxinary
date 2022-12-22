import type { Nullable } from "$lib/types";
import { nanoid } from "nanoid";
import { separateWithDashes } from "$lib/utils";

const UID_LENGTH = 8;

export default function useComponentNaming(config: {
	component: string;
	parentComponent?: Nullable<string>;
	prefix?: string;
}) {
	let { component, parentComponent, prefix = "boxinary" } = config;
	const uid = nanoid(UID_LENGTH);
	parentComponent = parentComponent ? separateWithDashes(parentComponent) : parentComponent;
	component = separateWithDashes(component);
	let baseName = `${prefix}-${component}-${uid}`;
	if (parentComponent) baseName = `${prefix}-${parentComponent}-${component}-${uid}`;
	return {
		baseName,
		nameChild(childName: string) {
			childName = separateWithDashes(childName);
			const uid = nanoid(UID_LENGTH);
			return `${baseName}-${childName}-${uid}`;
		}
	};
}
