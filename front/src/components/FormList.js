import React, { useContext, useRef, useState } from 'react';
import { Store } from '../contex/TodoContex';

const HOST_API = "http://localhost:8081/api";


const FormList = () => {
    const formRef = useRef(null);

    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);


    const onAdd = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: null,
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

                dispatch({ type: "add-item", item: todo });
                setState({ name: "" });
                formRef.current.reset();
            });

    }

    return (
        <>
            <form ref={formRef}>
                <div className="mb-3">
                    <input class="form-control"
                        type="text"
                        name="name"
                        placeholder="Nueva lista To-Do"
                        defaultValue={item.name}
                        onChange={(event) => {
                            setState({ ...state, name: event.target.value })
                        }} ></input>

                </div>
                <div className="mb-3">
                    {<button onClick={onAdd} class="btn btn-outline-info">Nueva tarea</button>}

                </div>
            </form>
        </>
    )
}

export default FormList;



