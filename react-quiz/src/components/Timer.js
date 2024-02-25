import { useEffect } from "react"
import { useQuiz } from "../context/QuizContext";

function Timer() {

    const { dispatch, seconds } = useQuiz();

    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;


    useEffect(function () {
        const id = setInterval(function () {
            dispatch({ type: 'timer' })
        }, 1000)

        return function () {
            clearInterval(id)
        }

    }, [dispatch])

    return (
        <div className="timer">
            {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
        </div>
    )
}

export default Timer
