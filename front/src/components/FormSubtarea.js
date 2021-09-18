import React, { useContext, useRef, useState } from 'react';
import { Store } from '../context/TodoContext';


const HOST_API = "http://localhost:8081/api";

const FormSubtarea = (props) => {
    const formRef = useRef(null);
    //useContext: obtener el contenido del contexto
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);
    const [showform, setShowform] = useState(false);

    //Crear nueva tarea
    const onAdd = (event) => {
        event.preventDefault();
        console.log(props.idTarea + "Tarea")

        const request = {
            name: state.name,
            id: null,
            completed: false,
            groupListId: props.idTarea
        };
        console.log(request.groupListId + "request")
        setState(request);

        console.log(request);

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
                formRef.current.reset();
            });
    }

    const onEdit = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: item.id,
            isCompleted: item.isCompleted,
            groupListId: props.idTarea
        };


        fetch(HOST_API + "/todo", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                dispatch({ type: "update-item", item: todo });
                setState({ name: "" });
                formRef.current.reset();
            });
    }

    return (

        <>
            <div className="agregar-sub">
                <p>Agregar {showform ? <i class="fas fa-minus-circle fa-2x add-icon" onClick={() => { setShowform(!showform) }}> </i> : <i class="fas fa-plus-circle fa-2x add-icon" onClick={() => { setShowform(!showform) }}></i>}</p>
            </div>
            {showform &&

                <div className="card subForm">
                    
                    <form ref={formRef}>
                        <div className="mb-2">
                            <input
                                class="form-control"
                                type="text"
                                name="name"
                                placeholder="¿Qué piensas hacer hoy?"
                                defaultValue={item.name}
                                required
                                onChange={(event) => {
                                    setState({ ...state, name: event.target.value })
                                }}  ></input>
                        </div>

                        {item.id && <button onClick={onEdit} class="btn btn-primary save">Actualizar</button>}
                        {!item.id && <button onClick={onAdd} class="btn btn-primary save" >Enviar </button>}

                    </form>
                </div>
            }
        </>
    )
}

export default FormSubtarea;