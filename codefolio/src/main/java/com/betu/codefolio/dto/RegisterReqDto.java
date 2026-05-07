package com.betu.codefolio.dto;
import lombok.Data;

@Data
public class RegisterReqDto {
    private String name;
    private String email;
    private String password;
}
