import type { PageServerLoad } from "./$types";
import type { QuestionObject, QuizObject } from "$lib/components/Quiz";
import type { Definition } from "@prisma/client";
import { error } from "@sveltejs/kit";
import { shuffle } from "$lib/utils";

export const load: PageServerLoad = async ({ parent }) => {
	const { collection } = await parent();

	if (collection.definitions.length < 5)
		throw error(400, { message: "Collection must have at least 5 definitions." });

	return { state: generateQuizObject(collection.definitions) };
};

function generateQuizObject(items: { definition: Definition }[]): QuizObject {
	const state: QuizObject = {};
	const choices = items.map(({ definition }) => definition.definition);

	for (let index = 0; index < items.length; index++) {
		const { definition } = items[index];
		let cleared = choices.filter((choice) => choice !== definition.definition).slice(0, 3);
		cleared.push(definition.definition);
		cleared = shuffle(cleared);

		const finalChoices: QuestionObject["choices"] = cleared.reduce((object, choice) => {
			object[choice] = { choice, state: "PENDING" };
			return object;
		}, {} as QuestionObject["choices"]);

		state[definition.definition] = {
			name: definition.name,
			definition: definition.definition,
			description: definition.description,
			summary: definition.summary,
			choices: finalChoices
		};
	}

	return state;
}
