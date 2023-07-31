const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: "645a1ec74b0aaf2ec5e571fb",
        title: "Esimerkkiblogi1",
        author: "Esimerkki Eetu",
        url: "http://www.blogitestaus.fi",
        likes: 7,
        __v: 0
        },
        {
        _id: "645a1f204b0aaf2ec5e57200",
        title: "Esimerkkiblogi2",
        author: "Esimerkki Erkki",
        url: "http://www.skeidaa.fi",
        likes: 12,
        __v: 0
        },
        {
        _id: "645a4778cea5a3f3730037cf",
        title: "Esimerkkiblogi3",
        author: "Esimerkki Eemeli",
        url: "http://www.juuh.fi",
        likes: 21,
        __v: 0
        }
]

beforeEach(async() => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()

})

test('blogs are returned as JSON and with the correct amount', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

const response = await api.get('/api/blogs')
expect(response.body).toHaveLength(initialBlogs.length)
})

test('identifying field is called id', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
    expect(response.body[0].id).toBeDefined()
})

test('a new blog can be added', async() => {
    const newBlog = {
        title: 'Esimerkkiblogi4',
        author: 'Esimerkki Eetvartti',
        url: 'www.eetvartti.com',
        likes: 14
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain('Esimerkkiblogi4')
    
})

test('0 is added if no likes are defined', async() => {
    const newBlog = {
        title: 'Esimerkkiblogi4',
        author: 'Esimerkki Eetvartti',
        url: 'www.eetvartti.com',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)

    const newlyAdded = response.body[response.body.length -1]

    expect(newlyAdded.likes).toBe(0)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain('Esimerkkiblogi4')
})

test('blog without title or url will not be added', async () => {
        const newBlog = {
            author: 'Esimerkki Eetvartti',
            likes: 14
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
})

describe('note is deleted', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const initialBlogs = await api.get('/api/blogs')
        const blogToDelete = initialBlogs.body[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
        const response = await api.get('/api/blogs')
        const blogsAtEnd = response.body

        expect(blogsAtEnd).toHaveLength(initialBlogs.body.length - 1)

        const contents = blogsAtEnd.map(r => r.content).filter(c => c !== undefined)

        expect(contents).not.toContain(blogToDelete.content)
    })
})

describe('updating existing blog works', () => {
    test('status code 200 is returned', async () => {
        const initialBlogs = await api.get('/api/blogs')
        const blogToUpdate = initialBlogs.body[0]
        const updatedBlog = {
            ...blogToUpdate,
            likes: 15
        }
        await api 
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await api.get('/api/blogs') 
        const updatedBlogAtEnd = blogsAtEnd.body.find(blog => blog.id === blogToUpdate.id)
        expect(updatedBlogAtEnd.likes).toEqual(15)
    })
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('salainen', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'keijo',
        name: 'Keijo Käyttäjä',
        password: 'salainen'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
    })


test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'root',
        name: 'root roottailija',
        password: 'salainen',
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(async() => {
    await mongoose.connection.close()
})