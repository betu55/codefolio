package com.betu.codefolio.controller;

import com.betu.codefolio.dto.AuthResponseDto;
import com.betu.codefolio.dto.LoginReqDto;
import com.betu.codefolio.dto.RegisterReqDto;
import com.betu.codefolio.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponseDto register(@RequestBody RegisterReqDto request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponseDto login(@RequestBody LoginReqDto request) {
        return authService.login(request);
    }
}
