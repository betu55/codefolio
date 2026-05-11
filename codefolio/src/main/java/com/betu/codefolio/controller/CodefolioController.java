package com.betu.codefolio.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.betu.codefolio.dto.*;
import com.betu.codefolio.service.*;
import com.betu.codefolio.mapper.*;
import com.betu.codefolio.model.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CodefolioController {

    private int counter = 1; // Counter to track requests

    private final SkillService skillService;
    private final ProjectService projectService;
    private final ExperienceService experienceService;
    private final JobTrackerService jobTrackerService;

    public CodefolioController(SkillService skillService, ProjectService projectService, ExperienceService experienceService, JobTrackerService jobTrackerService) {
        this.skillService = skillService;
        this.projectService = projectService;
        this.experienceService = experienceService;
        this.jobTrackerService = jobTrackerService;
    }

    @GetMapping("/api/skills")
    public List<SkillDto> getAllSkills() {
      return skillService.getAllSkills().stream()
        .map(SkillDto::fromEntity)
        .collect(Collectors.toList());
    }


    // Project endpoints
    @GetMapping("/api/projects")
    public List<ProjectDto> getAllProjects() {
      
      System.out.println("\nFetching all projects ... call#_" + counter);
      counter++;
      return projectService.getAllProjects().stream()
        .map(ProjectMapper::toDto)
        .collect(Collectors.toList());
    }

    @PostMapping("/api/projects")
    public ProjectDto createProject(@RequestBody ProjectDto projectDto) {
      Project createdProject = projectService.createProject(ProjectMapper.toEntity(projectDto));
      System.out.println("\nCreated project with ID: " + createdProject.getId());
      return ProjectMapper.toDto(createdProject);
    }

    @PutMapping("/api/projects/{id}")
    public ProjectDto updateProject(@PathVariable Long id, @RequestBody ProjectDto projectDto) {
      Project updatedProject = projectService.updateProject(id, ProjectMapper.toEntity(projectDto));
      System.out.println("\nUpdated project with ID: " + id);
      return ProjectMapper.toDto(updatedProject);
    }

    @DeleteMapping("/api/projects/{id}")
    public void deleteProject(@PathVariable Long id) {
      projectService.deleteProject(id);
      System.out.println("\nDeleted project with ID: " + id);   
    }


    // Experience endpoints
    @GetMapping("/api/experiences")
    public List<ExperienceDto> getAllExperiences() {
      return experienceService.getAllExperiences().stream()
        .map(ExperienceDto::toDto)
        .collect(Collectors.toList());
    }

    @PostMapping("/api/experiences")
    public ExperienceDto createExperience(@RequestBody ExperienceDto experienceDto) {
      Experience createdExperience = experienceService.createExperience(ExperienceDto.toEntity(experienceDto));
      System.out.println("\nCreated experience with ID: " + createdExperience.getId());
      return ExperienceDto.toDto(createdExperience);
    }

    @PutMapping("/api/experiences/{id}")
    public ExperienceDto updateExperience(@PathVariable Long id, @RequestBody ExperienceDto experienceDto) {
      Experience updatedExperience = experienceService.updateExperience(id, ExperienceDto.toEntity(experienceDto));
      System.out.println("\nUpdated experience with ID: " + id);
      return ExperienceDto.toDto(updatedExperience);
    }

    @DeleteMapping("/api/experiences/{id}")
    public void deleteExperience(@PathVariable Long id) {
      experienceService.deleteExperience(id);
      System.out.println("\nDeleted experience with ID: " + id);
    }

    // JobTracker endpoints
    @GetMapping("/api/job-tracker")
    public List<JobTrackerDto> getAllJobTrackers() {
      return jobTrackerService.getAllJobTrackers().stream()
        .map(JobTrackerDto::toDto)
        .collect(Collectors.toList());
    }

    @PostMapping("/api/job-tracker")
    public JobTrackerDto createJobTracker(@RequestBody JobTrackerDto jobTrackerDto) {
      JobTracker createdJobTracker = jobTrackerService.createJobTracker(JobTrackerDto.toEntity(jobTrackerDto));
      System.out.println("\nCreated job tracker with ID: " + createdJobTracker.getId());
      return JobTrackerDto.toDto(createdJobTracker);
    }

    @PutMapping("/api/job-tracker/{id}")
    public JobTrackerDto updateJobTracker(@PathVariable Long id, @RequestBody JobTrackerDto jobTrackerDto) {
      JobTracker updatedJobTracker = jobTrackerService.updateJobTracker(id, JobTrackerDto.toEntity(jobTrackerDto));
      System.out.println("\nUpdated job tracker with ID: " + id);
      return JobTrackerDto.toDto(updatedJobTracker);
    }

    @DeleteMapping("/api/job-tracker/{id}")
    public void deleteJobTracker(@PathVariable Long id) {
      jobTrackerService.deleteJobTracker(id);
      System.out.println("\nDeleted job tracker with ID: " + id);
    }
}                             