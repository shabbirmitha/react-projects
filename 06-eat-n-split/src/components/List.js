import { useState } from "react";
import Button from "./Button";

function List({ isSelect, setSelectId, frndsList, onAddFrnd }) {

    const [showAdd, setAdd] = useState(false);
    const [name, setName] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    function handleFrndForm(e) {
        e.preventDefault();

        if (!name || !imgUrl) return;

        const newFrnd = { id: crypto.randomUUID(), name, imgUrl, balance: 0 }
        onAddFrnd(newFrnd);
        setName('')
        setImgUrl('')
        setAdd(false)
    }



    return <div className="sidebar">
        {frndsList.map(e => <Card person={e} key={e.id} isSelect={isSelect} setSelectId={setSelectId} />)}

        {showAdd ? <form className="form-add-friend" onSubmit={handleFrndForm}>
            <label>🧑‍🤝‍🧑 Friend name </label>
            <input value={name} onChange={(e) => setName(() => e.target.value)} type="text" />
            <label>🌄 Image URL </label>
            <input value={imgUrl} onChange={(e) => setImgUrl(() => e.target.value)} type="text" />
            <Button>Add</Button>
        </form>
            : ''}
        <Button onClickDo={() => setAdd(() => !showAdd)}>{showAdd ? 'Close' : 'Add friend'}</Button>
    </div >
}

function Card({ person, isSelect, setSelectId }) {

    function handleSelect() {
        if (isSelect === person) return setSelectId()
        setSelectId(() => person)
    }

    return <ul>
        <li className={isSelect === person ? "selected" : ""}>
            <img src={person.imgUrl} alt={person.name} />
            <h3>{person.name}</h3>

            {
                person.balance === 0 ? <p>You and {person.name} are even.</p> :
                    person.balance > 0 ? <p className="red">You owe {person.name} {person.balance}€</p> :
                        <p className="green"> {person.name} owes you {Math.abs(person.balance)}€</p>
            }

            <Button onClickDo={handleSelect}>{isSelect === person ? "Close" : "Select"}</Button>
        </li>
    </ul>
}



export default List;