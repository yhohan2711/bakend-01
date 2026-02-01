import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { ClienteService } from '../services/clienteService';
import { AdminService } from '../services/adminService';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalClientes: 0,
        totalAdmins: 0,
        nuevosEsteMes: 0
    });
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        loadStats();
        const user = AdminService.getCurrentUser();
        setCurrentUser(user);
    }, []);

    const loadStats = async () => {
        try {
            const clientes = await ClienteService.getClientes();
            const admins = await AdminService.getAdministradores();

            // Calcular clientes nuevos este mes
            const now = new Date();
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const nuevos = clientes.filter(c => {
                if (!c.fechaRegistro) return false;
                const fecha = new Date(c.fechaRegistro);
                return fecha >= firstDayOfMonth;
            }).length;

            setStats({
                totalClientes: clientes.length,
                totalAdmins: admins.length,
                nuevosEsteMes: nuevos
            });
        } catch (error) {
            console.error("Error al cargar estadísticas:", error);
        }
    };

    const statsData = [
        { title: 'Clientes Total', value: stats.totalClientes, icon: 'pi pi-users', color: 'var(--primary-color)' },
        { title: 'Nuevos este mes', value: stats.nuevosEsteMes, icon: 'pi pi-user-plus', color: 'var(--secondary-color)' },
        { title: 'Administradores', value: stats.totalAdmins, icon: 'pi pi-shield', color: '#8b5cf6' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background-color)' }}>
            <Navbar />
            <div className="container" style={{ marginTop: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ marginBottom: '0.5rem' }}>Panel de Control</h2>
                    {currentUser && (
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                            Bienvenido, <strong>{currentUser.nombre}</strong> ({currentUser.rol})
                        </p>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    {statsData.map((stat, i) => (
                        <Card key={i} style={{ borderRadius: 'var(--radius)', borderLeft: `5px solid ${stat.color}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{stat.title}</p>
                                    <h3 style={{ fontSize: '2rem', margin: '0' }}>{stat.value}</h3>
                                </div>
                                <div style={{
                                    width: '3rem', height: '3rem', borderRadius: '50%',
                                    background: `${stat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: stat.color
                                }}>
                                    <i className={stat.icon} style={{ fontSize: '1.5rem' }}></i>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                    <Card title="Accesos Rápidos" className="h-full">
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Button label="Nuevo Cliente" icon="pi pi-plus" onClick={() => navigate('/clientes/nuevo')} />
                            <Button label="Ver Clientes" icon="pi pi-users" severity="info" onClick={() => navigate('/clientes')} />
                            <Button label="Gestión Admin" icon="pi pi-cog" severity="secondary" onClick={() => navigate('/administradores')} />
                        </div>
                    </Card>
                    <Card title="Sistema" className="h-full">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'var(--background-color)', borderRadius: '8px' }}>
                                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Base de datos</p>
                                <p style={{ margin: '0.5rem 0 0 0', fontWeight: 600 }}>MySQL - Conectado</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'var(--background-color)', borderRadius: '8px' }}>
                                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Backend API</p>
                                <p style={{ margin: '0.5rem 0 0 0', fontWeight: 600 }}>Tomcat - Activo</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
