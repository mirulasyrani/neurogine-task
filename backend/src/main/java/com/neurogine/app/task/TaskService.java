package com.neurogine.app.task;

import com.neurogine.app.task.dto.TaskRequest;
import com.neurogine.app.task.dto.TaskResponse;
import com.neurogine.app.user.User;
import com.neurogine.app.user.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class TaskService {
  private final TaskRepository taskRepository;
  private final UserRepository userRepository;

  public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
    this.taskRepository = taskRepository;
    this.userRepository = userRepository;
  }

  public Page<TaskResponse> list(String username, Optional<String> q, Optional<TaskStatus> status,
                                 int page, int size) {
    User owner = userRepository.findByUsername(username).orElseThrow();

    Specification<Task> spec = (root, query, cb) -> cb.equal(root.get("owner"), owner);
    if (q.isPresent()) {
      Specification<Task> qSpec = (root, query, cb) -> cb.like(cb.lower(root.get("title")), "%" + q.get().toLowerCase() + "%");
      spec = spec.and(qSpec);
    }
    if (status.isPresent()) {
      Specification<Task> sSpec = (root, query, cb) -> cb.equal(root.get("status"), status.get());
      spec = spec.and(sSpec);
    }

    return taskRepository.findAll(spec, PageRequest.of(page, size))
        .map(t -> new TaskResponse(t.getId(), t.getTitle(), t.getDescription(), t.getStatus(), t.getDueDate(), t.getCreatedAt(), t.getUpdatedAt()));
  }

  @Transactional
  public TaskResponse create(String username, TaskRequest req) {
    User owner = userRepository.findByUsername(username).orElseThrow();
    Task t = new Task();
    t.setTitle(req.getTitle());
    t.setDescription(req.getDescription());
    t.setStatus(req.getStatus());
    t.setDueDate(req.getDueDate());
    t.setOwner(owner);
    taskRepository.save(t);
    return new TaskResponse(t.getId(), t.getTitle(), t.getDescription(), t.getStatus(), t.getDueDate(), t.getCreatedAt(), t.getUpdatedAt());
  }

  @Transactional
  public TaskResponse update(String username, Long id, TaskRequest req) {
    Task t = getOwnedTask(username, id);
    t.setTitle(req.getTitle());
    t.setDescription(req.getDescription());
    t.setStatus(req.getStatus());
    t.setDueDate(req.getDueDate());
    return new TaskResponse(t.getId(), t.getTitle(), t.getDescription(), t.getStatus(), t.getDueDate(), t.getCreatedAt(), t.getUpdatedAt());
  }

  @Transactional
  public void delete(String username, Long id) {
    Task t = getOwnedTask(username, id);
    taskRepository.delete(t);
  }

  public TaskResponse get(String username, Long id) {
    Task t = getOwnedTask(username, id);
    return new TaskResponse(t.getId(), t.getTitle(), t.getDescription(), t.getStatus(), t.getDueDate(), t.getCreatedAt(), t.getUpdatedAt());
  }

  private Task getOwnedTask(String username, Long id) {
    User owner = userRepository.findByUsername(username).orElseThrow();
    return taskRepository.findById(id)
        .filter(t -> t.getOwner().getId().equals(owner.getId()))
        .orElseThrow(() -> new IllegalArgumentException("Task not found"));
  }
}
