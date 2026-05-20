package com.betu.codefolio.service;
import com.betu.codefolio.model.Project;
import com.betu.codefolio.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;


@Service
public class ProjectService {
  
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
      return projectRepository.findAll().stream()
        .sorted(
          Comparator
          .comparing(Project::getOrderIndex, Comparator.nullsLast(Integer::compareTo))
          .thenComparing(Project::getId, Comparator.nullsLast(Long::compareTo))
        )
        .toList();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public Project createProject(Project project) {
        project.setOrderIndex(normalizeOrderIndex(project.getOrderIndex()));
        project.setStack(normalizeList(project.getStack()));
        return projectRepository.save(project);
    }

    @Transactional
    public Project updateProject(Long id, Project updatedProject) {
        Project existingProject = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
        existingProject.setName(updatedProject.getName());
        existingProject.setDescription(updatedProject.getDescription());
        existingProject.setGithubUrl(updatedProject.getGithubUrl());
        existingProject.setLiveUrl(updatedProject.getLiveUrl());
        existingProject.setStatus(updatedProject.getStatus());
        if (existingProject.getStack() == null) {
            existingProject.setStack(normalizeList(updatedProject.getStack()));
        } else {
            replaceList(existingProject.getStack(), updatedProject.getStack());
        }
        existingProject.setDateWorkedOn(updatedProject.getDateWorkedOn());
        existingProject.setOrderIndex(normalizeOrderIndex(updatedProject.getOrderIndex()));
        return existingProject;
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    private Integer normalizeOrderIndex(Integer orderIndex) {
        if (orderIndex == null) {
            return 10;
        }

        return Math.min(10, Math.max(1, orderIndex));
    }

    private List<String> normalizeList(List<String> values) {
        return values == null ? new ArrayList<>() : new ArrayList<>(values);
    }

    private void replaceList(List<String> existingValues, List<String> updatedValues) {
        existingValues.clear();

        if (updatedValues != null) {
            existingValues.addAll(updatedValues);
        }
    }
  
}
