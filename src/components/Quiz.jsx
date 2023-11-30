import React, { useRef, useState } from 'react'
import './quiz.css'
import {data} from '../data/data'

const Quiz = () => {
    let [index,setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [questionlock,setQuestionlock] = useState(false)
    let [score,setScore] = useState(0);
    let [result,setResult] = useState(false)

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let Option_Array = [Option1,Option2,Option3,Option4]

    const checkAns = (e,ans) => {
        if(questionlock === false){
            if(question.ans === ans){
                e.target.classList.add("correct")
                setQuestionlock(true)
                setScore(prev=>prev+1)
            }
            else{
                e.target.classList.add("incorrect")
                setQuestionlock(true)
                Option_Array[question.ans-1].current.classList.add("correct")
            }
        }
    }
    const nextques = ()=>{
        if(questionlock === true){
            if(index ===data.length-1){
                setResult(true);
                return 0
            }
            setIndex(++index);
            setQuestion(data[index])
            setQuestionlock(false);
            Option_Array.map((option)=>{
                option.current.classList.remove("incorrect");
                option.current.classList.remove("correct");
                return null
            })
        }
    }
    const reset = ()=>{
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setQuestionlock(false);
        setResult(false)
    }
  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr/>
        {result?<></>:<>
            <h2>{index+1}. {question.question}</h2>
            <ul>
                <li ref={(Option1)} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
                <li ref={(Option2)} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
                <li ref={(Option3)} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
                <li ref={(Option4)} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
            </ul>
            <button onClick={nextques}>Next</button>
            <div className='indexnum'> {index+1} of {data.length} Questions </div>
        </>
        }
        {result?<>
            <h2> You Scored {score} out of {data.length}</h2>
            <button onClick={reset}>Reset</button>
        </>:<></>}
        
    </div>
  )
}

export default Quiz