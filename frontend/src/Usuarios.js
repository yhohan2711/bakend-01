import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { UsuarioService } from './services/usuarioService';
import classNames from 'classnames';

const Usuarios = () => {
    let emptyUsuario = {
        id: null,
        nombre: '',
        email: ''
    };

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioDialog, setUsuarioDialog] = useState(false);
    const [deleteUsuarioDialog, setDeleteUsuarioDialog] = useState(false);
    const [usuario, setUsuario] = useState(emptyUsuario);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        UsuarioService.getUsuarios()
            .then(data => {
                setUsuarios(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("No se pudieron cargar los usuarios", error);
                // Datos de prueba
                setUsuarios([
                    { id: 1, nombre: 'Usuario Prueba 1', email: 'test1@example.com' },
                    { id: 2, nombre: 'Usuario Prueba 2', email: 'test2@example.com' }
                ]);
                setLoading(false);
            });
    }, []);

    const openNew = () => {
        setUsuario(emptyUsuario);
        setSubmitted(false);
        setUsuarioDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUsuarioDialog(false);
    };

    const hideDeleteUsuarioDialog = () => {
        setDeleteUsuarioDialog(false);
    };

    const saveUsuario = () => {
        setSubmitted(true);

        if (usuario.nombre.trim()) {
            let _usuarios = [...usuarios];
            let _usuario = { ...usuario };

            if (usuario.id) {
                // Actualizar existente
                UsuarioService.updateUsuario(_usuario).then(response => {
                    // Si el backend devuelve el objeto actualizado, úsalo. Si no, usa local.
                    const index = findIndexById(usuario.id);
                    _usuarios[index] = _usuario;
                    setUsuarios(_usuarios);
                    toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Usuario Actualizado', life: 3000 });
                }).catch(e => {
                    // Fallback local por si el backend falla
                    const index = findIndexById(usuario.id);
                    _usuarios[index] = _usuario;
                    setUsuarios(_usuarios);
                    toast.current.show({ severity: 'warn', summary: 'Atención', detail: 'Actualizado localmente (Backend falló)', life: 3000 });
                });
            } else {
                // Crear nuevo
                UsuarioService.createUsuario(_usuario).then(response => {
                    // Asumiendo que el backend devuelve el ID generado. 
                    // Si no, generamos uno temporal
                    _usuario.id = response && response.id ? response.id : createId();
                    _usuarios.push(_usuario);
                    setUsuarios(_usuarios);
                    toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Usuario Creado', life: 3000 });
                }).catch(e => {
                    // Fallback local
                    _usuario.id = createId();
                    _usuarios.push(_usuario);
                    setUsuarios(_usuarios);
                    toast.current.show({ severity: 'warn', summary: 'Atención', detail: 'Creado localmente (Backend falló)', life: 3000 });
                });
            }

            setUsuarioDialog(false);
            setUsuario(emptyUsuario);
        }
    };

    const editUsuario = (usuario) => {
        setUsuario({ ...usuario });
        setUsuarioDialog(true);
    };

    const confirmDeleteUsuario = (usuario) => {
        setUsuario(usuario);
        setDeleteUsuarioDialog(true);
    };

    const deleteUsuario = () => {
        UsuarioService.deleteUsuario(usuario.id).then(() => {
            let _usuarios = usuarios.filter(val => val.id !== usuario.id);
            setUsuarios(_usuarios);
            toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Usuario Eliminado', life: 3000 });
        }).catch(e => {
            // Fallback local
            let _usuarios = usuarios.filter(val => val.id !== usuario.id);
            setUsuarios(_usuarios);
            toast.current.show({ severity: 'warn', summary: 'Atención', detail: 'Eliminado localmente (Backend falló)', life: 3000 });
        });

        setDeleteUsuarioDialog(false);
        setUsuario(emptyUsuario);
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _usuario = { ...usuario };
        _usuario[name] = val;

        setUsuario(_usuario);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Nuevo" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editUsuario(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteUsuario(rowData)} />
            </React.Fragment>
        );
    };

    const usuarioDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" onClick={saveUsuario} />
        </React.Fragment>
    );

    const deleteUsuarioDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUsuarioDialog} />
            <Button label="Si" icon="pi pi-check" severity="danger" onClick={deleteUsuario} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={usuarios} loading={loading}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuarios">
                    <Column field="id" header="ID" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="nombre" header="Nombre" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="email" header="Email" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={usuarioDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalles de Usuario" modal className="p-fluid" footer={usuarioDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nombre" className="font-bold">Nombre</label>
                    <InputText id="nombre" value={usuario.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !usuario.nombre })} />
                    {submitted && !usuario.nombre && <small className="p-error">El nombre es requerido.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email" className="font-bold">Email</label>
                    <InputText id="email" value={usuario.email} onChange={(e) => onInputChange(e, 'email')} />
                </div>
            </Dialog>

            <Dialog visible={deleteUsuarioDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmar" modal footer={deleteUsuarioDialogFooter} onHide={hideDeleteUsuarioDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {usuario && (
                        <span>
                            ¿Estás seguro de que quieres eliminar a <b>{usuario.nombre}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

export default Usuarios;
