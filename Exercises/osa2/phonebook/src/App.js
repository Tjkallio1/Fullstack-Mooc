import { useState, useEffect } from 'react'
import personService from './services/personService'


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

const Persons = ({ persons, searchQuery, handleDelete}) => {
  const filteredNumbers = persons
    .filter(person => person.name)
    .filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    )
  return (
      <div>
        {filteredNumbers.map(person => (
        <div key={person.id}>
            <span>{person.name} {person.number}</span>
            <button onClick={() => handleDelete(person)}>delete</button>
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

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (ev) => {
    ev.preventDefault()
    console.log('button clicked', ev.target)

    const checkDouble = persons.filter(person => person.name === newName)
    const updateNumber = persons.filter(person => person.name ===newName)

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if(checkDouble.length > 0 && updateNumber.length > 0) {
      window.alert(`${newName} is already added to phonebook, replace the old number with the new one?`)
      personService
        .save(updateNumber[0].id, {...updateNumber[0], number: newNumber})
        .then(response => {
          console.log(response)
        })
        return
      }

    if(checkDouble.length >0) {
      window.alert(`${newName} is already added to phonebook!`)
      return
    }
    
    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        console.log(response)
        setNewName('')
        setNewNumber('')
      })

      if (updateNumber.length > 0) {
      window.alert(`${newName} is already added to phonebook, replace the old number with the new one?`)
      personService
        .save(updateNumber[0].id, {...updateNumber[0], number: newNumber})
        .then(response => {
          console.log(response)
        })
      }
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

  const handleDelete = (person) => {
    console.log(person.id)
    window.alert(`Delete ${person.name}?`)
    personService
      .deletePerson(person.id)
      .then(response => {
        console.log('Person deleted:', response.data)
      })
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
      <Persons persons={persons} searchQuery={searchQuery} handleDelete={handleDelete} />
    </div>
  )
}

export default App
