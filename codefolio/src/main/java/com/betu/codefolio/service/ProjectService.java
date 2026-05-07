package com.betu.codefolio.service;
import com.betu.codefolio.model.Project;
import com.betu.codefolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class ProjectService {
  
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project updatedProject) {
        Project existingProject = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
        existingProject.setName(updatedProject.getName());
        existingProject.setDescription(updatedProject.getDescription());
        existingProject.setGithubUrl(updatedProject.getGithubUrl());
        existingProject.setLiveUrl(updatedProject.getLiveUrl());
        existingProject.setStatus(updatedProject.getStatus());
        existingProject.setStack(updatedProject.getStack());
        existingProject.setDateWorkedOn(updatedProject.getDateWorkedOn());
        return projectRepository.save(existingProject);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
  
}
