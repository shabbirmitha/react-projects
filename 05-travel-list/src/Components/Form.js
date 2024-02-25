import { useState } from "react";

function Form({ onAddItem }) {

    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;

        const newItem = { description, quantity, packed: false, id: Date.now() }
        onAddItem(newItem);
        setQuantity(1);
        setDescription("");
    }

    return <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip ?</h3>
        <select value={quantity} onChange={(n) => setQuantity(Number(n.target.value))}>
            {
                Array.from({ length: 20 }, (_, i) => i + 1).map((i) => <option value={i} key={i}>{i}</option>)
            }
        </select>
        <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)}></input>
        <button>Add</button>
    </form>
}

export default Form;