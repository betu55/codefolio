package com.betu.codefolio.service;
import org.springframework.stereotype.Service;
import com.betu.codefolio.repository.ProfileRepository;
import com.betu.codefolio.model.Profile;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@Service
public class ProfileService {

  private static final String DEFAULT_BIO = "Computer Science graduate from Toronto Metropolitan University. Software Developer with enterprise experience at Home Depot Canada, building maintainable user interfaces, backend service features, and database-driven tools.";
  private final ProfileRepository profileRepository;

  public ProfileService(ProfileRepository profileRepository) {
    this.profileRepository = profileRepository;
  }

  @PostConstruct
  @Transactional
  public void initializeProfile() {
      if (profileRepository.count() == 0) {
          Profile profile = new Profile();
          profile.setBio(DEFAULT_BIO);

          profileRepository.save(profile);
      }
  }

  public String getBio() {
    return profileRepository.findAll().stream()
      .findFirst()
      .map(profile -> profile.getBio())
      .orElse(DEFAULT_BIO);
  }

  @Transactional
  public String updateBio(String newBio) {
    if (newBio == null || newBio.isBlank()){
      throw new IllegalArgumentException("Bio cannot be null or blank");
    }

    Profile profile = profileRepository.findAll()
      .stream()
      .findFirst()
      .orElseThrow(
        () -> new IllegalStateException("Profile not found, or not initialized")
      );

    profile.setBio(newBio);
    
    return profileRepository.save(profile).getBio();
  }
}
