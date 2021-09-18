package co.com.sofka.crud.entities;

import org.hibernate.validator.constraints.Length;
import javax.persistence.*;
import javax.persistence.Table;

@Entity
@Table(name="tareas")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //@Length(min=3, max=100)
    private String task;
    private boolean completed;
    private String groupListId;

//    @ManyToOne()
//    @JoinColumn(name = "id")
//    //private Lista lista;


    public Todo(){

    }
    public Todo(Long id, String task, boolean completed, String groupListId) {
        this.id = id;
        this.task = task;
        this.completed = completed;
        this.groupListId = groupListId;
    }

    public String getGroupListId() {
        return groupListId;
    }

    public void setGroupListId(String groupListId) {
        this.groupListId = groupListId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
