import React, { useEffect, useContext, useState } from 'react'
import { Store } from '../context/TodoContext';
import FormSubtarea from './FormSubtarea';
import ListSubTarea from './ListSubTarea';

const HOST_API = "http://localhost:8081/api";
const ListTarea = () => {
    const { dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.list;
    const currentListTareas= currentList.filter(tarea => tarea.groupListId == null)


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
            const currentListSubTareas = currentList.filter(tarea => tarea.groupListId != null && tarea.groupListId == id)

            currentListSubTareas.forEach(element => {
                console.log(element.id)
                onDeletesubtares(element.id)
            });

        })
    };


    const onDeletesubtares = (id) => {
        fetch(HOST_API + "/" + id + "/todo", {
            method: "DELETE"
        }).then((list) => {
            dispatch({ type: "delete-item", id })
        })
    };


    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo })
    };

    const onChange = (event, todo) => {
        const request = {
            name: todo.name,
            id: todo.id,
            completed: event.target.checked
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
            });
    };

    const decorationDone = {
        textDecoration: 'line-through'
    };
    return <div>

        {/* Filter de las tareas que no tienen id relacionado (Tareas)*/}


        {currentListTareas.map((todo) => {

            return (       

                <div class="card card-list">
                    <h4 class="card-header name-todo">{todo.name} <i class="far fa-trash-alt delete-tarea" onClick={() => onDelete(todo.id)}></i></h4>
                        <div class="card-body">
                        <FormSubtarea idTarea={todo.id}  />
                        <ListSubTarea idTarea={todo.id}/>
                    </div>
                    
                </div>

            
            )
        })}

        {/* Traer subTareas relacionadas*/}



    </div>
}

export default ListTarea;