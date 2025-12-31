package com.neurogine.app.task.dto;

import com.neurogine.app.task.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TaskRequest {
  @NotBlank
  @Size(min = 1, max = 200)
  private String title;

  private String description;

  private TaskStatus status = TaskStatus.PENDING;

  private LocalDate dueDate;
}
