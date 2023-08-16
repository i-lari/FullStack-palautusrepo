const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "sienet",
        author: "pekka orponen",
        url: "aaa.com",
        likes: 15
    },
    {
        title: "pokemon",
        author: "raato234",
        url: "https://fi.wikipedia.org/wiki/Beluga",
        likes: 2147483647
    },
]


beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('pannusumu', 10)
    const user = new User({ username: 'pertti keinonen', passwordHash })
    await user.save()
    await Blog.deleteMany({})
    let BlogObject = new Blog(initialBlogs[0])
    await BlogObject.save()
    BlogObject = new Blog(initialBlogs[1])
    await BlogObject.save()
    
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map(r => r.author)

    expect(authors).toContain(
        'pekka orponen'
    )
})

test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    for (let i = 0; i < response.body.length; i++) {
        expect(response.body[i].id).toBeDefined()
    }
})

test('POST adds blog', async () => {
    const blogsFirst = await api.get('/api/blogs')
    expect(blogsFirst.body).toHaveLength(initialBlogs.length)
    const pertti = await api.get('/api/users')[0]
    console.log(pertti)

    const newBlog = {
        title: "pokemonni",
        author: "raa",
        url: "https://fi.wikipedia.org/wiki/Beluga",
        likes: 21474,
        user: pertti.id
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)

})

test('likes is 0 when not specified', async () => {
    const newBlog = {
        title: "pokemonni",
        author: "raa",
        url: "https://fi.wikipedia.org/wiki/Beluga"
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[response.body.length - 1].likes).toEqual(0)
    expect(response.body[response.body.length - 1].title).toEqual('pokemonni')
    expect(response.body[response.body.length - 1].url).toEqual("https://fi.wikipedia.org/wiki/Beluga")
    expect(response.body[response.body.length - 1].author).toEqual("raa")
    expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('return 400 bad request when title or url missing', async () => {
    const newBlog = {
        author: "raa",
        url: "https://fi.wikipedia.org/wiki/Beluga"
    }
    const newLog = {
        title: "pokemonni",
        author: "raa",
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(newLog)
        .expect(400)
})

test('delete blog by id', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    await api
    .delete(`/api/blogs/${blogsAtStart.body[0].id}`)
    .expect(204)

    const blogsAfterDelete = await api.get('/api/blogs')
    expect(blogsAfterDelete.body.length).toEqual(blogsAtStart.body.length-1)
})

test('update blog by id', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const firstBlog = blogsAtStart.body[0]
    const updatedBlog = {
        title: firstBlog.title,
        author: firstBlog.author,
        url: firstBlog.url,
        likes: firstBlog.likes+1
    }

    await api
    .put(`/api/blogs/${blogsAtStart.body[0].id}`)
    .send(updatedBlog)

    const blogsAfterUpdate = await api.get('/api/blogs')

    expect(blogsAfterUpdate.body[0].likes).toEqual(blogsAtStart.body[0].likes+1)
    expect(blogsAfterUpdate.body.length).toEqual(blogsAtStart.body.length)
})