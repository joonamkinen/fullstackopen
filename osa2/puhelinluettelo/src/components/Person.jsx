const Filter = ({ value, onChange }) => {
    return (
      <div>
        Filter shown with: <input value={value} onChange={onChange} />
      </div>
    )
  }
  
  const PersonForm = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }
  
  const Persons = ({ persons, searchName, onDelete }) => {
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(searchName.toLowerCase())
    )
  
    return (
      <ul>
        {filteredPersons.map((person, index) => (
          <li key={index}>
            {person.name} {person.number}
            <button onClick={() => onDelete(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    )
  }

  export {Filter, PersonForm ,Persons}