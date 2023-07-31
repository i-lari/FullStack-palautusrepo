import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filterWord, handler }) => {
  return (
    <div>Find countries <input value={filterWord} onChange={handler} /> </div>
  )
}

const Country = ({ country }) => {
  if (country !== null) {
    const languages = Object.values(country.languages).map(a => <li key={a}> {a}</li>)
    return (
      <div>
        <h2> {country.name.common} </h2>
        <p>capital {country.capital}</p>
        <p>area {country.area} </p>
        <h3>languages:</h3>
        <ul>{languages}</ul>
        <img src={country.flags.png} />
      </div>
    )
  } else return null
}

const Countries = ({ countries, country}) => {
  if (!countries) { return null } else {
    if (countries.length == 1) {
      return (
        <Country country={country} />
      )
    } else if (countries.length <= 10) {
      const list = countries.map(a => <div key={a}> <p>{a}</p> <button onClick={() => console.log('show' + a)}>show</button> </div>)
      return (
        <div>{list}</div>
      )
    } else return (<div>Too many matches, specify another filter</div>)
  }
}


function App() {
  const [countries, setCountries] = useState(null)
  const [filterWord, setFilterWord] = useState('')
  const [showCountry, setShowCountry] = useState(null)

  const handleFilter = (event) => {
    event.preventDefault()
    setFilterWord(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(initialCountries => {
        setCountries(initialCountries.data.map(a => a.name.common))
      })
  }, [])

  const countriesToShow = countries ? countries
    .filter(a => a.toLowerCase().includes(filterWord.toLowerCase())) : []


  if (countriesToShow[0] != null && (countriesToShow.length == 1 && (
    (!showCountry) || countriesToShow[0] != showCountry.name.common))) {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countriesToShow[0]}`)
      .then(response =>
        setShowCountry(response.data)
      )
  }

  return (
    <div>
      <Filter filterWord={filterWord} handler={handleFilter} />
      <Countries countries={countriesToShow}
        filterWord={filterWord}
        country={showCountry}
      />
    </div>
  );
}

export default App;
