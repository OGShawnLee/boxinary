import Quiz from "./Quiz.svelte";

export type {
	ChoiceCount,
	ChoiceObject,
	ChoiceState,
	QuestionObject,
	QuestionState,
	QuizConfiguration,
	QuizObject
} from "./state";
export { default as QuizQuestion } from "./Question.svelte";
export default Quiz;
