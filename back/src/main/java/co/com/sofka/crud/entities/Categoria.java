package co.com.sofka.crud.entities;
import javax.persistence.*;
import java.util.List;

@Table(name="categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name ="id")
    private Long id;

    @Column(name="name")
    private String name;


    @OneToMany(mappedBy = "listas", cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="id_todo")
    private List<Todo>tareas;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Todo> getTareas() {
        return tareas;
    }

    public void setTareas(List<Todo> tareas) {
        this.tareas = tareas;
    }

}


