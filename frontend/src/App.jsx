import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import LoginAdmin from './components/LoginAdmin';
import AdminDashboard from './components/AdminDashboard';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';
import ClientEdit from './components/ClientEdit';
import AdminList from './components/AdminList';
import AdminForm from './components/AdminForm';

// Styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginAdmin />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<AdminDashboard />} />

                {/* Rutas de Clientes */}
                <Route path="/clientes" element={<ClientList />} />
                <Route path="/clientes/nuevo" element={<ClientForm />} />
                <Route path="/clientes/editar/:id" element={<ClientEdit />} />

                {/* Rutas de Administradores */}
                <Route path="/administradores" element={<AdminList />} />
                <Route path="/administradores/nuevo" element={<AdminForm />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
