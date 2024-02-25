import { useState } from "react";
import Logo from "./Components/Logo";
import Form from "./Components/Form";
import PackingList from "./Components/PackingList";
import Stats from "./Components/Stats";


export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item])
  }

  function handleDeleteList() {
    if (window.confirm("Are you sure you want to delete all items ?")
    ) {
      setItems(() => [])
    }
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  function handleCheckItem(id) {
    setItems(items => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item))
  }

  return <div className="app">
    <Logo />
    <Form onAddItem={handleAddItems} />
    <PackingList items={items} onClearList={handleDeleteList} onDeleteItem={handleDeleteItem} onCheckItem={handleCheckItem} />
    <Stats items={items} />
  </div>
}