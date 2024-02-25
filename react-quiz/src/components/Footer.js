import { useQuiz } from '../context/QuizContext';
import Timer from './Timer'

function Footer() {
    const { dispatch, index, numOfQuestions, submited } = useQuiz();

    const isLast = index === numOfQuestions - 1;


    function handleNext() {

        if (isLast) return dispatch({ type: 'finish' })

        return dispatch({ type: 'next' })
    }
    return (
        <div>
            <Timer />
            {submited && <button onClick={handleNext} className="btn btn-ui">{isLast ? 'Finish' : 'Next'}</button>}
        </div>
    )
}

export default Footer
