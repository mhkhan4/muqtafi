package com.GMPU.muqtafi.controller;

import com.GMPU.muqtafi.dto.Rule;
import com.GMPU.muqtafi.repository.RuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Objects;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/rules")
@CrossOrigin("*")
public class RuleController {

    @Autowired
    private RuleRepository ruleRepository;

    @PostMapping
    public Rule saveRule(@Valid @RequestBody Rule rule) { return ruleRepository.save(rule); }

    @GetMapping
    public List<Rule> fetchRuleList() {
        return ruleRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public String deleteRuleById(@PathVariable("id") Long ruleId) {
        ruleRepository.deleteById(ruleId);
        return "Rule deleted Successfully!!";
    }

    @PutMapping("/{id}")
    public Rule updateRule(@PathVariable("id") Long ruleId,
                                       @RequestBody Rule rule) {
        Rule ruleDB = ruleRepository.findById(ruleId).get();
        if(Objects.nonNull(rule.getRuleDescription()) &&
                !"".equalsIgnoreCase(rule.getRuleDescription())) {
            ruleDB.setRuleDescription(rule.getRuleDescription());
        }

        return ruleRepository.save(ruleDB);
    }
}
