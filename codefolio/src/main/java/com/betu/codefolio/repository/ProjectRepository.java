package com.betu.codefolio.repository;

import com.betu.codefolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
  // Custom query methods (if needed) can be defined here
}