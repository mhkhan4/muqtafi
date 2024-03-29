package com.GMPU.muqtafi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rule {

    @Id
    @SequenceGenerator(
            name = "ruleId_squence",
            sequenceName = "ruleId_squence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "ruleId_squence"
    )
    private long ruleId;

    private String ruleDescription;
}
