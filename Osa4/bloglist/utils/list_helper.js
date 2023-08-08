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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}