package com.betu.codefolio.repository;
import com.betu.codefolio.model.Role;
import com.betu.codefolio.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);
  boolean existsByEmail(String email);
  boolean existsByRole(Role role);
}
