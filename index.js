require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
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
    console.log('Frontend Loaded!!!!!')
})

app.get('/api/persons', (req,res) => {
    Person.find({}).then(personsDB => {
        res.json(personsDB.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(pers => {
            if(pers) {
                res.json(pers.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.get('/api/info', (req,res) => {
    Person.find({}).then(persons => {
        let d = new Date()
        res.send(`Phonebook has info for ${persons.length} people.<br>${d}`)
    })
})

app.delete('/api/persons/:id',(req,res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            return res.status(204).end()
        })
        .catch(error => {
            console.log(error)
        })
})

app.post('/api/persons',(req,res,next) => {
    const body = req.body

    if(!(body.name || body.number)) {
        return res.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => res.json(savedAndFormattedPerson))
        .catch(err => next(err))
})

app.put('/api/persons/:id',(req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true})
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(err => next(err))
})


const errorHandler = (error, req, res, next) => {
    if(error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error:'malformatted id' })
    } else if(error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message })
    } else {
        return res.status(400).send({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const unknownEndPoint = (error, req, res, next) => {
    res.status(404).send({ error:'unknown endpoint' })
}

app.use(unknownEndPoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})