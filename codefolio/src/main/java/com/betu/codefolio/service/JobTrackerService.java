package com.betu.codefolio.service;
import com.betu.codefolio.model.JobTracker;
import com.betu.codefolio.repository.JobTrackerRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobTrackerService {
  
  private final JobTrackerRepository jobTrackerRepository;

  public JobTrackerService(JobTrackerRepository jobTrackerRepository) {
    this.jobTrackerRepository = jobTrackerRepository;
  }

  public List<JobTracker> getAllJobTrackers() {
    return jobTrackerRepository.findAll();
  }

  public JobTracker getJobTrackerById(Long id) {
    return jobTrackerRepository.findById(id).orElseThrow(() -> new RuntimeException("Job Tracker not found"));
  }

  public JobTracker createJobTracker(JobTracker jobTracker) {
    return jobTrackerRepository.save(jobTracker);
  }

  public JobTracker updateJobTracker(Long id, JobTracker updatedJobTracker) {
    JobTracker existingJobTracker = jobTrackerRepository.findById(id).orElseThrow(() -> new RuntimeException("Job Tracker not found"));
    existingJobTracker.setRole(updatedJobTracker.getRole());
    existingJobTracker.setCompany(updatedJobTracker.getCompany());
    existingJobTracker.setEmploymentType(updatedJobTracker.getEmploymentType());
    existingJobTracker.setStatus(updatedJobTracker.getStatus());
    existingJobTracker.setDateApplied(updatedJobTracker.getDateApplied());
    existingJobTracker.setApplicationDeadline(updatedJobTracker.getApplicationDeadline());
    existingJobTracker.setJobUrl(updatedJobTracker.getJobUrl());
    existingJobTracker.setUpdates(updatedJobTracker.getUpdates());
    return jobTrackerRepository.save(existingJobTracker);

  }

  public void deleteJobTracker(Long id) {
    jobTrackerRepository.deleteById(id);
  }

}
