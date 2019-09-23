const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

let persons = [
    {
      "name": "Anna Balo",
      "number": "123456",
      "id": 3
    },
    {
      "name": "Clau Ghenosu",
      "number": "666666",
      "id": 4
    }
  ]

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

morgan.token('getBody', (req,res) => {
    if(req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})
app.use(morgan(':getBody'))


app.get('/', (req,res) => {
    res.send('<h1>Hello world!</h1>')
})

app.get('/api/persons', (req,res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
    res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/api/info', (req,res) => {
    let d = new Date()
    res.send(`Phonebook has info for ${persons.length} people.<br>${d}`)
})

app.delete('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    person = persons.filter(person => person.id === id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons',(req,res) => {
    const person = req.body
    person.id = Math.floor(Math.random() * 500)
    persons.push(person)
    res.json(person)
})

const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})