import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function AddContact() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { store, actions } = useGlobalReducer();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (id) {
            const contact = store.contacts.find(c => c.id == id);
            if (contact) setForm(contact);
        }
    }, [id, store.contacts]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const validateForm = () => {
        if (!form.name.trim()) {
            setError("El nombre es requerido");
            return false;
        }
        if (!form.email.trim()) {
            setError("El email es requerido");
            return false;
        }
        if (!form.phone.trim()) {
            setError("El teléfono es requerido");
            return false;
        }
        if (!form.address.trim()) {
            setError("La dirección es requerida");
            return false;
        }
        return true;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        let result;
        if (id) {
            result = await actions.updateContact(id, form);
        } else {
            result = await actions.addContact(form);
        }

        if (result.success) {
            setSuccess(`Contacto ${id ? "actualizado" : "creado"} correctamente`);
            setTimeout(() => navigate("/contacts"), 1000);
        } else {
            setError(result.error || "Error desconocido");
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1>{id ? "Editar contacto" : "Añadir contacto"}</h1>

            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError("")}></button>
                </div>
            )}

            {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <i className="fa-solid fa-circle-check me-2"></i>
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Nombre *</label>
                    <input
                        className="form-control"
                        name="name"
                        placeholder="Juan Pérez"
                        value={form.name}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email *</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="juan@ejemplo.com"
                        value={form.email}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Teléfono *</label>
                    <input
                        className="form-control"
                        name="phone"
                        placeholder="+56 9 1234 5678"
                        value={form.phone}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Dirección *</label>
                    <input
                        className="form-control"
                        name="address"
                        placeholder="Calle Principal 123"
                        value={form.address}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </div>

                <button className="btn btn-success" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Guardando...
                        </>
                    ) : (
                        id ? "✓ Guardar cambios" : "✓ Crear contacto"
                    )}
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/contacts")} disabled={loading}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}