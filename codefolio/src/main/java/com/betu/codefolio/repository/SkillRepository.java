package com.betu.codefolio.repository;

import com.betu.codefolio.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
  // Custom query methods (if needed) can be defined here
}