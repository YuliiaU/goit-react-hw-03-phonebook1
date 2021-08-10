import React, { Component } from "react";

import Form from "./components/Form";
import Contacts from "./components/Contacts"
import Filter from "./components/Filter";

import shortid from 'shortid';

class App extends Component {
  state = {
    contacts: [
         {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }

  formSubmitHandler =({name,number})=> {
    const { contacts } = this.state;

      if (contacts.some(contact => contact.name === name)) {
      alert(
        `${name
          .split(' ')
          .map(string => string.charAt(0).toUpperCase() + string.slice(1))
          .join(
            ' ',
          )} is already in contacts. Change contact's name or delete old.`,
      );
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number
    };

    this.setState(({contacts}) => ({
      contacts:[contact,...contacts]
    }))
 }
 
  changeFilter = e => {
    this.setState({filter:e.currentTarget.value});
  }

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      contact => contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({contacts:parsedContacts});
    };
  
  };

  componentDidUpdate(prevProps, prevState) {
    
    if (this.state.contacts !== prevState.contacts) {
      console.log('Обновилось поле контактов');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  
  };

  render() {

    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <h1>Phonebook</h1>
        <Form onSubmit={ this.formSubmitHandler}/>
       
        <h2>Contacts</h2>
        <Filter value={filter} onChange={ this.changeFilter}/>
        
        <Contacts contacts={visibleContacts} onDeleteContacts={ this.deleteContact}/>
      </>
      
    )
  }


}

export default App;
