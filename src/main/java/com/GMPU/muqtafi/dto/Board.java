package com.GMPU.muqtafi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Board {
    private boolean ready;
    private boolean progress;
    private boolean done;
}
