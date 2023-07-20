import { useState } from 'react'

const Persons = ({ persons, filter }) => {
  if (filter != '') {
    const filteredPersons = persons.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))
    const list = filteredPersons.map(a => <p key={a.name}> {a.name} {a.number} </p>)
    return (
      <div>{list}</div>
    )
  } else {
    const list = persons.map(a => <p key={a.name}> {a.name} {a.number} </p>)
    return (
      <div>{list}</div>
    )
  }
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
  const handleQuery = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={newFilter} onChange={handleQuery} /> </div>
      <h2>Add new contact</h2>
      <form onSubmit={addNumber}>
        <div>name: <input value={newName} onChange={handleNewName} /> </div>
        <div>number: <input value={newNumber} onChange={handleNewNumber} /> </div>
        <div><button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} />
    </div>
  )

}

export default App