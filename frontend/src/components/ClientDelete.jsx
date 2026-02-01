import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const ClientDelete = ({ clientName, onDelete }) => {
    const [visible, setVisible] = useState(false);

    const checkDelete = () => {
        onDelete();
        setVisible(false);
    };

    const footer = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text p-button-secondary" />
            <Button label="Eliminar" icon="pi pi-trash" onClick={checkDelete} severity="danger" autoFocus />
        </div>
    );

    return (
        <>
            <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => setVisible(true)} tooltip="Eliminar Cliente" />
            <Dialog header="Confirmar Eliminación" visible={visible} style={{ width: '400px' }} footer={footer} onHide={() => setVisible(false)}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
                    <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '1rem' }} />
                    <span>¿Estás seguro de que deseas eliminar al cliente <b>{clientName}</b>?</span>
                    <small style={{ display: 'block', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>Esta acción no se puede deshacer.</small>
                </div>
            </Dialog>
        </>
    );
};

export default ClientDelete;
