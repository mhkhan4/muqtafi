package com.GMPU.muqtafi.controller;

import com.GMPU.muqtafi.dto.Rule;
import com.GMPU.muqtafi.repository.RuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/rules")
public class RuleController {

    @Autowired
    private RuleRepository ruleRepository;

    @PostMapping
    public Rule saveRule(@Valid @RequestBody Rule rule) {
        return ruleRepository.save(rule);
    }

    @GetMapping
    public List<Rule> fetchRuleList() {
        return ruleRepository.findAll();
    }
}
