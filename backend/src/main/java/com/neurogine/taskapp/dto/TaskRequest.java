package com.neurogine.taskapp.dto;

import com.neurogine.taskapp.model.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TaskRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotNull(message = "Status is required")
    private Task.TaskStatus status = Task.TaskStatus.PENDING;
    
    @NotNull(message = "Priority is required")
    private Task.TaskPriority priority = Task.TaskPriority.MEDIUM;
    
    private LocalDateTime dueDate;
    
    private String category;
    
    private String tags;
}
