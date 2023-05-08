import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const Filter = ({ searchQuery, handleSearchChange }) => {
  return (
    <div>
      Find countries: <input value={searchQuery} onChange={handleSearchChange} />
    </div>
  )
}

const CountryInfo = ({ country }) => {

  return(
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages).map((language, index) => (
        <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
    </div>
  )
}

const Countries =({ countries, searchQuery }) => {
  const filteredCountries = countries
  ? countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : []

if(searchQuery === '') {
  return null
}

if(filteredCountries.length > 10) {
  return <p>Too many matches, please specify</p>
}

if(filteredCountries.length === 1) {
  return <CountryInfo country={filteredCountries[0]} />
}

return (
  <div>
    {filteredCountries.map((country) => (
    <div key={country.name.common}>
      <span>{country.name.common}</span>
    </div>
    ))}
  </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
 
  useEffect(() => {
      console.log('fetching countries...')
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  const handleSearchChange = (ev) => {
    setSearchQuery(ev.target.value)
  }

  return (
    <div>
      <Filter searchQuery={searchQuery} handleSearchChange={handleSearchChange}/> 
      <Countries countries={countries} searchQuery={searchQuery}/>
    </div>
      
 
  )
}

export default App;
