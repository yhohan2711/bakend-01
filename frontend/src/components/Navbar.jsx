import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { AdminService } from '../services/adminService';
import logo from '../logo.svg';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        AdminService.logout();
        navigate('/login');
    };

    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: () => navigate('/dashboard')
        },
        {
            label: 'Clientes',
            icon: 'pi pi-users',
            command: () => navigate('/clientes')
        },
        {
            label: 'Administradores',
            icon: 'pi pi-id-card',
            command: () => navigate('/administradores')
        },
        {
            label: 'Salir',
            icon: 'pi pi-power-off',
            command: handleLogout
        }
    ];

    const start = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img alt="logo" src={logo} height="40" className="mr-2" style={{ padding: '5px' }} />
            <span style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary-color)' }}>
                Óptica Digital
            </span>
        </div>
    );

    return (
        <div style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--surface-card)' }}>
            <Menubar
                model={items}
                start={start}
                style={{
                    border: 'none',
                    background: 'transparent',
                    borderRadius: 0,
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            />
        </div>
    );
}

export default Navbar;
