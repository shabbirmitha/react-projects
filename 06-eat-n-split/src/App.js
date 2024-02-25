import SplitCal from "./components/SplitCal";
import List from "./components/List";
import { useState } from "react";


function App() {
  const [frndsList, addFrnd] = useState([]);
  const [selectId, setSelectId] = useState();

  function handleAddFrnd(item) {
    addFrnd(() => [...frndsList, item])
  }

  function handleSplit(val) {
    addFrnd(frnd => frndsList.map(friend => friend.id === selectId.id ? { ...friend, balance: friend.balance + val } : friend));
    setSelectId()
  }

  return <div className="app">
    <List isSelect={selectId} frndsList={frndsList} onAddFrnd={handleAddFrnd} setSelectId={setSelectId} />
    {selectId && <SplitCal selectedId={selectId} onSplit={handleSplit} key={selectId.id} />}
  </div>
}



export default App;