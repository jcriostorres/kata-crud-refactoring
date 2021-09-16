package co.com.sofka.crud.todo_tarea;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
//import co.com.sofka.crud.services.TodoServiceInterface;
//import co.com.sofka.crud.entities.Todo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api")
public class TodoController {

    @Autowired
    private TodoService service;

    @GetMapping(value = "/list")
    public Iterable<Todo> list() {
        try {
            return service.list();
        } catch (Error e) {
            return (Iterable<Todo>) e;
        }
    }
    
    @PostMapping(value = "/save")
    public Todo save(@RequestBody Todo todo){
        try {
        return service.save(todo);

        }catch(RuntimeException exception){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage());
        }

    }


    @PutMapping(value = "/update")
    public Todo update(@RequestBody Todo todo){
        if(todo.getId() != null){
            return service.save(todo);
        }
        throw new RuntimeException("No existe el id para actualziar");
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable("id")Long id){
        service.delete(id);
    }

    @GetMapping(value = "/{id}")
    public Todo get(@PathVariable("id") Long id){
        return service.get(id);
    }

}
