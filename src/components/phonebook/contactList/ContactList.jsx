

export const ContactList = ({ fiteredContacts,  handleDeleteClick}) => {
    return (
        <ul>
            {fiteredContacts.map(contact => {
                const { name, number, id } = contact;
                return (
                    <li key={id} style={{fontSize: "20px"}}>
                        {name}: {number}
                        <button
                            type="button"
                            name={name}
                            onClick={() => handleDeleteClick(id)}
                            style={{marginLeft: "12px"}}
                        >
                            Delete
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};