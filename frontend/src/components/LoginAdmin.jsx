import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import { AdminService } from '../services/adminService';

const LoginAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await AdminService.login(username, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    const header = (
        <div style={{ height: '150px', background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)', borderTopLeftRadius: 'var(--radius)', borderTopRightRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="pi pi-eye" style={{ fontSize: '4rem', color: 'white' }}></i>
        </div>
    );

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'var(--background-color)'
        }}>
            <Card header={header} style={{ width: '400px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
                <div className="text-center mb-5">
                    <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Bienvenido</h2>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Inicia sesión para gestionar el sistema</p>
                </div>

                {error && (
                    <Message severity="error" text={error} style={{ width: '100%', marginBottom: '1rem' }} />
                )}

                <form onSubmit={handleLogin} className="flex flex-column gap-4">
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Usuario</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '100%' }}
                            placeholder="Ingrese su usuario"
                        />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Contraseña</label>
                        <InputText
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%' }}
                            placeholder="••••••••"
                        />
                    </div>
                    <Button
                        label={loading ? "Ingresando..." : "Ingresar"}
                        type="submit"
                        icon={loading ? "pi pi-spin pi-spinner" : "pi pi-arrow-right"}
                        iconPos="right"
                        style={{ width: '100%', background: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}
                        disabled={loading}
                    />
                </form>
            </Card>
        </div>
    );
};

export default LoginAdmin;
