package com.betu.codefolio.service;
import com.betu.codefolio.model.Experience;
import com.betu.codefolio.repository.ExperienceRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExperienceService {
  
  private final ExperienceRepository experienceRepository;

  public ExperienceService(ExperienceRepository experienceRepository) {
    this.experienceRepository = experienceRepository;
  }

  public List<Experience> getAllExperiences() {
    return experienceRepository.findAll();
  }

  public Experience getExperienceById(Long id) {
    return experienceRepository.findById(id).orElseThrow(() -> new RuntimeException("Experience not found"));
  }

  public Experience createExperience(Experience experience) {
    return experienceRepository.save(experience);
  }

  public Experience updateExperience(Long id, Experience updatedExperience) {
    Experience existingExperience = experienceRepository.findById(id).orElseThrow(() -> new RuntimeException("Experience not found"));
    existingExperience.setRole(updatedExperience.getRole());
    existingExperience.setCompany(updatedExperience.getCompany());
    existingExperience.setLocation(updatedExperience.getLocation());
    existingExperience.setEmploymentType(updatedExperience.getEmploymentType());
    existingExperience.setDescription(updatedExperience.getDescription());
    existingExperience.setStartDate(updatedExperience.getStartDate());
    existingExperience.setEndDate(updatedExperience.getEndDate());
    existingExperience.setIsCurrent(updatedExperience.getIsCurrent());
    existingExperience.setHighlights(updatedExperience.getHighlights());
    existingExperience.setStack(updatedExperience.getStack());
    existingExperience.setCompanyUrl(updatedExperience.getCompanyUrl());
    existingExperience.setLogoUrl(updatedExperience.getLogoUrl());
    return experienceRepository.save(existingExperience);
  }

  public void deleteExperience(Long id) {
    experienceRepository.deleteById(id);
  }

}
