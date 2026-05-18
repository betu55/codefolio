package com.betu.codefolio.service;
import com.betu.codefolio.model.Experience;
import com.betu.codefolio.repository.ExperienceRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;

@Service
public class ExperienceService {
  
  private final ExperienceRepository experienceRepository;

  public ExperienceService(ExperienceRepository experienceRepository) {
    this.experienceRepository = experienceRepository;
  }

  public List<Experience> getAllExperiences() {
    return experienceRepository.findAll().stream()
      .sorted(
        Comparator
          .comparing(Experience::getOrderIndex, Comparator.nullsLast(Integer::compareTo))
          .thenComparing(Experience::getId, Comparator.nullsLast(Long::compareTo))
      )
      .toList();
  }

  public Experience getExperienceById(Long id) {
    return experienceRepository.findById(id).orElseThrow(() -> new RuntimeException("Experience not found"));
  }

  public Experience createExperience(Experience experience) {
    experience.setOrderIndex(normalizeOrderIndex(experience.getOrderIndex()));
    experience.setHighlights(normalizeList(experience.getHighlights()));
    experience.setStack(normalizeList(experience.getStack()));
    return experienceRepository.save(experience);
  }

  @Transactional
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
    existingExperience.setOrderIndex(normalizeOrderIndex(updatedExperience.getOrderIndex()));
    if (existingExperience.getHighlights() == null) {
      existingExperience.setHighlights(normalizeList(updatedExperience.getHighlights()));
    } else {
      replaceList(existingExperience.getHighlights(), updatedExperience.getHighlights());
    }

    if (existingExperience.getStack() == null) {
      existingExperience.setStack(normalizeList(updatedExperience.getStack()));
    } else {
      replaceList(existingExperience.getStack(), updatedExperience.getStack());
    }
    existingExperience.setCompanyUrl(updatedExperience.getCompanyUrl());
    existingExperience.setLogoUrl(updatedExperience.getLogoUrl());
    return existingExperience;
  }

  public void deleteExperience(Long id) {
    experienceRepository.deleteById(id);
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
