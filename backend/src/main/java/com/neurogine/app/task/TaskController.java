package com.neurogine.app.task;

import com.neurogine.app.task.dto.TaskRequest;
import com.neurogine.app.task.dto.TaskResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
  private final TaskService taskService;

  public TaskController(TaskService taskService) {
    this.taskService = taskService;
  }

  @GetMapping
  public ResponseEntity<Page<TaskResponse>> list(Authentication auth,
                                                 @RequestParam Optional<String> q,
                                                 @RequestParam Optional<TaskStatus> status,
                                                 @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size) {
    return ResponseEntity.ok(taskService.list(auth.getName(), q, status, page, size));
  }

  @PostMapping
  public ResponseEntity<TaskResponse> create(Authentication auth, @Valid @RequestBody TaskRequest req) {
    return ResponseEntity.ok(taskService.create(auth.getName(), req));
  }

  @GetMapping("/{id}")
  public ResponseEntity<TaskResponse> get(Authentication auth, @PathVariable Long id) {
    return ResponseEntity.ok(taskService.get(auth.getName(), id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<TaskResponse> update(Authentication auth, @PathVariable Long id, @Valid @RequestBody TaskRequest req) {
    return ResponseEntity.ok(taskService.update(auth.getName(), id, req));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(Authentication auth, @PathVariable Long id) {
    taskService.delete(auth.getName(), id);
    return ResponseEntity.noContent().build();
  }
}
