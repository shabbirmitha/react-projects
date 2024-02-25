import { useQuiz } from "../context/QuizContext";

function FinishScreen() {

    const { points, maxPoints, highestScore, dispatch } = useQuiz();

    const percent = (points / maxPoints) * 100;

    let emoji;
    if (percent === 100) emoji = '🥇';
    if (percent >= 80 && percent < 100) emoji = '🎉';
    if (percent >= 50 && percent < 80) emoji = '🙂';
    if (percent > 0 && percent < 50) emoji = '🤔';
    if (percent === 0) emoji = '🤦‍♂️';

    return (
        <>
            <p className="result">
                <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percent)}%).
            </p>
            <p className="highscore">(Highscore: {highestScore} points)</p>
            <button onClick={() => dispatch({ type: 'retake' })} className="btn btn-ui">Restart Quiz</button>
        </>
    )
}

export default FinishScreen
