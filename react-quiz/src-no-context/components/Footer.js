import Timer from './Timer'

function Footer({ dispatch, index, numOfQuestions, submited, seconds }) {

    const isLast = index === numOfQuestions - 1;



    function handleNext() {

        if (isLast) return dispatch({ type: 'finish' })

        return dispatch({ type: 'next' })
    }
    return (
        <div>
            <Timer dispatch={dispatch} seconds={seconds} />
            {submited && <button onClick={handleNext} className="btn btn-ui">{isLast ? 'Finish' : 'Next'}</button>}
        </div>
    )
}

export default Footer
