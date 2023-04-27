const express = require('express')
const app = express()

app.use(express.json())

const currentDate = Date()

function getRandomId(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
        },
        {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
        },
        {
        name: "Dan Abramov",
        number: "13-46-274344",
        id: 3
        },
        {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
        },
        {
        name: "Ukko Metso",
        number: "0700-123123",
        id: 5
        },
        {
        name: "Turha Ukko",
        number: "123457",
        id: "231a87b6-a7ae-4b14-8cce-a21c0c8d952b"
        }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${names.length} people</p><p>${currentDate}</p>`)

})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const newId = getRandomId(10,150)
    const person = request.body
    person.id = newId
    persons.push(person)
    console.log(person)
    response.json(person)
    // virhekäsitteluy vielä (osa 3.6)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)