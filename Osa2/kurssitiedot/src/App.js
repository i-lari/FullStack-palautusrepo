const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p> {props.name} {props.exercises} </p>
    </div>
  )
}
const Content = ({ course }) => {
  const list = course.parts.map(a => <Part key={a.id} name={a.name} exercises={a.exercises} />)
  return (
    <div>
      {list}
    </div>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.map(a => a.exercises).reduce((a, b) => a + b, 0)
  return (
    <div>
      <b>total of {sum} exercises</b>
    </div>
  )
}
const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App