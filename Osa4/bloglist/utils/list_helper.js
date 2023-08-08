const dummy = (blogs) => {
    return Number(1)
}

const totalLikes = (blogs) => {
    const initialValue = 0;
    const result = blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, initialValue);

    return result
}

const favoriteBlog = (blogs) => {
    let initialValue = {
        likes: Number(-1)
    }
    const result = blogs.reduce((curBest, currentValue) => currentValue.likes > curBest.likes ? currentValue : curBest, initialValue);

    const ret = {
        title: result.title,
        author: result.author,
        likes: result.likes
    }
    if (ret.likes === -1) return null
    else {
        return ret
    }
}

const mostBlogs = (blogs) => {
    let best = {
        autor: "",
        blogs: -1
    }
    for (let i = 0; i < blogs.length; i++) {
        const authorName = blogs[i].author
        const blogCount = blogs.reduce((acc, cur) => cur.author === authorName ? acc + 1 : acc, 0)

        if (blogCount > best.blogs) {
            best = {
                author: authorName,
                blogs: blogCount
            }
        }
    }
    if (best.blogs > 0) {
        return best
    } else {
        return null
    }
}

const mostLikes = (blogs) => {
    let best = {
        autor: "",
        likes: -1
    }
    for (let i = 0; i < blogs.length; i++) {
        const authorName = blogs[i].author
        const likeCount = blogs.reduce((acc, cur) => cur.author === authorName ? cur.likes + acc : acc, 0)

        if (likeCount > best.likes) {
            best = {
                author: authorName,
                likes: likeCount
            }
        }
    }
    if (best.likes >= 0) {
        return best
    } else {
        return null
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}