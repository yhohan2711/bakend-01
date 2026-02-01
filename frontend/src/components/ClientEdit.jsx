import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate, useParams } from 'react-router-dom';
import { ClienteService } from '../services/clienteService';

const ClientEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const toast = React.useRef(null);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
    });

    useEffect(() => {
        loadClienteData();
    }, [id]);

    const loadClienteData = async () => {
        try {
            setLoadingData(true);
            const cliente = await ClienteService.getClienteById(id);
            if (cliente) {
                setFormData({
                    nombre: cliente.nombre || '',
                    email: cliente.email || '',
                    telefono: cliente.telefono || '',
                    direccion: cliente.direccion || ''
                });
            } else {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Cliente no encontrado', life: 3000 });
                setTimeout(() => navigate('/clientes'), 2000);
            }
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el cliente', life: 3000 });
        } finally {
            setLoadingData(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await ClienteService.updateCliente(id, formData);
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado correctamente', life: 3000 });
            setTimeout(() => navigate('/clientes'), 1500);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar cliente', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--background-color)' }}>
                <Navbar />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <ProgressSpinner />
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background-color)' }}>
            <Navbar />
            <Toast ref={toast} />
            <div className="container" style={{ marginTop: '2rem', maxWidth: '800px' }}>
                <Card title="Editar Cliente" style={{ borderRadius: 'var(--radius)' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label htmlFor="nombre" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Nombre Completo *</label>
                                <InputText
                                    name="nombre"
                                    id="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Correo Electrónico *</label>
                                <InputText
                                    name="email"
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label htmlFor="telefono" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Teléfono</label>
                                <InputText
                                    name="telefono"
                                    id="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                    disabled={loading}
                                />
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <label htmlFor="direccion" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Dirección</label>
                                <InputText
                                    name="direccion"
                                    id="direccion"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <Button
                                label="Cancelar"
                                type="button"
                                severity="secondary"
                                onClick={() => navigate('/clientes')}
                                icon="pi pi-times"
                                disabled={loading}
                            />
                            <Button
                                label={loading ? "Actualizando..." : "Actualizar"}
                                type="submit"
                                icon={loading ? "pi pi-spin pi-spinner" : "pi pi-check"}
                                severity="info"
                                disabled={loading}
                            />
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default ClientEdit;
