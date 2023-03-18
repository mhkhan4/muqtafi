package com.GMPU.muqtafi.repository;

import com.GMPU.muqtafi.dto.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
