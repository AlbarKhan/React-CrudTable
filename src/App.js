import { useState } from "react";

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

  function handleAdditems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleEditItem(name, number, email) {}
  return (
    <div className="app">
      <h2>CRUD TABLE</h2>
      <Form onAddItem={handleAdditems} />
      <Table items={items} onDelete={handleDeleteItem} />
    </div>
  );
}

function Form({ onAddItem }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
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
    onAddItem(newObj);
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
      <button className="submit">Submit</button>
    </form>
  );
}

function Table({ items, onDelete }) {
  return (
    <table>
      <thead style={{ backgroundColor: "grey" }}>
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
              index % 2 == 0
                ? { backgroundColor: "#002E63" }
                : { backgroundColor: "#5865f2" }
            }
          >
            <td>{d.name}</td>
            <td>{d.number}</td>
            <td>{d.email}</td>
            <td>
              <button className="edit">Edit</button>
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
