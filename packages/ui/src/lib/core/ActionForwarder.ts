import type { Unsubscriber } from "svelte/store";

interface Action {
	(element: HTMLElement): void | { destroy?: Unsubscriber };
}

namespace Forwarder {
	export interface CachedAction {
		destroy?: Unsubscriber;
	}
}

class ActionForwarder {
	protected readonly element: HTMLElement;
	protected readonly cache: Map<Action, Forwarder.CachedAction>;

	constructor(element: HTMLElement, actions: Array<Action>) {
		this.element = element;
		this.cache = new Map<Action, Forwarder.CachedAction>();
		this.initialiseActions(actions);
	}

	protected add(this: ActionForwarder, action: Action) {
		const result = action(this.element);
		this.cache.set(action, {
			destroy: result ? result.destroy : undefined
		});
	}

	protected delete(this: ActionForwarder, action: Action) {
		const cached = this.cache.get(action);
		cached?.destroy?.();
	}

	onDestroy(this: ActionForwarder) {
		for (const action of this.cache.values()) {
			action.destroy?.();
		}
	}

	onUpdate(this: ActionForwarder, actions: Array<Action>) {
		const preserved = new Set<Action>();

		for (const action of actions) {
			if (this.isCachedAction(action)) continue;
			this.add(action);
			preserved.add(action);
		}

		for (const cached of this.cache.keys()) {
			if (preserved.has(cached)) continue;
			this.delete(cached);
		}
	}

	protected isCachedAction(this: ActionForwarder, action: Action) {
		return this.cache.has(action);
	}

	protected initialiseActions(this: ActionForwarder, actions: Array<Action>) {
		for (const action of actions) this.add(action);
	}
}

export function forward(element: HTMLElement, actions: Array<Action>) {
	const forwarder = new ActionForwarder(element, actions);
	return {
		destroy: () => forwarder.onDestroy(),
		update: (actions: Array<Action>) => forwarder.onUpdate(actions)
	};
}
