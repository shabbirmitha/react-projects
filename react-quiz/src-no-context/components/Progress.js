function Progress({ points, index, numOfQuestions, maxPoints, answer }) {
    return (
        <div className="progress">
            <progress value={index + Number(answer !== null)} max={numOfQuestions} />
            <p>Question <strong>{index + 1}</strong> / {numOfQuestions}</p>
            <p><strong>{points}</strong> / {maxPoints} points</p>
        </div>
    )
}

export default Progress
