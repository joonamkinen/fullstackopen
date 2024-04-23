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

export default Persons