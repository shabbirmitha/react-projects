function Stats({ items }) {
    const numItems = items.length;
    if (!numItems) {
        return <footer className="stats">
            <em>Start adding some items to your packing list 🚀</em>
        </footer>
    }
    const numPacked = items.filter(i => i.packed).length;
    const packedPercent = Math.round(numPacked / numItems * 100);

    return <footer className="stats">
        {packedPercent === 100 ?
            <em>You got everything! Ready to go ✈️</em>
            :
            <em>💼 You have {numItems} items on your list, and you already packed {numPacked}({packedPercent} %)</em>
        }
    </footer>
}

export default Stats;