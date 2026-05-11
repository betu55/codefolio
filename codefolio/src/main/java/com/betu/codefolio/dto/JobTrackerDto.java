package com.betu.codefolio.dto;

import com.betu.codefolio.model.JobTracker;
import com.betu.codefolio.model.Company;
import lombok.*;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobTrackerDto {

  private Long id;
  private String role;
  private Company company; // Can be null for freelance or self-employed roles
  private String employmentType;
  private String status;
  private String dateApplied;
  private String applicationDeadline;
  private String jobUrl;
  private List<String> updates; // List of status updates or notes related to the job application

  // Convert JobTracker entity to JobTrackerDto
  public static JobTrackerDto toDto(JobTracker jobTracker) {
    return JobTrackerDto.builder()
            .id(jobTracker.getId())
            .role(jobTracker.getRole())
            .company(jobTracker.getCompany())
            .employmentType(jobTracker.getEmploymentType())
            .status(jobTracker.getStatus())
            .dateApplied(jobTracker.getDateApplied())
            .applicationDeadline(jobTracker.getApplicationDeadline())
            .jobUrl(jobTracker.getJobUrl())
            .updates(jobTracker.getUpdates())
            .build();
  }
  

  // Convert JobTracker entity to JobTrackerDto
  public static JobTrackerDto fromEntity(JobTracker jobTracker) {
    return JobTrackerDto.builder()
            .id(jobTracker.getId())
            .role(jobTracker.getRole())
            .company(jobTracker.getCompany())
            .employmentType(jobTracker.getEmploymentType())
            .status(jobTracker.getStatus())
            .dateApplied(jobTracker.getDateApplied())
            .applicationDeadline(jobTracker.getApplicationDeadline())
            .jobUrl(jobTracker.getJobUrl())
            .updates(jobTracker.getUpdates())
            .build();
  }

  // Convert JobTrackerDto to JobTracker entity
  public static JobTracker toEntity(JobTrackerDto jobTrackerDto) {
    return JobTracker.builder()
            .id(jobTrackerDto.getId())
            .role(jobTrackerDto.getRole())
            .company(jobTrackerDto.getCompany())
            .employmentType(jobTrackerDto.getEmploymentType())
            .status(jobTrackerDto.getStatus())
            .dateApplied(jobTrackerDto.getDateApplied())
            .applicationDeadline(jobTrackerDto.getApplicationDeadline())
            .jobUrl(jobTrackerDto.getJobUrl())
            .updates(jobTrackerDto.getUpdates())
            .build();
  }
}
