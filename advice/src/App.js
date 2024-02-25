import { useState } from "react"


export default function App(){

  let [adv,setAdv] = useState([]);
  const [count,setCount] = useState(0);
  
  async function getAdv(){
    const res = await fetch('https://api.adviceslip.com/advice').then(res=>res.json()).then(json=>json.slip.advice);
    setAdv({adv:res});
  }

  async function getNew(){
    await getAdv();
    setCount(count + 1);
  }
  
    

  return <div className="main">
    <h1 className="header">Advices...</h1>

    <p>
      {adv.adv}
    </p>

    <button onClick={getNew}>Get a new advice</button>
        
    <p>you got {count} {count===1?"Advice":"Advices"}</p>
  </div>
}