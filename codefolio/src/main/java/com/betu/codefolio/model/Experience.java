package com.betu.codefolio.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "experiences")
public class Experience {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String role;
  private String company;
  private String location;
  private String employmentType;
  private String startDate;
  private String endDate;
  private Boolean isCurrent;
  @Builder.Default
  @Column(name = "order_index")
  private Integer orderIndex = 10;

  @Column(length = 2000)
  private String description;

  @ElementCollection
  @CollectionTable(name = "experience_highlights", joinColumns = @JoinColumn(name = "experience_id"))
  @Column(name = "highlight")
  private List<String> highlights;

  @ElementCollection
  @CollectionTable(name = "experience_stack", joinColumns = @JoinColumn(name = "experience_id"))
  @Column(name = "technology")
  private List<String> stack;

  private String companyUrl;
  private String logoUrl;
  
}
