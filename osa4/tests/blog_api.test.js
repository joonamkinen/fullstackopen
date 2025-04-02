const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const { before } = require('lodash')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Matkablogi',
        author: 'Markku',
        url: 'Matkablogi.fi',
        likes: 2,
    },
    {
        title: 'Tietoblogi',
        author: 'Juhani',
        url: 'Tietoblogi.fi',
        likes: 3,
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})


test.only('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
})

test.only('blog have id not _id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert(blog.id)
    assert.strictEqual(blog._id, undefined,)
})

test.only('new blog can be added', async () => {
    const newBlog = {
        title: 'Autoblogi',
        author: 'Jari',
        url: 'Autoblogi.fi',
        likes: 5,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    const titles = response.body.map(blog => blog.title)
    assert(titles.includes(newBlog.title))
})

test.only('if likes is null then it defaults 0', async () => {
    const newBlog = {
        title: 'Tylsä blogi',
        author: 'Tylsimys',
        url: 'Eitykkayksia.fi',
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    // Tarkistetaan, että lisätyn blogin likes-kenttä on 0
    assert.strictEqual(response.body.likes, 0,)
})

test.only('blog without title is not added', async () => {
    const newBlog = {
        author: 'Jari',
        url: 'Eititlea.fi',
        likes: 5,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test.only('blog without url is not added', async () => {
    const newBlog = {
        title: 'Ei Urlia',
        author: 'Jari',
        likes: 5,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test.only('blogs likes can be updated', async () => {
    const blogs = await api.get('/api/blogs')
    const blogToUpdate = blogs.body[0]

    const updatedBlogData = { likes: blogToUpdate.likes + 1 }

    const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlogData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, updatedBlogData.likes)

    const blogsUpdated = await api.get('/api/blogs')
    const updatedBlog = blogsUpdated.body.find(blog => blog.id === blogToUpdate.id);

    assert.strictEqual(updatedBlog.likes, updatedBlogData.likes);
});

test.only('trying to update nonextint blog return 404', async () => {
    const noId = new mongoose.Types.ObjectId(); 

    const updatedBlogData = { likes: 23 };

    await api
        .put(`/api/blogs/${noId}`)
        .send(updatedBlogData)
        .expect(404);
});

test.only('a blog can be deleted', async () => {
    const blogs = await api.get('/api/blogs');
    const blogToDelete = blogs.body[0];

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

    const blogsDeleted = await api.get('/api/blogs');
    assert.strictEqual(blogsDeleted.body.length, blogs.body.length - 1);

    const ids = blogsDeleted.body.map(blog => blog.id);
    assert(!ids.includes(blogToDelete.id));
});


test.only('trying to delete nonextint blog return 404', async () => {
    const noId = new mongoose.Types.ObjectId();

    await api
        .delete(`/api/blogs/${noId}`)
        .expect(404);
});

after(async () => {
    await mongoose.connection.close()
})