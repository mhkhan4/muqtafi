package com.GMPU.muqtafi.controller;

import com.GMPU.muqtafi.dto.User;
import com.GMPU.muqtafi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public User saveUser(@Valid @RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping
    public List<User> fetchUserList() {
        return userRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public String deleteUserById(@PathVariable("id") Long userId) {
        userRepository.deleteById(userId);
        return "user deleted Successfully!!";
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable("id") Long userId,
                           @RequestBody User user) {
        User userDB = userRepository.findById(userId).get();
        if(Objects.nonNull(user.getUserName()) &&
                !"".equalsIgnoreCase(user.getUserName())) {
            userDB.setUserName(user.getUserName());
        }

        return userRepository.save(userDB);
    }
}
