import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { ClienteService } from '../services/clienteService';
import ClientDelete from './ClientDelete';

const ClientList = () => {
    const navigate = useNavigate();
    const [globalFilter, setGlobalFilter] = useState('');
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = React.useRef(null);

    useEffect(() => {
        loadClientes();
    }, []);

    const loadClientes = async () => {
        try {
            setLoading(true);
            const data = await ClienteService.getClientes();
            setClients(data);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los clientes', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, nombre) => {
        try {
            await ClienteService.deleteCliente(id);
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: `Cliente ${nombre} eliminado`, life: 3000 });
            loadClientes(); // Recargar lista
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el cliente', life: 3000 });
        }
    };

    const header = (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="m-0">Clientes</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
                </span>
                <Button label="Nuevo" icon="pi pi-plus" severity="success" onClick={() => navigate('/clientes/nuevo')} />
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button icon="pi pi-pencil" rounded text severity="info" onClick={() => navigate(`/clientes/editar/${rowData.id}`)} />
                <ClientDelete clientName={rowData.nombre} onDelete={() => handleDelete(rowData.id, rowData.nombre)} />
            </div>
        );
    };

    const dateBodyTemplate = (rowData) => {
        if (!rowData.fechaRegistro) return '-';
        const date = new Date(rowData.fechaRegistro);
        return date.toLocaleDateString('es-ES');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background-color)' }}>
            <Navbar />
            <Toast ref={toast} />
            <div className="container" style={{ marginTop: '2rem' }}>
                <div className="card">
                    <DataTable
                        value={clients}
                        header={header}
                        globalFilter={globalFilter}
                        paginator
                        rows={10}
                        emptyMessage="No hay clientes encontrados."
                        loading={loading}
                    >
                        <Column field="nombre" header="Nombre" sortable></Column>
                        <Column field="email" header="Email" sortable></Column>
                        <Column field="telefono" header="Teléfono"></Column>
                        <Column field="fechaRegistro" header="Fecha Registro" body={dateBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} header="Acciones" style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default ClientList;
