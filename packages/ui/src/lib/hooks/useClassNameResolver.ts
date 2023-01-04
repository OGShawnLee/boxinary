import type {
	ClassName,
	ComponentState,
	FunctionClassName,
	Nullable,
	StatePredicate,
	SwitchClassName
} from "$lib/types";
import { clearString } from "$lib/utils";
import { isFunction, isNullish, isString, isWhitespace } from "@boxinary/predicate-core";

export default function useClassNameResolver<S extends ComponentState>(className: ClassName<S>) {
	return function (state: StatePredicate<S>) {
		if (isFunction(className)) return handleFunctionClassName(className, state);
		if (isNullish(className)) return;
		if (isString(className)) return clearClassName(className);

		const { base, checked, disabled, open, selected } = className as Exclude<
			ClassName<ComponentState>,
			Nullable<string | FunctionClassName<ComponentState>>
		>;
		const classList = [base];
		const { isChecked, isDisabled, isOpen, isSelected } = state as StatePredicate<ComponentState>;

		classList.push(handleSwitchClassName(checked, isChecked));
		classList.push(handleSwitchClassName(disabled, isDisabled));
		if (isDisabled) return getClassNameFromClassList(classList);
		classList.push(
			handleSwitchClassName(open, isOpen),
			handleSwitchClassName(selected, isSelected)
		);
		return getClassNameFromClassList(classList);
	};
}

function clearClassName(className: Nullable<string>) {
	if (isNullish(className) || isWhitespace(className)) return;
	return clearString(className);
}

function getClassNameFromClassList(classList: Nullable<string>[]) {
	const className = classList.reduce((className, next) => {
		const nextClassName = clearClassName(next);
		return nextClassName ? `${className} ${nextClassName}` : className;
	}, "");
	return clearClassName(className);
}

function handleFunctionClassName<S extends ComponentState>(
	className: Nullable<string | FunctionClassName<S>>,
	predicate: StatePredicate<S>
) {
	if (isNullish(className)) return;
	if (isString(className)) return clearClassName(className);

	return clearClassName(className(predicate)) ?? undefined;
}

function handleSwitchClassName(className: Nullable<SwitchClassName | string>, condition: boolean) {
	if (isNullish(className)) return;
	if (isString(className)) {
		if (condition) return clearClassName(className);
	} else {
		const { off, on } = className;
		return clearClassName(condition ? on : off);
	}
}
