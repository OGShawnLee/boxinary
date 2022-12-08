import type { Definition } from "@prisma/client";
import type { Writable, Readable } from "svelte/store";
import { derived, get, writable } from "svelte/store";
import { makeReadable } from "malachite-ui/utils";
import { isFunction, isInterface } from "@boxinary/predicate-core";
import { isStore, isWritable } from "malachite-ui/predicate";
import { useContext } from "malachite-ui/hooks";

export type QuestionState = "COMPLETE" | "INCOMPLETE";
export type ChoiceState = "CORRECT" | "INCORRECT" | "PENDING";
export type ChoiceCount = { correct: number; incorrect: number };

export interface ChoiceObject {
	choice: string;
	state: ChoiceState;
}

export interface QuizObject {
	[name: string]: QuestionObject;
}

export interface QuestionObject {
	name: Definition["name"];
	definition: string;
	description: Definition["description"];
	summary: Definition["summary"];
	choices: {
		[choise: string]: ChoiceObject;
	};
}

export interface QuizConfiguration {
	index: number;
	length: number;
	state: QuizObject;
}

interface QuizContext {
	currentIndex: Readable<number>;
	isShowingNavigation: Writable<boolean>;
	createQuestionState: (question: QuestionObject) => {
		state: Readable<QuestionState>;
		count: Readable<ChoiceCount>;
	};
}

interface QuestionContext {
	createChoiceState: (choice: ChoiceObject) => {
		state: Readable<ChoiceState>;
		isDisabled: Readable<boolean>;
		isChecked: Readable<boolean>;
		choose: () => void;
	};
}

const { getContext: getQuizContext, setContext: setQuizContext } = useContext<QuizContext>({
	component: "quiz",
	predicate: (value): value is QuizContext =>
		isInterface<QuizContext>(value, {
			currentIndex: isStore,
			isShowingNavigation: isWritable,
			createQuestionState: isFunction
		})
});

const { getContext: getQuestionContext, setContext: setQuestionContext } =
	useContext<QuestionContext>({
		component: "quiz-question",
		predicate: (value): value is QuestionContext =>
			isInterface<QuestionContext>(value, {
				createChoiceState: isFunction
			})
	});

export function createQuizState({ index, length, state }: QuizConfiguration) {
	const { useQuestion } = useQuiz(state);
	const navigation = createQuizNavigation(index, length);
	const isShowingNavigation = writable(false);

	const createQuestionState: QuizContext["createQuestionState"] = (question) => {
		const { useChoice, count, state } = useQuestion(question.definition);

		const createChoiceState: QuestionContext["createChoiceState"] = (choice) => {
			return useChoice(choice.choice);
		};

		setQuestionContext({ createChoiceState });
		return { state, count };
	};

	setQuizContext({
		isShowingNavigation,
		currentIndex: navigation.currentIndex,
		createQuestionState
	});
	return { isShowingNavigation, navigation };
}

function useQuiz(state: QuizObject) {
	const quiz = writable(state);
	return {
		subscribe: quiz.subscribe,
		useQuestion(question: string) {
			const questionObject = derived(quiz, (quiz) => quiz[question]);
			const count = derived(questionObject, (question) =>
				getQuestionChoicesCount(question.choices)
			);
			const questionState = derived(count, (count) =>
				count.correct >= 1 ? "COMPLETE" : "INCOMPLETE"
			);

			function useChoice(choice: string) {
				const choiceObject = derived(questionObject, (question) => question.choices[choice]);
				const isChecked = derived(choiceObject, (state) => state.state !== "PENDING");
				const isDisabled = derived(questionState, (state) => state === "COMPLETE");
				const isCorrect = choice === question;
				return {
					isDisabled,
					isChecked,
					state: derived(choiceObject, (choice) => choice.state),
					choose() {
						if (get(isChecked) || get(isDisabled)) return;
						quiz.update((state) => {
							state[question].choices[choice].state = isCorrect ? "CORRECT" : "INCORRECT";
							return state;
						});
					}
				};
			}

			return { state: questionState, count, questionObject, useChoice };
		}
	};
}

function getQuestionChoicesCount(choices: QuestionObject["choices"]) {
	return Object.values(choices).reduce<ChoiceCount>(
		(count, { state }) => {
			if (state === "PENDING") return count;
			state === "CORRECT" ? count.correct++ : count.incorrect++;
			return count;
		},
		{ correct: 0, incorrect: 0 }
	);
}

function createQuizNavigation(index: number, length: number) {
	const currentIndex = writable(index);
	return {
		currentIndex: makeReadable(currentIndex),
		previous() {
			currentIndex.update((index) => (index === 0 ? index : index - 1));
		},
		next() {
			currentIndex.update((index) => (index === length - 1 ? index : index + 1));
		}
	};
}

export { getQuestionContext, getQuizContext };
