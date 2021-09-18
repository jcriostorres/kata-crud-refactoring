package co.com.sofka.crud.controllers;

import co.com.sofka.crud.entities.Todo;
import co.com.sofka.crud.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@RequestMapping("/api")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping(value = "/api/tareas")
    public Iterable<Todo> list(){
        return todoService.list();
    }

    @PostMapping(value = "/api/tareas")
    public Todo save(@RequestBody Todo todo){
        try {
            return todoService.save(todo);

        }catch(RuntimeException exception){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage());
        }

    }

    @PutMapping(value = "/api/tareas/{id}")
    public Todo update(@RequestBody Todo todo){
        if(todo.getId() != null){
            return todoService.save(todo);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "/api/tareas/{id}")
    public void delete(@PathVariable("id")Long id){
        todoService.delete(id);
    }

    @GetMapping(value = "/api/tareas/{id}")
    public Todo get(@PathVariable("id") Long id){
        return todoService.get(id);
    }

}
