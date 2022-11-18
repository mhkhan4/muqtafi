package com.GMPU.muqtafi.repository;

import com.GMPU.muqtafi.dto.Idea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaRepository extends JpaRepository<Idea, Long> {

    @Query("select i.ideaId from Idea i")
    List<Long> getAllTheIdsInTheTable();
}