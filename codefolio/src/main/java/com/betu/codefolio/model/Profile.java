package com.betu.codefolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "profiles")
public class Profile {

  @Id
  @GeneratedValue(strategy =GenerationType.IDENTITY)
  private Long id;

  @Column(nullable=false, length=2000)
  private String bio;

}
