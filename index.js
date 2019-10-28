require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

morgan.token('getBody', (req,res) => {
    if(req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})
app.use(morgan(':getBody'))


app.get('/', (req,res) => {
    console.log('Frontend Loaded!!!!!')
})

app.get('/api/persons', (req,res) => {
    Person.find({}).then(personsDB => {
        res.json(personsDB.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req,res) => {
    Person.findById(req.params.id)
        .then(pers => {
            if(pers) {
                res.json(pers.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).end({ error: 'malformatted id' })
        })
})

app.get('/api/info', (req,res) => {
    Person.find({}).then(persons => {
        let d = new Date()
        res.send(`Phonebook has info for ${persons.length} people.<br>${d}`)
    })
})

app.delete('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    person = persons.filter(person => person.id === id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons',(req,res) => {
    const body = req.body

    if(!(body.name || body.number)) {
        return res.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON)
    })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})