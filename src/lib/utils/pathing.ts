import type { Collection, Definition } from "@prisma/client";

export class UserPathing {
	constructor(public readonly displayName: string) {}

	get collections() {
		const displayName = this.displayName;
		return {
			create: getCollectionCreatePath(displayName),
			collection(id: Collection["id"]) {
				return {
					path: getCollectionPath(displayName, id),
					get add() {
						return {
							path: getCollectionAddPath(displayName, id),
							$add(definitionid: Definition["id"]) {
								return getCollectionAddAction(displayName, id, definitionid);
							}
						};
					},
					edit: getCollectionEditPath(displayName, id),
					$delete(redirect = "/home") {
						return getCollectionDeleteAction(displayName, id, redirect);
					}
				};
			}
		};
	}

	get dictionary() {
		const self = this;
		return {
			path: getDictionaryPath(self.displayName),
			create: getDefinitionCreatePath(self.displayName),
			definition(name: string) {
				return {
					path: getDefinitionPath(self.displayName, name),
					edit: getDefinitionEditPath(self.displayName, name),
					$delete(redirect = "/home") {
						return getDefinitionDeleteAction(self.displayName, name, redirect);
					}
				};
			}
		};
	}

	get profile() {
		return getProfilePath(this.displayName);
	}
}

// * Collection
export function getCollectionAddPath(displayName: string, id: Collection["id"]) {
	return `${getCollectionPath(displayName, id)}/add`;
}

export function getCollectionAddAction(
	displayName: string,
	id: Collection["id"],
	definitionid: Definition["id"]
) {
	return `${getCollectionPath(displayName, id)}/add?definition-id=${definitionid}`;
}

export function getCollectionPath(displayName: string, id: Collection["id"]) {
	return `/${displayName}/collections/${id}`;
}

export function getCollectionCreatePath(displayName: string) {
	return `/${displayName}/collections/i/create`;
}

export function getCollectionDeleteAction(
	displayName: string,
	id: Collection["id"],
	redirect = "/home"
) {
	return `${getCollectionPath(displayName, id)}/delete?redirect-to=${redirect}`;
}

export function getCollectionEditPath(displayName: string, id: Collection["id"]) {
	return `${getCollectionPath(displayName, id)}/edit`;
}

// * Definition
export function getDefinitionPath(displayName: string, name: string) {
	return `/${displayName}/dictionary/${name}`;
}

export function getDefinitionCreatePath(displayName: string) {
	return `/${displayName}/dictionary/i/add`;
}

export function getDefinitionDeleteAction(displayName: string, name: string, redirect = "/home") {
	return `${getDefinitionPath(displayName, name)}/delete?redirect-to=${redirect}`;
}

export function getDefinitionEditPath(displayName: string, name: string) {
	return `${getDefinitionPath(displayName, name)}/edit`;
}

// * Dictionary
export function getDictionaryPath(displayName: string) {
	return `/${displayName}/dictionary`;
}

// * Eaxmples
export function createExamplePathing(displayName: string) {
	return {
		user: getUserExamplesPath(displayName),
		definition(name: string) {
			return {
				self: getDefinitionExamplesPath(displayName, name),
				get add() {
					return `${this.self}/add`;
				},
				edit(id: bigint) {
					return getExampleEditPath(displayName, name, id);
				},
				$delete(id: bigint, redirect = getDefinitionPath(displayName, name)) {
					return getExampleDeleteAction({ displayName, name, id, redirect });
				}
			};
		}
	};
}

export function getDefinitionExamplesPath(displayName: string, name: string) {
	return `/${displayName}/dictionary/${name}/examples`;
}

export function getDefinitionExampleAddPath(displayName: string, name: string) {
	return `${getDefinitionExamplesPath(displayName, name)}/add`;
}

export function getExampleEditPath(displayName: string, name: string, id: bigint) {
	return `${getDefinitionExamplesPath(displayName, name)}/${id}/edit`;
}

export function getExampleDeleteAction(configuration: {
	displayName: string;
	name: string;
	id: bigint;
	redirect: string;
}) {
	const { displayName, name, id, redirect } = configuration;
	return `${getDefinitionExamplesPath(displayName, name)}/${id}/delete?redirect-to=${redirect}`;
}

export function getUserExamplesPath(displayName: string) {
	return `/${displayName}/dictionary/examples`;
}

// * User
export function getProfilePath(displayName: string) {
	return `/${displayName}`;
}
