import React from 'react';
import {StoreProvider} from './context/TodoContext'
import FormTarea from './components/FormTarea'
import ListTarea from './components/ListTarea'
import FormSubtarea from './components/FormSubtarea';

import img from './todo.jpg'


function App() {
  return <StoreProvider>
    <div className="continer"> 
      <img className="fotoperfil" src={img}/>
      <h1>To-Do List</h1>
      <div className="gestion">
        <h3 className="mb-3">Agregue tareas para hacer... </h3>
        <FormTarea />
        
        <ListTarea />
      </div>
    </div>
   
  </StoreProvider>

}

export default App;

