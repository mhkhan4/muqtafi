package com.GMPU.muqtafi.dto;

import lombok.Data;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data
public class User {

    @Id
    @SequenceGenerator(
            name = "userId_squence",
            sequenceName = "userId_squence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "userId_squence"
    )
    private long userId;

    private String userName;
}
