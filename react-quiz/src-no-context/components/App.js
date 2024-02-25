import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import QuizScreen from './QuizScreen'
import Progress from './Progress'
import FinishScreen from './FinishScreen'
import Footer from './Footer'

const SECS_PER_QUESTION = 30;

const initialState = {
    questions: [],

    // 'loading', 'error', 'ready', 'active', 'finished'
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    submited: false,
    highestScore: 0,
    seconds: null
};
function reducer(state, action) {
    switch (action.type) {
        case "dataRecieved":
            return {
                ...state,
                questions: action.payload,
                status: 'ready'
            }
        case "dataFailed":
            return {
                ...state,
                status: 'error'
            }
        case 'start':
            return {
                ...state,
                status: 'active',
                seconds: state.questions.length * SECS_PER_QUESTION
            }
        case 'next':
            return {
                ...state,
                index: state.index + 1,
                submited: false,
                answer: null,
            }
        case 'newAnswer':
            const question = state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points,
                submited: true,
            }
        case 'finish':
            return {
                ...state,
                status: 'finished',
                highestScore: state.points > state.highestScore ? state.points : state.highestScore,

            }
        case 'retake':
            return {
                ...initialState,
                questions: state.questions,
                status: 'ready',
                highestScore: state.highestScore
            }
        case 'timer':
            return {
                ...state,
                seconds: state.seconds - 1,
                status: state.seconds === 0 ? 'finished' : state.status,
            }
        default:
            throw new Error("Action Unkown")

    }
}

export default function App() {


    const [{ questions, status, seconds, index, highestScore, answer, submited, points }, dispatch] = useReducer(reducer, initialState)


    const numOfQuestions = questions.length;
    const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)



    useEffect(function () {
        fetch('http://localhost:8000/questions')
            .then(res => res.json())
            .then(data => dispatch({ type: 'dataRecieved', payload: data }))
            .catch(err => dispatch({ type: 'dataFailed' }))
    }, [])

    return <div className='app'>
        <Header />

        <Main>
            {status === 'loading' && <Loader />}
            {status === 'error' && <Error />}
            {status === 'ready' && <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />}
            {status === 'active' && <>

                <Progress answer={answer} index={index} maxPoints={maxPoints} numOfQuestions={numOfQuestions} points={points} />
                <QuizScreen
                    submited={submited}
                    question={questions[index]}
                    dispatch={dispatch}
                    answer={answer}
                />
                <Footer seconds={seconds} submited={submited} index={index}
                    numOfQuestions={numOfQuestions} dispatch={dispatch} />
            </>
            }
            {status === 'finished' && <FinishScreen dispatch={dispatch} highestScore={highestScore} maxPoints={maxPoints} points={points} />}
        </Main>


    </div>
}
