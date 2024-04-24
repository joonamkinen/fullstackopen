import React, { useState, useEffect } from 'react';
import Weather from './components/weather';
import countryService from './services/services'

const Country = ({ country }) => {
  const { name, capital, population, languages, flag } = country;

  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h3>Languages:</h3>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language.name}</li>
        ))}
      </ul>
      <img src={flag} alt={`Flag of ${name}`} style={{ maxWidth: '200px' }} />
      <Weather capital={capital} />
    </div>
  );
};

const Countries = ({ countries, filter, handleClick }) => {
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  }

  if (filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map((country, index) => (
          <li key={index}>{country.name}
            <button onClick={() => handleClick(country)}>Show</button>
          </li>
        ))}
      </ul>
    );
  }

  return <p>Too many matches, specify another filter</p>;
};

const Filter = ({ value, onChange }) => {
  return (
    <div>
      Filter shown with: <input value={value} onChange={onChange} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('')


  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleClick = (country) => {
    setFilter(country.name)
  };

  useEffect(() => {
    countryService
      .getCountries()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, []);

  return (
    <div>
      <h1>Countries</h1>
      <Filter value={filter} onChange={handleFilter} />
      <Countries countries={countries} filter={filter} handleClick={handleClick} />
    </div>
  );
}

export default App;
