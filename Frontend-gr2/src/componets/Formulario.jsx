import { useState } from "react"
import axios from 'axios'
import Mensaje from "./Alertas"

import { useNavigate } from 'react-router-dom'

export const Formulario = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        nombre:"",
        propietario:"",
        email:"",
        celular:"",
        convencional:"",
        sintomas:""
        })

    const [mensaje, setMensaje] = useState({})
        
    const handleChange = (e) => { 
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const hanldeSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`
            const options={
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const respuesta = await  axios.post(url,form,options)
            console.log(respuesta)

            setMensaje({ respuesta:"paciente registrado con exito y correo enviado al dueño", tipo: true })

            setTimeout(() => {
                navigate("/dashboard/listar")
            }, 3000);


        } catch (error) {
            console.log(error)

            setMensaje({ respuesta: error.response.data.msg, tipo: false })
        }
    }




    return (
        <form onSubmit={hanldeSubmit}>

                {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}


        <div>
            <label
                htmlFor='nombre:'
                className='text-gray-700 uppercase font-bold text-sm'>Nombre de la mascota: </label>
            <input
                id='nombre'
                type="text"
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                placeholder='nombre de la mascota'

                name='nombre'
                onChange={handleChange}
            />
        </div>
        <div>
            <label
                htmlFor='propietario:'
                className='text-gray-700 uppercase font-bold text-sm'>Nombre del propietario: </label>
            <input
                id='propietario'
                type="text"
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                placeholder='nombre del propietario'

                name='propietario'
                onChange={handleChange}
            />
        </div>
        <div>
            <label
                htmlFor='email:'
                className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
            <input
                id='email'
                type="email"
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                placeholder='email del propietario'

                name='email'
                onChange={handleChange}
            />
        </div>
        <div>
            <label
                htmlFor='celular:'
                className='text-gray-700 uppercase font-bold text-sm'>Celular: </label>
            <input
                id='celular'
                type="number"
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                placeholder='celular del propietario'

                name='celular'
                onChange={handleChange}
            />
        </div>
        <div>
            <label
                htmlFor='convencional:'
                className='text-gray-700 uppercase font-bold text-sm'>Convencional: </label>
            <input
                id='convencional'
                type="number"
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                placeholder='convencional del propietario'

                name='convencional'
                onChange={handleChange}
            />
        </div>
        <div>
            <label
                htmlFor='Salida:'
                className='text-gray-700 uppercase font-bold text-sm'>Fecha de salida: </label>
            <input
                id='salida'
                type="date"
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                placeholder='salida'

                name='salida'
                onChange={handleChange}
            />
        </div>
        <div>
            <label
                htmlFor='sintomas:'
                className='text-gray-700 uppercase font-bold text-sm'>Síntomas: </label>
            <textarea
                id='sintomas'
                type="text"
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                placeholder='Ingrese los síntomas de la mascota'
                name='sintomas'
                onChange={handleChange}
            />
        </div>

        <input
            type="submit"
            className='bg-gray-600 w-full p-3 
                text-slate-300 uppercase font-bold rounded-lg 
                hover:bg-gray-900 cursor-pointer transition-all'
            value='Registrar' />

    </form>
    )
}