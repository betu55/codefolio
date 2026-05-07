package com.betu.codefolio.dto;

import com.betu.codefolio.model.Project;
import lombok.*;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private Long id;
    private String name;
    private String description;
    private String status;
    private String githubUrl;
    private String liveUrl;
    private String dateWorkedOn;
    private List<String> stack;

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
                .build();
    }

    //Convert ProjectDto to Project entity
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
                .build(); 
    }
}