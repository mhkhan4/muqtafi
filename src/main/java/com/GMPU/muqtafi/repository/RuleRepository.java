package com.GMPU.muqtafi.repository;

import com.GMPU.muqtafi.dto.Rule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RuleRepository extends JpaRepository<Rule, Long> {

}
