import React,{ useEffect,useContext} from 'react';
import {Store} from '../context/TodoContext';

const HOST_API = "http://localhost:8081/api";

const ListTarea = ({idTarea})=>{

    const { dispatch, state: {todo}} = useContext(Store);

    const currentList = todo.list;

    const currentListTareas= currentList.filter(tarea => tarea.groupListId != null && tarea.groupListId ==idTarea)


    useEffect(() =>{

        fetch(HOST_API + "/todos")
        .then(response => response.json())
        .then((list)=>{
            dispatch({ type: "update-list"})
        })
    }, [dispatch]);

    const onDelete = (id) => {
        fetch(HOST_API + "/"+ id+ "/todo",{
            method: "DELETE"
        }).then((list)=>{

            dispatch({type: "delete-item", id})
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
            <table >
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Tarea</td>
                        <td>¿Completado?</td>
                    </tr>
                </thead>
                <tbody>
                    {/* Filter de las tareas que no tienen id relacionado (Tareas)*/}
                    {currentListTareas.map((todo) => {
                        return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
                            <td>{todo.id}</td>
                            <td>{todo.name}</td>
                            <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
                            <td><button className="btn btn-outline-danger" onClick={() => onDelete(todo.id)}>Eliminar</button></td>
                            <td><button className="btn btn-outline-secondary" onClick={() => onEdit(todo)}>Editar</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    }
    
    export default ListTarea;

