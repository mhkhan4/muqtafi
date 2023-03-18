package com.GMPU.muqtafi.controller;

import com.GMPU.muqtafi.dto.Board;
import com.GMPU.muqtafi.dto.Idea;
import com.GMPU.muqtafi.dto.Task;
import com.GMPU.muqtafi.dto.User;
import com.GMPU.muqtafi.repository.IdeaRepository;
import com.GMPU.muqtafi.repository.TaskRepository;
import com.GMPU.muqtafi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.json.simple.JSONObject;

import java.util.UUID;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("api/tasks")
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IdeaRepository ideaRepository;

    @GetMapping
    public List<Task> fetchTaskList() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task saveTask(@Valid @RequestBody Task task) {
        Board board = new Board();
        try{
            User thisUser = userRepository.findById(task.getUser().getUserId()).get();
            board.setReady(true);
            board.setProgress(false);
            board.setDone(false);

            task.setUser(thisUser);
            task.setBoard(board);
        } catch (Exception e){
            System.out.println("user id not valid");
            board.setReady(false);
            board.setProgress(false);
            board.setDone(false);

            task.setBoard(board);
        }

        try {
            Idea thisIdea = ideaRepository.findById(task.getIdea().getIdeaId()).get();
            task.setIdea(thisIdea);
        } catch (Exception e){
            System.out.println("idea id not valid");
        }

        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public String deleteTaskById(@PathVariable("id") Long taskId) {
        taskRepository.deleteById(taskId);
        return "task deleted Successfully!!";
    }

    @PutMapping("/{taskId}")
    public Task updateTask(@PathVariable("taskId") Long taskId,
                           @RequestBody Task task) {
        Task taskDB = taskRepository.findById(taskId).get();

        User thisUser = userRepository.findById(task.getUser().getUserId()).orElse(null);

        taskDB.setUser(thisUser);

        if (thisUser != null) {
            Board board = new Board();
            board.setReady(true);
            board.setProgress(false);
            board.setDone(false);

            taskDB.setBoard(board);
        }
        return taskRepository.save(taskDB);
    }

    @GetMapping("/board")
    public JSONObject getIdeaIds(){
        List<Task> taskList = taskRepository.findAll();

        ArrayList<JSONObject> ready = new ArrayList<>();
        ArrayList<JSONObject> progress = new ArrayList<>();
        ArrayList<JSONObject> done = new ArrayList<>();

        for(Task task : taskList){
            if (task.getUser() != null) {
                if (task.getBoard().isReady()) {
                    JSONObject tempObj = new JSONObject();
                    String[] tempArr = {task.getTaskDescription(), task.getUser().getUserName(), task.getIdea().getIdeaName(), String.valueOf(task.isLearning())};
                    tempObj.put("id", String.valueOf(task.getTaskId()));
                    tempObj.put("content", tempArr); //might need to change later
                    ready.add(tempObj);
                }
                if (task.getBoard().isProgress()) {
                    JSONObject tempObj = new JSONObject();
                    String[] tempArr = {task.getTaskDescription(), task.getUser().getUserName(), task.getIdea().getIdeaName(), String.valueOf(task.isLearning())};
                    tempObj.put("id", String.valueOf(task.getTaskId()));
                    tempObj.put("content", tempArr); //might need to change later
                    progress.add(tempObj);
                }
                if (task.getBoard().isDone()) {
                    JSONObject tempObj = new JSONObject();
                    String[] tempArr = {task.getTaskDescription(), task.getUser().getUserName(), task.getIdea().getIdeaName(), String.valueOf(task.isLearning())};
                    tempObj.put("id", String.valueOf(task.getTaskId()));
                    tempObj.put("content", tempArr); //might need to change later
                    done.add(tempObj);
                }
            }
        }
        JSONObject obj = new JSONObject();

        String readyId = "1";
        JSONObject readyObj = new JSONObject();
        readyObj.put("name", "To Do");
        readyObj.put("items", ready);
        obj.put(readyId, readyObj);

        String progressId = "2";
        JSONObject progressObj = new JSONObject();
        progressObj.put("name", "In progress");
        progressObj.put("items", progress);
        obj.put(progressId, progressObj);

        String doneId = "3";
        JSONObject doneObj = new JSONObject();
        doneObj.put("name", "Done");
        doneObj.put("items", done);
        obj.put(doneId, doneObj);

        return obj;
    }

    @PutMapping("board/{taskId}")
    public Task updateBoard(@PathVariable("taskId") Long taskId,
                           @RequestBody Task task) {
        Task taskDB = taskRepository.findById(taskId).get();
        Board board = new Board();
        board.setReady(task.getBoard().isReady());
        board.setProgress(task.getBoard().isProgress());
        board.setDone(task.getBoard().isDone());

        taskDB.setBoard(board);

        return taskRepository.save(taskDB);
    }
}
