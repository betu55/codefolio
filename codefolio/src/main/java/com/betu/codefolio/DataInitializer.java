package com.betu.codefolio;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.betu.codefolio.model.Role;
import com.betu.codefolio.model.User;
import com.betu.codefolio.repository.ProjectRepository;
import com.betu.codefolio.repository.UserRepository;
import com.betu.codefolio.model.Project;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner{
  private final ProjectRepository projectRepository;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Value("${app.admin.name:Portfolio Admin}")
  private String adminName;

  @Value("${app.admin.email:}")
  private String adminEmail;

  @Value("${app.admin.password:}")
  private String adminPassword;

  private List<Project> projects = List.of(
    Project.builder()
      .name("Journey Log")
      .description("A full-stack travel and site logging app for saving meaningful places with photos, descriptions, and ratings. Built with a separated client/server structure and REST API endpoints for creating, reading, and deleting entries.")
      .status("Full Stack")
      .githubUrl("https://github.com/betu55/journey-log")
      .liveUrl("")
      .stack(List.of("React", "Vite", "Node.js", "Express", "REST API"))
      .dateWorkedOn("Mar 15, 2024")
      .build(),
    Project.builder()
      .name("VS Code Theme Extensions")
      .description("Published custom Visual Studio Code themes with 200+ marketplace downloads. Designed editor color tokens, packaged the extensions, and shipped developer-facing tools used by real users.")
      .status("Developer Tool")
      .githubUrl("https://github.com/betu55")
      .liveUrl("")
      .stack(List.of("JSON", "VS Code", "Marketplace Publishing"))
      .dateWorkedOn("Jun 12, 2020")
      .build()
  );

  @Override
  public void run(String... args) throws Exception {
    if(projectRepository.count() == 0) {
      projectRepository.saveAll(projects);
    }

    seedAdminUser();
  }

  private void seedAdminUser() {
    if (adminEmail.isBlank() || adminPassword.isBlank()) {
      return;
    }

    if (userRepository.existsByEmail(adminEmail) || userRepository.existsByRole(Role.ADMIN)) {
      return;
    }

    userRepository.save(User.builder()
      .name(adminName)
      .email(adminEmail)
      .password(passwordEncoder.encode(adminPassword))
      .role(Role.ADMIN)
      .build());
  }
}
