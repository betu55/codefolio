package com.betu.codefolio.service;

import com.betu.codefolio.repository.UserRepository;

public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }
}
