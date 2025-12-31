package com.neurogine.taskapp.repository;

import com.neurogine.taskapp.model.Task;
import com.neurogine.taskapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserOrderByCreatedAtDesc(User user);
    
    List<Task> findByUserAndStatusOrderByCreatedAtDesc(User user, Task.TaskStatus status);
    
    List<Task> findByUserAndPriorityOrderByCreatedAtDesc(User user, Task.TaskPriority priority);
    
    List<Task> findByUserAndCategoryOrderByCreatedAtDesc(User user, String category);
    
    @Query("SELECT t FROM Task t WHERE t.user = :user AND " +
           "(LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.tags) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY t.createdAt DESC")
    List<Task> searchTasks(@Param("user") User user, @Param("search") String search);
    
    @Query("SELECT COUNT(t) FROM Task t WHERE t.user = :user AND t.status = :status")
    Long countByUserAndStatus(@Param("user") User user, @Param("status") Task.TaskStatus status);
    
    @Query("SELECT COUNT(t) FROM Task t WHERE t.user = :user AND t.priority = :priority")
    Long countByUserAndPriority(@Param("user") User user, @Param("priority") Task.TaskPriority priority);
    
    @Query("SELECT t FROM Task t WHERE t.user = :user AND t.dueDate BETWEEN :start AND :end ORDER BY t.dueDate ASC")
    List<Task> findByUserAndDueDateBetween(@Param("user") User user, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    
    @Query("SELECT DISTINCT t.category FROM Task t WHERE t.user = :user AND t.category IS NOT NULL")
    List<String> findDistinctCategoriesByUser(@Param("user") User user);
}
