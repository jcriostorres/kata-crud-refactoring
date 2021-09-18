import React, { useEffect, useContext } from 'react'
import { Store } from '../context/TodoContext';

const HOST_API = "http://localhost:8081/api";
const ListSubTarea = ({ idTarea }) => {
    const { dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.list;

    const currentListSubTareas = currentList.filter(tarea => tarea.groupListId != null && tarea.groupListId == idTarea)


    useEffect(() => {
        fetch(HOST_API + "/todos")
            .then(response => response.json())
            .then((list) => {
                dispatch({ type: "update-list", list })
            })
    }, [dispatch]);


    const onDelete = (id) => {
        fetch(HOST_API + "/" + id + "/todo", {
            method: "DELETE"
        }).then((list) => {
            dispatch({ type: "delete-item", id })


        })
    };


    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo })
    };

    const onChange = (todo) => {
        const request = {
            name: todo.name,
            id: todo.id,
            completed: !todo.completed,
            groupListId: idTarea
        };

        console.log(request)
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
            });
    };

    const decorationDone = {
        textDecoration: 'line-through'
    };
    return (
        <div>

            <div className="row align-items-start content-form">
                <div class="col-sm-2 option-border">
                    <p>Completada</p>
                </div>
                <div class="col-sm-5 option-border">
                    <p>Tarea</p>
                </div>
                <div class="col-sm-1 option-border">
                    <p>Opciones</p>
                </div>
            </div>

            {/* Filter de las tareas que no tienen id relacionado (Tareas)*/}
            {currentListSubTareas.map((todo) => {
                return (
                    <div className="row align-items-start content-form">
                        <div class="col-sm-2">
                            {todo.completed ? <i class="fas fa-check-circle  fa-2x icon-done" onClick={() => onChange(todo)}></i> :
                                <i class="far fa-check-circle fa-2x icont-notdone" onClick={() => onChange(todo)}></i>}
                        </div>
                        <div class="col-sm-5">
                            {todo.name}
                        </div>
                        <div class="col-sm-1">
                            <button className="btn btn-outline-danger" onClick={() => onDelete(todo.id)}>Eliminar</button>
                        </div>
                        <div class="col-sm-1">
                            <button className="btn btn-outline-secondary" onClick={() => onEdit(todo)}>Editar</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListSubTarea;