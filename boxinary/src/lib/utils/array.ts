import type { ClientExample } from "@root/app";

export function groupExamplesByDefinition(examples: ClientExample[]) {
	const definitions = examples.reduce((definitions, { definition }) => {
		if (definitions.some(({ name }) => name === definition.name)) return definitions;
		definitions.push(definition);
		return definitions;
	}, [] as ClientExample["definition"][]);
	return definitions.map((definition) => {
		const matches = examples.filter(({ definition: { name } }) => name === definition.name);
		return { definition: definition.definition, name: definition.name, examples: matches };
	});
}

export function shuffle<T>(array: Array<T>) {
	for (let index = 0; index < array.length; index++) {
		const random = Math.floor(Math.random() * (index + 1));
		[array[index], array[random]] = [array[random], array[index]];
	}
	return array;
}
