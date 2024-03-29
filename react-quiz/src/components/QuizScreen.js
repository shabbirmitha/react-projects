import { useQuiz } from "../context/QuizContext"
import Options from "./Options"

function QuizScreen() {

    const { questions, index } = useQuiz();
    const question = questions.at(index);

    return (
        <div>

            <h4>{question.question}</h4>
            <Options question={question} />
        </div>
    )
}

export default QuizScreen
