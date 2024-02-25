import { useState } from "react"

export default function App(){

  const [step,setStep]=useState(1);
  const [count,setCount]=useState(0);
  const date = new Date();
  date.setDate(date.getDate()+count);

  return <>
    <div className="main">
      <div className="items">
        <input type="range" min='0' max='10' value={step} onChange={(e)=>setStep(()=>+e.target.value)}></input>
          <h3>Step:{step}</h3>
          </div>
      <div className="items">
        <button onClick={()=>setCount((s)=>s - step)}>-</button>
          <input type='text' value={count} onChange={(e)=>setCount(()=>Number(e.target.value))}></input>
        <button onClick={()=>setCount((s)=>s + step)}>+</button>
      </div>

      <div className="items">
        {count===0?"Today is ":count<0?`${Math.abs(count)} days ago was `:`${count} days from today is `}{date.toDateString()}
      </div>

      { (step!==1 || count !== 0) &&
      <button className="items" onClick={()=>{setCount(()=>0); setStep(()=>1)}}>Reset</button>
      }
    </div>
  </>
}
