import { useState } from 'react';
import contactsData from './contacts.json'
import "./App.css";

function App() {
  const [showContact, setShowContact] = useState(contactsData.slice(0, 5));
  const [contact, setContact] = useState(showContact);
  const [trackRandomNumbers, setTrackRandomNumbers] = useState([]);

  const selectRandomNumber = () => {
    const min = 5;
    const max = contactsData.length;
    let randomSelectedNumber;

    do {
      randomSelectedNumber = Math.floor(Math.random() * (max - min)) + min
    } while (trackRandomNumbers.includes(randomSelectedNumber))

    setTrackRandomNumbers(prevTrackRandomNumbers => [...prevTrackRandomNumbers, randomSelectedNumber])
    return randomSelectedNumber
  }

  const chooseRandomContact = () => {
    let randomNumber =  selectRandomNumber();
    let randomContact = contactsData[randomNumber];
    setContact(prevContacts => [randomContact, ...prevContacts]);
  }

  const sortContactByName = () => {
    const sortedContacts = [...contact].sort((a, b) => a.name.localeCompare(b.name));
    setContact(sortedContacts);
  }

  const sortContactByPopularity = () => {
    const sortedContacts = [...contact].sort((a, b) => b.popularity - a.popularity);
    setContact(sortedContacts);
  } 

  const deleteContact = contactId => {
    const filterOutContact = contact.filter(contact => {
      return contact.id !== contactId;
    });
    setContact(filterOutContact);
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={chooseRandomContact}>Add Random Contact</button>
      <button onClick={sortContactByName}>Sort By Name</button>
      <button onClick={sortContactByPopularity}>Sort By Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {contact.map((contct) => {
            return (
              <tr key={contct.id}>
                <td><img className='ImageContact' src={contct.pictureUrl} alt={contct.name}/></td>
                <td>{contct.name}</td>
                <td>{contct.popularity.toFixed(2)}</td>
                <td>{contct.wonOscar ? '🏆' : ''}</td>
                <td>{contct.wonEmmy ? '🌟' : ''}</td>
                <td><button onClick={() => deleteContact(contct.id)}>Remove</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
