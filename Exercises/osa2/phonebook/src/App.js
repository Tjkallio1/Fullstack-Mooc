import { useState } from 'react'

const Filter = ({ searchQuery, handleSearchChange }) => {
  return (
    <div>
      Search numbers: <input value={searchQuery} onChange={handleSearchChange} />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addName}) => {
  return (
    <div>
      <form onSubmit={addName}>
        <div> name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({ persons, searchQuery }) => {
const filteredNumbers = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  return (
      <div>
        {filteredNumbers.map(person => (
        <div key={person.id}>
            {person.name} {person.number}
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const addName = (ev) => {
    ev.preventDefault()
    console.log('button clicked', ev.target)

    const checkDouble = persons.filter(person => person.name === newName)

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    checkDouble.length > 0 
    ? window.alert(`${newName} is already added to phonebook!`)
    : setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (ev) => {
    console.log(ev.target.value)
    setNewName(ev.target.value)
  }

  const handleNumberChange = (ev) => {
    console.log(ev.target.value)
    setNewNumber(ev.target.value)
  }

  const handleSearchChange = (ev) => {
    setSearchQuery(ev.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} handleSearchChange={handleSearchChange}/>
      <h3>Add new</h3>
      <PersonForm
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      addName={addName}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} searchQuery={searchQuery} />
    </div>
  )
}

export default App
