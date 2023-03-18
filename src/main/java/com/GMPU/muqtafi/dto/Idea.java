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
public class Idea {

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
    private long ideaId;

    private String ideaName;

    private String ideaDescription;
}
