import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";
import { Link } from "react-router-dom";

export default function Contact() {
    const { store, actions } = useGlobalReducer();

    useEffect(() => {
        actions.getContacts();
    }, []);

    return (
        <div className="container mt-4">

            {/* Encabezado con botón a la derecha */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="m-0">Contact List</h1>

                <Link to="/add" className="btn btn-success">
                    Add new contact
                </Link>
            </div>

            {/* Lista vacía */}
            {Array.isArray(store.contacts) && store.contacts.length === 0 && (
                <p>No contacts yet.</p>
            )}

            {/* Lista de contactos */}
            <div className="list-group">
                {Array.isArray(store.contacts) &&
                    store.contacts.map(contact => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))}
            </div>
        </div>
    );
}