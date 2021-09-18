import React from "react";
import {StoreProvider} from './context/TodoContext'
import FormTarea from './components/FormTarea'
import ListTarea from './components/ListTarea'
import FormList from './components/FormList'



function App() {
    return <StoreProvider>
            <h3> To - Do List </h3> 
            <FormTarea />
            {/*lista solo las tareas */}
            <ListTarea />
        </StoreProvider>
    
}

export default App;
