const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/users', async (request, response) => {
    console.log(request.body)
    const users = await User
        .find({}).populate('blogs')
        response.json(users)
  })

usersRouter.post('/users', async (request, response) => {
    const { username, name, password } = request.body
    if(request.body.password.length < 3) {
        return response.status(400).json({error: 'password too short'})
    }

    const existingUser = await User.findOne( { username })
    if(existingUser) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter