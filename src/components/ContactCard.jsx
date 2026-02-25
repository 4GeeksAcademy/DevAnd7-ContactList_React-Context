import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";

export default function ContactCard({ contact }) {
    const { actions } = useGlobalReducer();
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        const result = await actions.deleteContact(contact.id);
        setShowModal(false);
        if (!result.success) {
            alert("Error: " + result.error);
        }
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    return (
        <>
            <DeleteModal
                show={showModal}
                contactName={contact.name}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            <div className="list-group-item list-group-item-action mb-3 p-3 rounded shadow-sm">

                <div className="d-flex">
                    {/* Imagen */}
                    <img
                        src="https://i.pravatar.cc/150?img=12"
                        className="rounded-circle me-3"
                        width="80"
                        height="80"
                    />

                    {/* Info */}
                    <div className="flex-grow-1">
                        <h5 className="mb-1">{contact.name}</h5>
                        <p className="mb-1">
                            <i className="fa-solid fa-location-dot me-2"></i>
                            {contact.address}
                        </p>
                        <p className="mb-1">
                            <i className="fa-solid fa-phone me-2"></i>
                            {contact.phone}
                        </p>
                        <p className="mb-1">
                            <i className="fa-solid fa-envelope me-2"></i>
                            {contact.email}
                        </p>
                    </div>

                    {/* Botones */}
                    <div className="d-flex flex-column justify-content-between">
                        <Link to={`/edit/${contact.id}`} className="text-primary">
                            <i className="fa-solid fa-pencil"></i>
                        </Link>

                        <button
                            className="btn text-danger p-0"
                            onClick={handleDeleteClick}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}