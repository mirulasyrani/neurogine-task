package com.neurogine.taskapp.repository;

import com.neurogine.taskapp.model.Task;
import com.neurogine.taskapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserOrderByCreatedAtDesc(User user);
}
