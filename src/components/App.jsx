import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      name,
      number,
      id: nanoid(),
    };

    //   this.setState(({ contacts }) => {
    //     if (
    //       contacts.find(
    //         contact => contact.name.toLowerCase() === name.toLowerCase()
    //       )
    //     ) {
    //       return alert(`${name} is already in contacts!`);
    //     }

    //     return {
    //       contacts: [contact, ...contacts],
    //     };
    //   });
    // };

    const existing = this.state.contacts.find(
      ({ name }) => name === contact.name
    );

    if (existing) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  onChangeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  currentContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  DeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
          <h2>Contacts</h2>
          <Filter filter={this.state.filter} onChange={this.onChangeFilter} />
          <ContactList
            contacts={this.currentContacts()}
            onDeleteContact={this.DeleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
