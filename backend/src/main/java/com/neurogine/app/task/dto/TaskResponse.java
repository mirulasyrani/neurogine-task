package com.neurogine.app.task.dto;

import com.neurogine.app.task.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class TaskResponse {
  private Long id;
  private String title;
  private String description;
  private TaskStatus status;
  private LocalDate dueDate;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
