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

const Countries = ({ countries, filterWord, country, changeCountry }) => {
  if (!countries) { return null } else {
    const filteredCountries = countries.filter(a => a.toLowerCase().includes(filterWord.toLowerCase()))
    if (filteredCountries.length == 1 && (country === null || filteredCountries[0] != country.name.common)) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries[0]}`)
        .then(response =>
          changeCountry(response.data)
        )
    }
    if (filteredCountries.length == 1) {
      return (
        <Country country={country} />
      )

    } else if (filteredCountries.length <= 10) {
      const list = filteredCountries.map(a => <p key={a}>{a}</p>)
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
  const changeCountry = (newCountry) => {
    if (showCountry === null || showCountry.name.common !== newCountry.name.common) {
      setShowCountry(newCountry)
    }
  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(initialCountries => {
        setCountries(initialCountries.data.map(a => a.name.common))
      })
  }, [])

  return (
    <div>
      <Filter filterWord={filterWord} handler={handleFilter} />
      <Countries countries={countries}
        filterWord={filterWord}
        country={showCountry}
        changeCountry={changeCountry} />
    </div>
  );
}

export default App;
