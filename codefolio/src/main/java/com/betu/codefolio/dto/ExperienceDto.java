package com.betu.codefolio.dto;

import com.betu.codefolio.model.Experience;
import java.util.List;
import lombok.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceDto {
    private Long id;
    private String role;
    private String company;
    private String location;
    private String employmentType;
    private String startDate;
    private String endDate;
    private Boolean isCurrent;
    private String description;
    private List<String> highlights;
    private List<String> stack;
    private String companyUrl;
    private String logoUrl;


    // Convert Experience entity to ExperienceDto
    public static ExperienceDto toDto(Experience experience) {
        return ExperienceDto.builder()
                .id(experience.getId())
                .role(experience.getRole())
                .company(experience.getCompany())
                .location(experience.getLocation())
                .employmentType(experience.getEmploymentType())
                .startDate(experience.getStartDate())
                .endDate(experience.getEndDate())
                .isCurrent(experience.getIsCurrent())
                .description(experience.getDescription())
                .highlights(experience.getHighlights())
                .stack(experience.getStack())
                .companyUrl(experience.getCompanyUrl())
                .logoUrl(experience.getLogoUrl())
                .build();
    }

    // Convert ExperienceDto to Experience entity
    public static Experience toEntity(ExperienceDto experienceDto) {
        return Experience.builder()
                .id(experienceDto.getId())
                .role(experienceDto.getRole())
                .company(experienceDto.getCompany())
                .location(experienceDto.getLocation())
                .employmentType(experienceDto.getEmploymentType())
                .startDate(experienceDto.getStartDate())
                .endDate(experienceDto.getEndDate())
                .isCurrent(experienceDto.getIsCurrent())
                .description(experienceDto.getDescription())
                .highlights(experienceDto.getHighlights())
                .stack(experienceDto.getStack())
                .companyUrl(experienceDto.getCompanyUrl())
                .logoUrl(experienceDto.getLogoUrl())
                .build();
    }
}