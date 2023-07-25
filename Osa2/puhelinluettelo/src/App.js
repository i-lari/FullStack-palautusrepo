import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ name, number, remove }) => {
  return (
    <div>
      {name} {number}
      <button onClick={remove}>remove</button>
    </div>
  )
}

const Persons = ({ persons, filter, remove }) => {
  const filteredPersons = persons.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))
  const list = filteredPersons.map(a => <Person key={a.name} name={a.name} number={a.number} remove={() => remove(a.id)} />)
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  //fetch data from server using effect hook
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNumber = (event) => {
    if (persons.map(a => a.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      event.preventDefault()
      const numberObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(numberObject)
        .then(returnedObject => {
          setPersons(persons.concat(returnedObject))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  const removeNumber = (id) => {
    if (window.confirm('Delete ' + persons.filter(a => a.id == id)[0].name + '?')) {
      personService
        .remove(id)
        .then(() => {
          const newPersons = persons.filter(a => a.id != id)
          setPersons(newPersons)
        })
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
      <Persons persons={persons} filter={newFilter} remove={removeNumber} />
    </div>
  )

}

export default App