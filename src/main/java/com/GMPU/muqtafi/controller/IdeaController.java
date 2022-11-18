package com.GMPU.muqtafi.controller;

import com.GMPU.muqtafi.dto.Idea;
import com.GMPU.muqtafi.dto.Task;
import com.GMPU.muqtafi.dto.User;
import com.GMPU.muqtafi.repository.IdeaRepository;
import com.GMPU.muqtafi.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("api/ideas")
@CrossOrigin("*")
public class IdeaController {

    @Autowired
    private IdeaRepository ideaRepository;

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Idea> fetchIdeaList() {
        return ideaRepository.findAll();
    }

    @GetMapping("/id")
    public List<Long> getIdeaIds(){
        return ideaRepository.getAllTheIdsInTheTable();
    }

    @GetMapping("/{id}")
    public List<Task> fetchTaskListByIdeaId(@PathVariable("id") Long ideaId) {
        List<Task> tasks = taskRepository.findAll();
        List<Task> newTasks = new ArrayList<>();

        for(int i = 0; i < tasks.size(); i++){
            if(tasks.get(i).getIdea() != null) {
                if (tasks.get(i).getIdea().getIdeaId() == ideaId) {
                    newTasks.add(tasks.get(i));
                }
            }
            else{
                System.out.println("idea is null");
            }
        }
        return newTasks;
    }

    @PostMapping
    public Idea saveIdea(@Valid @RequestBody Idea idea) {
        return ideaRepository.save(idea);
    }

    @DeleteMapping("/{id}")
    public String deleteIdeaById(@PathVariable("id") Long ideaId) {
        ideaRepository.deleteById(ideaId);
        return "idea deleted Successfully!!";
    }

    @PutMapping("/{id}")
    public Idea updateIdea(@PathVariable("id") Long ideaId,
                           @RequestBody Idea idea) {
        Idea ideaDB = ideaRepository.findById(ideaId).get();

        if(Objects.nonNull(idea.getIdeaName()) &&
                !"".equalsIgnoreCase(idea.getIdeaName())) {
            ideaDB.setIdeaName(idea.getIdeaName());
        }

        if(Objects.nonNull(idea.getIdeaDescription()) &&
                !"".equalsIgnoreCase(idea.getIdeaDescription())) {
            ideaDB.setIdeaDescription(idea.getIdeaDescription());
        }

        return ideaRepository.save(ideaDB);
    }
}
