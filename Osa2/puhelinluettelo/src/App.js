import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <div>
      <p>{name} {number}</p>
    </div>
  )
}

const Persons = ({ persons, filter }) => {
  const filteredPersons = persons.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))
  const list = filteredPersons.map(a => <Person key={a.name} name={a.name} number={a.number} />)
  return (
    <div>{list}</div>
  )
}

const Filter = ({ filter, handler }) => {
  return (
    <div>filter shown with <input value={filter} onChange={handler} /> </div>
  )
}

const PersonForm = ({ submit, name, number, handleName, handleNumber }) => {
  return (
    <div>
      <form onSubmit={submit}>
        <div>name: <input value={name} onChange={handleName} /> </div>
        <div>number: <input value={number} onChange={handleNumber} /> </div>
        <div><button type="submit">add</button> </div>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addNumber = (event) => {
    if (persons.map(a => a.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      event.preventDefault()
      const numberObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(numberObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handler={handleFilter} />
      <h2>Add new contact</h2>
      <PersonForm
        submit={addNumber}
        name={newName}
        number={newNumber}
        handleName={handleNewName}
        handleNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} />
    </div>
  )

}

export default App