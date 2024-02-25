import { useState } from "react";

function Item({ item, onDeleteClick, onCheckbox }) {
    return (
        <li>
            <input type="checkbox" checked={item.packed} value={item.id} onChange={() => onCheckbox(item.id)} />
            <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteClick(item.id)}>&times;</button>
        </li>
    );
}

function PackingList({ items, onDeleteItem, onCheckItem, onClearList }) {

    const [sortBy, setSortBy] = useState('input');

    let sortedItems = [];

    if (sortBy === 'input') sortedItems = items;

    if (sortBy === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

    if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))

    return <div className="list">
        <ul>
            {sortedItems.map(i => {
                return <Item item={i} onDeleteClick={onDeleteItem} onCheckbox={onCheckItem} key={i.id} />
            })}
        </ul>
        <div className="actions" >
            <select value={sortBy} onChange={(e) => setSortBy(() => e.target.value)}>
                <option value='input'>Sort by input order</option>
                <option value='description'>Sort by description</option>
                <option value='packed'>Sort by packed status</option>
            </select>
            <button onClick={onClearList}>Clear list</button>
        </div>
    </div >
}

export default PackingList;