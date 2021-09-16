package co.com.sofka.crud.todo_tarea;

import co.com.sofka.crud.todo_tarea.Todo;
import org.springframework.data.repository.CrudRepository;

public interface TodoRepository extends CrudRepository<Todo, Long> {
}
