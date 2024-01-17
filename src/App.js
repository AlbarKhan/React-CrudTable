import { useEffect, useState } from "react";

const data = [
  {
    name: "Albar",
    number: 9653475357,
    email: "albarkhan60@gmail.com",
    id: 212,
  },
  {
    name: "Masood",
    number: 9898989898,
    email: "masoodsarguru60@gmail.com",
    id: 313,
  },
];

export default function App() {
  const [items, setItems] = useState(data);
  const [editCheck, setEditCheck] = useState(false);
  const [editItem, setEditItem] = useState(null);
  // Adding Items
  function handleAdditems(item) {
    setItems((items) => [...items, item]);
  }

  // Check if  want To Edit Items
  function handleEditCheck(item) {
    setEditCheck(true);
    setEditItem(item);
  }

  // Function to Edit The Item
  function handleEditItem(name, number, email) {
    // console.log(editItem);
    setItems((items) =>
      items.map((item) =>
        item.id === editItem.id ? { ...item, name, number, email } : item
      )
    );
    setEditCheck(false);
    setEditItem(null);
  }
  // Delete Items
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  return (
    <div className="app">
      <h2>CRUD TABLE - REACT</h2>
      <Form
        onAddItem={handleAdditems}
        editCheck={editCheck}
        onEdit={handleEditItem}
        editItem={editItem}
      />
      <Table
        items={items}
        onDelete={handleDeleteItem}
        onEdit={handleEditCheck}
      />
    </div>
  );
}

function Form({ onAddItem, editCheck, onEdit, editItem }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editItem) {
      setName(editItem.name || "");
      setNumber(editItem.number || "");
      setEmail(editItem.email || "");
    }
  }, [editItem]);

  function handleSubmit(e) {
    console.log(editCheck);
    e.preventDefault();
    if (!name) {
      alert("Name required");
      return;
    }
    if (!number) {
      alert("Number Required");
      return;
    }
    if (!email) {
      alert("email Required");
      return;
    }
    const newObj = { name, number, email, id: Date.now() };
    if (editCheck) {
      onEdit(name, number, email);
    } else {
      onAddItem(newObj);
    }
    setName("");
    setNumber("");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input
        placeholder="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>Phone Number: </label>
      <input
        type="number"
        placeholder="Phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <label>Email id: </label>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <button
        className="submit"
        style={
          editCheck
            ? { backgroundColor: "#880ED4" }
            : { backgroundColor: "#51087E" }
        }
      >
        {editCheck ? "Update" : "Submit"}
      </button>
    </form>
  );
}

function Table({ items, onDelete, onEdit }) {
  return (
    <table>
      <thead style={{ backgroundColor: "#461257", color: "white" }}>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email id</th>
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((d, index) => (
          <tr
            className=""
            key={index}
            style={
              index % 2 === 0
                ? { backgroundColor: "#880ED4" }
                : { backgroundColor: "#51087E" }
            }
          >
            <td>{d.name}</td>
            <td>{d.number}</td>
            <td>{d.email}</td>
            <td>
              <button className="edit" onClick={() => onEdit(d)}>
                Edit
              </button>
            </td>
            <td>
              <button className="delete" onClick={() => onDelete(d.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
