import { useState } from "react";
import Button from "./Button";

function SplitCal({ selectedId, onSplit }) {
    const [billVal, setBillVal] = useState("");
    const [yourExp, setYourExp] = useState("");
    const [Pay, setPay] = useState('you');
    const frndExp = billVal ? (billVal - yourExp) : "";

    function handleBalance(e) {
        e.preventDefault();

        if (!billVal || !yourExp) return;
        onSplit(Pay === 'you' ? -frndExp : yourExp);

    }

    function handleBillChange(e) {
        setBillVal(() => Number(e.target.value));
    }

    function handleYourExp(e) {
        if (Number(e.target.value) <= billVal) return setYourExp(() => Number(e.target.value));
    }

    return <div>
        <div>
            <form className="form-split-bill" onSubmit={handleBalance}>
                <h2>Split a bill with {selectedId.name} </h2>
                <label>💰Bill value</label>
                <input value={billVal} onChange={handleBillChange} />
                <label>🧍Your expense</label>
                <input value={yourExp} onChange={handleYourExp} />
                <label> 🧑‍🤝‍🧑{selectedId.name}'s expense</label>
                <input value={frndExp} disabled />
                <label>🤑 Who is paying the bill</label>
                <select value={Pay} onChange={(n) => setPay(() => n.target.value)}>
                    <option value='you'>You</option>
                    <option value='frnd'>{selectedId.name}</option>
                </select>
                <Button >Split bill</Button>
            </form>
        </div>
    </div>
}

export default SplitCal;