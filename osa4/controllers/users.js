const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')



usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1 , title: 1, author: 1 , likes: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!password || password.length < 3) {
        return response.status(400).json({ error: 'password must be atleast 3 characters long' })
    }
    if (!username || username.length < 3) {
        return response.status(400).json({ error: 'username must be atleast 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter