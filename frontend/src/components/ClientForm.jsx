import React, { useState } from 'react';
import Navbar from './Navbar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { ClienteService } from '../services/clienteService';

const ClientForm = () => {
    const navigate = useNavigate();
    const toast = React.useRef(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await ClienteService.createCliente(formData);
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Cliente registrado correctamente', life: 3000 });
            setTimeout(() => navigate('/clientes'), 1500);
        } catch (error) {
            const errorMsg = error.message || 'Error al registrar cliente';
            toast.current?.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background-color)' }}>
            <Navbar />
            <Toast ref={toast} />
            <div className="container" style={{ marginTop: '2rem', maxWidth: '800px' }}>
                <Card title="Registrar Nuevo Cliente" style={{ borderRadius: 'var(--radius)' }}>
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
                                    placeholder="Ej. Juan Perez"
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
                                    placeholder="juan@ejemplo.com"
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
                                    placeholder="+57 300 123 4567"
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
                                    placeholder="Calle 123 #45-67"
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
                                label={loading ? "Guardando..." : "Guardar Cliente"}
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

export default ClientForm;
