const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs',{url : 1, title :1, author:1, likes :1, id :1})

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const duplicate = await User.findOne({username})
  if(duplicate) {
    response.status(400).json({error: 'expected `username` to be unique'})
  } else if(!username || username.length<3) {
    response.status(400).json({error: 'username has to be at least three(3) characters long'})
  } else if(!password || password.length < 3) {  
  response.status(400).json({error: 'password has to be at least three(3) characters long'})
  } else {

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
  }
})



module.exports = usersRouter