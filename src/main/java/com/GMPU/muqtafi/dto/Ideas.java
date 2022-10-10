package com.GMPU.muqtafi.dto;

import lombok.Data;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data
@Embeddable
public class Ideas {

    @Id
    @SequenceGenerator(
            name = "ideaId_squence",
            sequenceName = "ideaId_squence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "ideaId_squence"
    )
    private long idea_id;

    private String idea_name;

    private String idea_description;
}
