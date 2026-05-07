package com.betu.codefolio.dto;
import com.betu.codefolio.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import com.betu.codefolio.model.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
  private Long id;
  private String name;
  private String email;
  private String password;
  private Role role;

  public static UserDto fromEntity(User user) {
    return UserDto.builder()
        .id(user.getId())
        .name(user.getName())
        .email(user.getEmail())
        .password(user.getPassword())
        .role(user.getRole())
        .build();
  }

  public User toEntity() {
    return User.builder()
        .id(id)
        .name(name)
        .email(email)
        .password(password)
        .role(Role.valueOf(role.name()))
        .build();
  }
}
