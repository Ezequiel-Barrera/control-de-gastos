import { useState } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto}) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    

    const ocultarModal = () => {
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if([nombre, cantidad, categoria].includes('')) {
            setMensaje('todos los campos son obligatorios')
            setTimeout(() => {
                setMensaje('')
            }, 3000)
            return; 
        }
        guardarGasto({nombre, cantidad, categoria})
    }   

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />
            </div>

            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
                >
                <legend>Nuevo Gasto</legend>
                {mensaje && <Mensaje tipo={'error'}>{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor="nombre">nombre del gasto</label>
                    <input 
                        id='nombre'
                        type='text'
                        placeholder='añadir nombre del gasto'
                        value={nombre}
                        onChange={ e => setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">monto del gasto</label>
                    <input 
                        id='cantidad'
                        type='number'
                        placeholder='añadir monto del gasto, ej.: 300'
                        value={cantidad}
                        onChange={ e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">categoria del gasto</label>
                    <select
                        id='categoria'
                        value={categoria}
                        onChange={ e => setCategoria(e.target.value)}
                    >
                        <option value=''>-- seleccione --</option>
                        <option value='ahorra'>Ahorro</option>
                        <option value='alimentos'>Alimentos</option>
                        <option value='servicio'>Servicios</option>
                        <option value='gastos'>Gastos varios</option>
                        <option value='salud'>Saludos</option>
                    </select>
                </div>
                <input 
                    type='submit'
                    value='Añador Gasto'
                />
            </form>
        </div>
    )
}

export default Modal