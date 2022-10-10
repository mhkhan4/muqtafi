package com.GMPU.muqtafi.dto;

import lombok.Data;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data
@Embeddable
public class Tasks {

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
    private long task_id;

    private String task_name;

    private String task_description;

    @Embedded
    private Ideas ideas;
}
