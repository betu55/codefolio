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
  private String location;
  private String employmentType;
  private String jobLevel;
  private String status;
  private String dateApplied;
  private String applicationDeadline;
  private String jobUrl;
  private String companyUrl;
  private List<String> updates; // List of status updates or notes related to the job application

  // Convert JobTracker entity to JobTrackerDto
  public static JobTrackerDto toDto(JobTracker jobTracker) {
    return JobTrackerDto.builder()
            .id(jobTracker.getId())
            .role(jobTracker.getRole())
            .company(jobTracker.getCompany())
            .location(jobTracker.getLocation())
            .employmentType(jobTracker.getEmploymentType())
            .jobLevel(jobTracker.getJobLevel())
            .status(jobTracker.getStatus())
            .dateApplied(jobTracker.getDateApplied())
            .applicationDeadline(jobTracker.getApplicationDeadline())
            .jobUrl(jobTracker.getJobUrl())
            .companyUrl(jobTracker.getCompanyUrl())
            .updates(jobTracker.getUpdates())
            .build();
  }
  
}
