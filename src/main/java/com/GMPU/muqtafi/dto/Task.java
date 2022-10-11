package com.GMPU.muqtafi.dto;

import lombok.Data;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data
public class Task {

    @Id
    @SequenceGenerator(
            name = "taskId_squence",
            sequenceName = "taskId_squence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "taskId_squence"
    )
    private long taskId;
    private String taskName;
    private String taskDescription;
    private boolean learning;
    private boolean working;
    private boolean ready;
    private boolean progress;
    private boolean done;

    //user
    @ManyToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "userId"
    )
    private User user;

    //idea
    @ManyToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "idea_id",
            referencedColumnName = "ideaId"
    )
    private Idea id;


}
