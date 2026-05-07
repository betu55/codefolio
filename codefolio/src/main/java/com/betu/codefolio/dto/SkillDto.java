package com.betu.codefolio.dto;

import com.betu.codefolio.model.Skill;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillDto {
    private Long id;
    private String name;
    private String description;
    private String url;


    // Convert Skill entity to SkillDto
    public static SkillDto fromEntity(Skill skill) {
        return SkillDto.builder()
                .id(skill.getId())
                .name(skill.getName())
                .description(skill.getDescription())
                .url(skill.getUrl())
                .build();
    }
} 