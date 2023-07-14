import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const StatisticLine = (props) => {
//  console.log(props)
  return (
    <div>
      <p>
        {props.name} {props.value} {props.unit}
      </p>
    </div>
  )
}

const Statistics = (props) => {
  if (props.StatisticLines[0].value == 0 && props.StatisticLines[1].value == 0 && props.StatisticLines[2].value == 0) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    )
  }
  const lis = props.StatisticLines.map(a => <li key={a.name}> <StatisticLine name={a.name} value={a.value} unit={a.unit}/> </li>)
  return (
    <div>
      <ul>{lis}</ul>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  const statistics = {
    StatisticLines: [
      {
        name: 'good',
        value: good
      },
      {
        name: 'neutral',
        value: neutral
      },
      {
        name: 'bad',
        value: bad
      },
      {
        name: 'all',
        value: all
      },
      {
        name: 'average',
        value: average
      },
      {
        name: 'positive',
        value: positive,
        unit: '%'
      }
    ]
  }

  return (
    <div>
      <header>give feedback</header>
      <Button handleClick={addGood}
        text="good"
      />
      <Button handleClick={addNeutral}
        text="neutral"
      />
      <Button handleClick={addBad}
        text="bad"
      />
      <header>statistics</header>
      <Statistics StatisticLines={statistics.StatisticLines} />
    </div>
  )
}

export default App