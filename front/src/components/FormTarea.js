
import React, {useContext, useRef, useState} from "react";
import {Store} from '../contex/TodoContex';

const HOST_API = "http://localhost:8081/api";


const FormTarea = (props) => {
    const formRef = useRef(null);

    const {dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);


    const onAdd = (event) => {
        event.preventDefault();

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
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((todo) => {
                dispatch({ type: "add-item", item: todo });
                setState({ name: "" });
                formRef.current.reset();
            });
    };

    const onEdit = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: item.id,
            isCompleted: item.isCompleted,
        };

        fetch(HOST_API + "/todo", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((todo) => {
                dispatch({ type: "update-item", item: todo });
                setState({ name: "" });
                formRef.current.reset();
            });
    };

    return (
        <form ref={formRef}>
            <p>FORMULARIO TAREA</p>
            <div class="mb-3">
            <input
                type="text"
                name="name"
                placeholder="¿Qué piensas hacer hoy?"
                defaultValue={item.name}
                onChange={(event) => {
                    setState({ ...state, name: event.target.value });
                }}></input>
            </div>
            <div class= "mb-3">

            {item.id && <button onClick={onEdit} class="btn btn-outline-info"> Actualizar </button>}
            {!item.id && <button onClick={onAdd}> Crear tarea </button>}
            </div>
        </form>
        
    );
};

export default FormTarea;