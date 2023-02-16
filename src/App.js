import React, { useEffect, useState } from "react";
import Name from "./components/Name";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personsService.getAll().then((currentNames) => {
      setPersons(currentNames);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === `${newName}`)) {
      alert(
        `${newName}` +
          " is already added to phonebook, replace the old number with a new one?"
      );
    } else {
      personsService.create(nameObject).then((returnedName) => {
        setPersons(persons.concat(returnedName));
        setNewName("");
        setNewNumber("");
        console.log(persons.id);
      });
    }
  };
  const handleNewName = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const deletePersons = (id) => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch("http://localhost:3001/persons/" + id, requestOptions);
    personsService.getAll().then((initialNames) => {
      setPersons(initialNames);
    });
  };

  const changeNumberOf = (id) => {
    const url = `http://localhost:3001/persons/${id}`;
    const person = persons.find((n) => n.id === id);
    const changedPerson = { ...person, important: !person.important };

    axios.put(url, changedPerson).then((response) => {
      setPersons(
        persons.map((person) => (person.id !== id ? person : response.data))
      );
    });
  };

  return (
    <div classname="App">
      <h2>Phonebook</h2>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons
        .filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        })
        .map((person) => (
          <div classname="user">
            <li key={person.name}>
              {person.name}
              {person.number}
            </li>
          </div>
        ))}
    </div>
  );
};

export default App;
