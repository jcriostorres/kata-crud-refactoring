
import React, { useContext, useRef, useState } from 'react';
import { Store } from '../context/TodoContext';
import { useForm } from 'react-hook-form'



const HOST_API = "http://localhost:8081/api";

const FormTarea = () => {
    const formRef = useRef(null);
    //useContext: obtener el contenido del contexto
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);

    const [showform, setShowform] = useState(false);
    const [required, setRequired] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    //Crear nueva tarea
    const onAdd = (data, e) => {
        e.preventDefault();

        const request = {
            name: data.name,
            id: null,
        };
        fetch(HOST_API + "/todo", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {

                dispatch({ type: "add-item", item: todo });
                setState({ name: "" });
    
            });

        setRequired(false);

    }
    return (

        <>
            <div className="mb-3">
                <button onClick={() => { setShowform(!showform) }} className="btn btn-primary">Agregue aqui {showform ? <i class="fas fa-minus icon-more"></i> : <i class="fas fa-plus icon-more"></i>}</button>
            </div>
            < div className="content-form">
                {showform &&
                    <div className="card card-form">

                        <div class="card-body">

                            <form onSubmit={handleSubmit(onAdd)}>
                                <input type="text" name="name" className="form-control" placeholder="Nueva Categoria"{...register('name', { required: true, message: "Campo requerido" })} />
                                <span className="text-danger text-small d-block mb-1">
                                    {errors.name?.type === 'required' && "El campo es requerido"}
                                </span>

                                <button className="btn btn-primary save d-block mb-3">Guardar Categoria </button>
                            </form>


                            <form ref={formRef}>
                                <div className="mb-1">
                                    <input class="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Nueva tarea"
                                        onChange={(event) => {
                                            setState({ ...state, name: event.target.value })
                                        }}  ></input>
                                </div>
<button onClick={onAdd} className="btn btn-primary save d-block mb-3">Guardar tarea </button>
                                
                            </form>
                        </div>
                        {required && <p>El campo es obligatorio</p>}
                    </div>


                }



            </ div>
        </>
    )
}

export default FormTarea;