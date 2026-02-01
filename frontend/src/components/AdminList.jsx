import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { AdminService } from '../services/adminService';

const AdminList = () => {
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = React.useRef(null);

    useEffect(() => {
        loadAdministradores();
    }, []);

    const loadAdministradores = async () => {
        try {
            setLoading(true);
            const data = await AdminService.getAdministradores();
            setAdmins(data);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los administradores', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    const header = (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="m-0">Administradores</h2>
            <Button label="Nuevo Admin" icon="pi pi-plus" onClick={() => navigate('/administradores/nuevo')} />
        </div>
    );

    const rolBodyTemplate = (rowData) => {
        const rolMap = {
            'admin': { label: 'Super Admin', severity: 'danger' },
            'empleado': { label: 'Empleado', severity: 'info' }
        };
        const rolInfo = rolMap[rowData.rol] || { label: rowData.rol, severity: 'secondary' };
        return <Tag value={rolInfo.label} severity={rolInfo.severity} />;
    };

    const statusBodyTemplate = (rowData) => {
        // Por ahora todos están activos, se puede agregar lógica de estado después
        return <Tag value="Activo" severity="success" />;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button icon="pi pi-pencil" rounded text severity="info" tooltip="Editar" />
                <Button icon="pi pi-lock" rounded text severity="warning" tooltip="Cambiar permisos" />
            </div>
        );
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background-color)' }}>
            <Navbar />
            <Toast ref={toast} />
            <div className="container" style={{ marginTop: '2rem' }}>
                <div className="card">
                    <DataTable
                        value={admins}
                        header={header}
                        tableStyle={{ minWidth: '50rem' }}
                        loading={loading}
                        emptyMessage="No hay administradores registrados."
                    >
                        <Column field="nombre" header="Usuario" sortable></Column>
                        <Column field="email" header="Email" sortable></Column>
                        <Column field="rol" header="Rol" body={rolBodyTemplate}></Column>
                        <Column header="Estado" body={statusBodyTemplate}></Column>
                        <Column body={actionBodyTemplate} header="Acciones"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default AdminList;
