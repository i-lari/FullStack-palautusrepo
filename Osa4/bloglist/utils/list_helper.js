const dummy = (blogs) => {
    return Number(1)
  }
  
  const totalLikes = (blogs) => {
    const initialValue = 0;
    const result = blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, initialValue);
    
    return result
  }
  module.exports = {
    dummy,
    totalLikes
  }