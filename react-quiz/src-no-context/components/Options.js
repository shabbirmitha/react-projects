function Options({ question, dispatch, answer, submited }) {
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