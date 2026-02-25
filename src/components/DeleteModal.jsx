import { useEffect } from "react";

export default function DeleteModal({ show, contactName, onConfirm, onCancel }) {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [show]);

    if (!show) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-danger text-white">
                        <h5 className="modal-title">⚠️ Confirmar eliminación</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onCancel}></button>
                    </div>

                    <div className="modal-body">
                        <p>
                            ¿Estás seguro de que deseas eliminar a <strong>{contactName}</strong>?
                        </p>
                        <p className="text-muted small">Esta acción no se puede deshacer.</p>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>
                            ✓ Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
