const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const authorBlogCount = lodash.countBy(blogs, 'author')

    const maxBlogsAuthor = lodash.maxBy(
        Object.entries(authorBlogCount).map(([author, blogs]) => ({ author, blogs })),
        'blogs'
    )

    return {
        author: maxBlogsAuthor.author,
        blogs: maxBlogsAuthor.blogs
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const authorLikes = lodash.groupBy(blogs, 'author')

    const authorLikesSum = lodash.mapValues(authorLikes, (blogs) =>
        lodash.sumBy(blogs, 'likes')
    )

    const maxLikesAuthor = lodash.maxBy(
        Object.entries(authorLikesSum).map(([author, likes]) => ({ author, likes })),
        'likes'
    )

    return {
        author: maxLikesAuthor.author,
        likes: maxLikesAuthor.likes
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }