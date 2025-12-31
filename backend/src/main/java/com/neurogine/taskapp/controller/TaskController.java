package com.neurogine.taskapp.controller;

import com.neurogine.taskapp.dto.TaskRequest;
import com.neurogine.taskapp.dto.TaskStatistics;
import com.neurogine.taskapp.model.Task;
import com.neurogine.taskapp.model.User;
import com.neurogine.taskapp.repository.TaskRepository;
import com.neurogine.taskapp.repository.UserRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    
    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);
    
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
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setCategory(request.getCategory());
        task.setTags(request.getTags());
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
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setCategory(request.getCategory());
        task.setTags(request.getTags());
        
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
    
    @GetMapping("/search")
    public ResponseEntity<List<Task>> searchTasks(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String category,
            Authentication auth) {
        
        logger.info("Search tasks - user: {}, query: {}, status: {}, priority: {}, category: {}", 
                    auth.getName(), query, status, priority, category);
        
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Task> tasks;
        
        if (query != null && !query.isBlank()) {
            tasks = taskRepository.searchTasks(user, query);
        } else if (status != null) {
            tasks = taskRepository.findByUserAndStatusOrderByCreatedAtDesc(user, Task.TaskStatus.valueOf(status));
        } else if (priority != null) {
            tasks = taskRepository.findByUserAndPriorityOrderByCreatedAtDesc(user, Task.TaskPriority.valueOf(priority));
        } else if (category != null) {
            tasks = taskRepository.findByUserAndCategoryOrderByCreatedAtDesc(user, category);
        } else {
            tasks = taskRepository.findByUserOrderByCreatedAtDesc(user);
        }
        
        return ResponseEntity.ok(tasks);
    }
    
    @GetMapping("/statistics")
    public ResponseEntity<TaskStatistics> getStatistics(Authentication auth) {
        logger.info("Get statistics for user: {}", auth.getName());
        
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        TaskStatistics stats = new TaskStatistics();
        stats.setTotalTasks(taskRepository.count());
        
        Map<String, Long> byStatus = new HashMap<>();
        for (Task.TaskStatus status : Task.TaskStatus.values()) {
            byStatus.put(status.name(), taskRepository.countByUserAndStatus(user, status));
        }
        stats.setByStatus(byStatus);
        
        Map<String, Long> byPriority = new HashMap<>();
        for (Task.TaskPriority priority : Task.TaskPriority.values()) {
            byPriority.put(priority.name(), taskRepository.countByUserAndPriority(user, priority));
        }
        stats.setByPriority(byPriority);
        
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfToday = now.toLocalDate().atStartOfDay();
        LocalDateTime endOfToday = startOfToday.plusDays(1);
        LocalDateTime endOfWeek = startOfToday.plusWeeks(1);
        
        stats.setTodayTasksCount((long) taskRepository.findByUserAndDueDateBetween(user, startOfToday, endOfToday).size());
        stats.setWeekTasksCount((long) taskRepository.findByUserAndDueDateBetween(user, now, endOfWeek).size());
        
        List<Task> allTasks = taskRepository.findByUserOrderByCreatedAtDesc(user);
        long overdueCount = allTasks.stream()
                .filter(t -> t.getDueDate() != null && t.getDueDate().isBefore(now) && 
                            t.getStatus() != Task.TaskStatus.COMPLETED)
                .count();
        stats.setOverdueTasksCount(overdueCount);
        
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories(Authentication auth) {
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(taskRepository.findDistinctCategoriesByUser(user));
    }
}
