import React, { useState } from 'react';
import Navbar from './Navbar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { AdminService } from '../services/adminService';

const AdminForm = () => {
    const navigate = useNavigate();
    const toast = React.useRef(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        usuario: '',
        email: '',
        password: '',
        rol: null
    });

    const roles = [
        { name: 'Super Admin', code: 'admin' },
        { name: 'Empleado', code: 'empleado' }
    ];

    const handleChange = (e) => {
        if (e.target.name) {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    const handleRolChange = (e) => {
        setFormData(prev => ({ ...prev, rol: e.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.rol) {
            toast.current?.show({ severity: 'warn', summary: 'Advertencia', detail: 'Debe seleccionar un rol', life: 3000 });
            return;
        }

        setLoading(true);

        try {
            const adminData = {
                usuario: formData.usuario,
                email: formData.email,
                password: formData.password,
                rol: formData.rol.code
            };

            await AdminService.createAdministrador(adminData);
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Administrador creado correctamente', life: 3000 });
            setTimeout(() => navigate('/administradores'), 1500);
        } catch (error) {
            const errorMsg = error.message || 'Error al crear administrador';
            toast.current?.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background-color)' }}>
            <Navbar />
            <Toast ref={toast} />
            <div className="container" style={{ marginTop: '2rem', maxWidth: '600px' }}>
                <Card title="Nuevo Administrador" style={{ borderRadius: 'var(--radius)' }}>
                    <form onSubmit={handleSubmit} className="flex flex-column gap-4">
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="usuario" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Nombre de Usuario *</label>
                            <InputText
                                name="usuario"
                                id="usuario"
                                value={formData.usuario}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email *</label>
                            <InputText
                                name="email"
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                                placeholder="admin@opticadigital.com"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Contraseña *</label>
                            <InputText
                                name="password"
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label htmlFor="rol" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Rol *</label>
                            <Dropdown
                                value={formData.rol}
                                onChange={handleRolChange}
                                options={roles}
                                optionLabel="name"
                                placeholder="Seleccione un Rol"
                                style={{ width: '100%' }}
                                disabled={loading}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <Button
                                label="Cancelar"
                                type="button"
                                severity="secondary"
                                onClick={() => navigate('/administradores')}
                                disabled={loading}
                            />
                            <Button
                                label={loading ? "Creando..." : "Crear Usuario"}
                                type="submit"
                                icon={loading ? "pi pi-spin pi-spinner" : "pi pi-check"}
                                disabled={loading}
                            />
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AdminForm;
