import Options from "./Options"

function QuizScreen({ question, dispatch, answer, submited, }) {


    return (
        <div>

            <h4>{question.question}</h4>
            <Options submited={submited} question={question} answer={answer} dispatch={dispatch} />
        </div>
    )
}

export default QuizScreen
