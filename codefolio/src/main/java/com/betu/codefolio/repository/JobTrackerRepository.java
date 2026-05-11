package com.betu.codefolio.repository;

import com.betu.codefolio.model.JobTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface JobTrackerRepository extends JpaRepository<JobTracker, Long> {
  // Custom query methods (if needed) can be defined here
}
