package com.betu.codefolio.mapper;

import com.betu.codefolio.dto.ProjectDto;
import com.betu.codefolio.model.Project;

public class ProjectMapper {
    // Convert ProjectDto to Project entity
    public static Project toEntity(ProjectDto projectDto) {
        return Project.builder()
                .id(projectDto.getId())
                .name(projectDto.getName())
                .description(projectDto.getDescription())
                .githubUrl(projectDto.getGithubUrl())
                .liveUrl(projectDto.getLiveUrl())
                .status(projectDto.getStatus())
                .stack(projectDto.getStack())
                .dateWorkedOn(projectDto.getDateWorkedOn())
                .orderIndex(projectDto.getOrderIndex())
                .build();
    }

    // Convert Project entity to ProjectDto
    public static ProjectDto toDto(Project project) {
        return ProjectDto.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .githubUrl(project.getGithubUrl())
                .liveUrl(project.getLiveUrl())
                .status(project.getStatus())
                .stack(project.getStack())
                .dateWorkedOn(project.getDateWorkedOn())
                .orderIndex(project.getOrderIndex())
                .build(); 
      }

    // Update existing Project entity with values from ProjectDto
    public static Project updateEntity(Project existingProject, ProjectDto projectDto) {
        existingProject.setName(projectDto.getName());
        existingProject.setDescription(projectDto.getDescription());
        existingProject.setGithubUrl(projectDto.getGithubUrl());
        existingProject.setLiveUrl(projectDto.getLiveUrl());
        existingProject.setStatus(projectDto.getStatus());
        existingProject.setStack(projectDto.getStack());
        existingProject.setDateWorkedOn(projectDto.getDateWorkedOn());
        existingProject.setOrderIndex(projectDto.getOrderIndex());
        return existingProject; 
    }
}
