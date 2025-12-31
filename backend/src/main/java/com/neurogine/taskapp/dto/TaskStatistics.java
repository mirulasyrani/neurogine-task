package com.neurogine.taskapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskStatistics {
    private Long totalTasks;
    private Map<String, Long> byStatus;
    private Map<String, Long> byPriority;
    private Long overdueTasksCount;
    private Long todayTasksCount;
    private Long weekTasksCount;
}
