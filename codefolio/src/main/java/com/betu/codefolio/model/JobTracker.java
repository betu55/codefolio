package com.betu.codefolio.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "job_tracker")
public class JobTracker {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String role;
  @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
  @JoinColumn(name = "company_id")
  private Company company; // Can be null for freelance or self-employed roles
  private String employmentType;
  private String status;
  private String dateApplied;
  private String applicationDeadline;
  private String jobUrl;
  @ElementCollection
  @CollectionTable(name = "job_tracker_updates", joinColumns = @JoinColumn(name = "job_tracker_id"))
  @Column(name = "updates")
  private List<String> updates; // List of status updates or notes related to the job application

}
