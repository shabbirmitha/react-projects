import { useQuiz } from "../context/QuizContext"

function Options({ question }) {

    const { dispatch, answer } = useQuiz();

    const submited = answer !== null;

    return (
        <div className="options">
            {question.options.map((option, index) =>
                <button
                    key={option}
                    disabled={answer !== null}
                    onClick={() => dispatch({ type: 'newAnswer', payload: index })}
                    className={`btn btn-option ${index === answer ? 'answer' : ''} ${submited && (index === question.correctOption ? 'correct' : 'wrong')}`}>{option}
                </button>)}
        </div>
    )
}
export default Options