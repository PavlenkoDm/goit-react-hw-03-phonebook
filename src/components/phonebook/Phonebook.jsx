import React, { Component } from 'react';
import shortid from 'shortid';
import { ContactForm } from 'components/index';
import { Filter } from 'components/index';
import { ContactList } from 'components/index';
import { setToLocaleStorage, getFromLocaleStorage } from 'components/index';

export class Phonebook extends Component {
    static KEY_FOR_CONTACTS = 'CONTACTS_KEY'

    state = {
        contacts: [],
        filter: '',
    };

    componentDidMount() {
        const dataFromLocaleStorage = getFromLocaleStorage(Phonebook.KEY_FOR_CONTACTS);
        if (!dataFromLocaleStorage) {
            return;
        }
        this.setState({contacts: dataFromLocaleStorage});
    }

    componentDidUpdate() {
        setToLocaleStorage(Phonebook.KEY_FOR_CONTACTS, this.state.contacts);
    }

    handleSubmit = data => {
        const { contacts } = this.state;
        const isInContacts = contacts.some(
            ({ name }) => name.toLowerCase() === data.name.toLowerCase()
        );

        if (isInContacts) {
            alert(`${data.name} is already in contacts`);
            return;
        }

        this.setState(prevState => {
            const { contacts } = prevState;
            const newContact = {
                id: shortid.generate(),
                name: data.name,
                number: data.number,
            };

            return { contacts: [newContact, ...contacts]}
        });
    };

    handleFilterChange = event => {
        this.setState({ filter: event.currentTarget.value });
    };

    handleDeleteClick = id => {
        this.setState(prevState => {
            return ({contacts: prevState.contacts.filter(contact => contact.id !== id)});
        });
    };

    getFilteredContacts = () => {
        const { contacts, filter } = this.state;
        const normalizeFilter = filter.toLocaleLowerCase().trim();
        return contacts.filter(({ name }) =>
            name.toLocaleLowerCase().includes(normalizeFilter)
        );
    };

    render() {
        const { filter } = this.state;
        const fiteredContacts = this.getFilteredContacts();


        return (
            <div>
                <h1>Phonebook</h1>

                <ContactForm onSubmit={this.handleSubmit} />

                <h2>Contacts</h2>

                <Filter
                    value={filter}
                    handleFilterChange={this.handleFilterChange}
                />

                <ContactList
                    fiteredContacts={fiteredContacts}
                    handleDeleteClick={this.handleDeleteClick}
                />
            </div>
        );
    }
}
