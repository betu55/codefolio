package com.betu.codefolio.dto;
import lombok.Data;

@Data
public class ProfileDto {
  private String bio;

  public ProfileDto(String bio) {
    this.bio = bio;
  }
}
