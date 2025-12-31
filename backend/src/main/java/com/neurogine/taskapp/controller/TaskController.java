package com.neurogine.taskapp.controller;

import com.neurogine.taskapp.dto.TaskRequest;
import com.neurogine.taskapp.model.Task;
import com.neurogine.taskapp.model.User;
import com.neurogine.taskapp.repository.TaskRepository;
import com.neurogine.taskapp.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    
    public TaskController(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(Authentication auth) {
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(taskRepository.findByUserOrderByCreatedAtDesc(user));
    }
    
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskRequest request, Authentication auth) {
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setUser(user);
        
        return ResponseEntity.ok(taskRepository.save(task));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody TaskRequest request, 
                                          Authentication auth) {
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        
        if (!task.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }
        
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        
        return ResponseEntity.ok(taskRepository.save(task));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, Authentication auth) {
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        
        if (!task.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }
        
        taskRepository.delete(task);
        return ResponseEntity.ok().build();
    }
}
