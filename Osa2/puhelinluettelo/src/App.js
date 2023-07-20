import { useState } from 'react'

const Numbers = ({ persons }) => {
  const list = persons.map(a => <p key={a.name}> {a.name}</p>)
  return (
    <div>{list}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const numberObject = {
      name: newName
    }
    setPersons(persons.concat(numberObject))
    setNewName('')
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName}
            onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )

}

export default App