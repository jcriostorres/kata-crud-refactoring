package co.com.sofka.crud.todo_tarea;

import co.com.sofka.crud.todo_tarea.Todo;
import co.com.sofka.crud.todo_tarea.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

@Service
public class TodoService {

    private static final String DEFAULT = "Default";;
    @Autowired
    private TodoRepository repository;

    public Iterable<Todo> list(){

        return repository.findAll();
    }

    public Todo save(Todo todo){
        valideOf(todo);
        if (Objects.nonNull(todo.getId())) {   // para actualizar
        }
        return repository.save(todo);
    }
    private void valideOf(Todo todo) {
        try {
            Objects.requireNonNull(todo, "El nombre que esta tratando de guardar es nulo: ' (");
            var name = Objects.requireNonNull(todo.getName(), "El nombre no puede ser nulo");
            valideLongAllow(name);
            var groupListId = Optional.ofNullable(todo.getGroupListId()).orElse(DEFAULT);
            todo.setGroupListId(groupListId);
        } catch (RuntimeException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,exception.getMessage());
        }
    }

    private void valideLongAllow(String name) {
        if (name.length() < 3 || name.length() > 100) {
            throw new IllegalArgumentException("Se permiten caracteres de 3 hasta 100");

        }
    }

    public void delete(Long id){

        repository.delete(get(id));
    }

    public Todo get(Long id){

        return repository.findById(id).orElseThrow();
    }

}
