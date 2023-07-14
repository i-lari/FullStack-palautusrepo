import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const Part = (props) => {
  console.log(props)
  return (
  <div>
  <p>
    {props.name} {props.count} {props.unit}
  </p>
  </div>
  )
}

const Results = (props) => {
  return (
  <div>
  <Part name={props.parts[0].name} count={props.parts[0].count}/>
  <Part name={props.parts[1].name} count={props.parts[1].count}/>
  <Part name={props.parts[2].name} count={props.parts[2].count}/>
  <Part name={props.parts[3].name} count={props.parts[3].count}/>
  <Part name={props.parts[4].name} count={props.parts[4].count}/>
  <Part name={props.parts[5].name} count={props.parts[5].count} unit={props.parts[5].unit}/>
  </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral +bad
  const average = (good - bad) / all
  const positive = (good / all)*100

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  const results = {
    parts: [
      {
        name: 'good',
        count: good
      },
      {
        name: 'neutral',
        count: neutral
      },
      {
        name: 'bad',
        count: bad
      },
      {
        name: 'all',
        count: all
      },
      {
        name: 'average',
        count: average
      },
      {
        name: 'positive',
        count: positive,
        unit: '%'
      }
    ]
  }

  return (
    <div>
      <header>give feedback</header>
      <Button handleClick = {addGood}
      text="good"
      />
      <Button handleClick = {addNeutral}
      text="neutral"
      />
      <Button handleClick = {addBad}
      text="bad"
      />
      <header>statistics</header>
      <Results parts={results.parts} />
    </div>
  )
}

export default App