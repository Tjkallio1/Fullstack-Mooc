const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://tjkallio:${password}@cluster0.l63pmd0.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length >= 5) {
  const name = process.argv[3].replace('-', ' ')
  const number = process.argv[4]

  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then((result) => {
      console.log(`added ${result.name} ${result.number} to phonebook `)
      mongoose.connection.close()
    })
} else {
  Person
    .find({})
    .then((persons) => {
      console.log('phonebook:')
      persons.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}
