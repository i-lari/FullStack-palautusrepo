import { useState } from 'react'

const Persons = ({ persons }) => {
  const list = persons.map(a => <p key={a.name}> {a.name} {a.number} </p>)
  return (
    <div>{list}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-12312244'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>name: <input value={newName} onChange={handleNewName} /> </div>
        <div>number: <input value={newNumber} onChange={handleNewNumber} /> </div>
        <div><button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )

}

export default App