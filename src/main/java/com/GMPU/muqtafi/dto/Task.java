package com.GMPU.muqtafi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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
    private String taskDescription;

    private boolean learning;
    private boolean working;

    @Embedded
    private Board board;

    //user
    @ManyToOne()
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "userId"
    )
    private User user;

    //idea
    @ManyToOne()
    @JoinColumn(
            name = "idea_id",
            referencedColumnName = "ideaId",
            nullable = false
    )
    private Idea idea;
}
