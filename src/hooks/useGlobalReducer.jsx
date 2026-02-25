import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    const actions = {
        // Obtener todos los contactos
        getContacts: async () => {
            const resp = await fetch("https://playground.4geeks.com/contact/agendas/DevAnd7/contacts");
            const data = await resp.json();

            const contacts = Array.isArray(data) ? data : data.contacts || [];
            dispatch({ type: "set_contacts", payload: contacts });
        },

        // Crear un contacto
        addContact: async (contact) => {
    const payload = {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address
    };

    try {
        const resp = await fetch("https://playground.4geeks.com/contact/agendas/DevAnd7/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await resp.json();
        console.log("Response status:", resp.status);
        console.log("Response data:", data);

        if (!resp.ok) {
            throw new Error(data.msg || data.message || JSON.stringify(data) || "Error creando contacto");
        }

        await actions.getContacts();
        return { success: true };
    } catch (error) {
        console.error("Error completo:", error);
        return { success: false, error: error.message };
    }
},

        // Actualizar un contacto
        updateContact: async (id, contact) => {
            const payload = {
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                address: contact.address
            };

            try {
                const resp = await fetch(`https://playground.4geeks.com/contact/agendas/DevAnd7/contacts/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                const data = await resp.json();
                console.log("Response status:", resp.status);
                console.log("Response data:", data);

                if (!resp.ok) {
                    throw new Error(data.msg || data.message || JSON.stringify(data) || "Error actualizando contacto");
                }

                await actions.getContacts();
                return { success: true };
            } catch (error) {
                console.error("Error:", error);
                return { success: false, error: error.message };
            }
        },

        // Eliminar un contacto
        deleteContact: async (id) => {
            try {
                const resp = await fetch(`https://playground.4geeks.com/contact/agendas/DevAnd7/contacts/${id}`, {
                    method: "DELETE"
                });

                if (!resp.ok) {
                    const error = await resp.json();
                    throw new Error(error.msg || "Error eliminando contacto");
                }

                await actions.getContacts();
                return { success: true };
            } catch (error) {
                console.error("Error:", error.message);
                return { success: false, error: error.message };
            }
        }
    };

    return (
        <StoreContext.Provider value={{ store, actions }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    return useContext(StoreContext);
}