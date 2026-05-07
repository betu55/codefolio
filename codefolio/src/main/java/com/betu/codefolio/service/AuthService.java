package com.betu.codefolio.service;

import com.betu.codefolio.dto.AuthResponseDto;
import com.betu.codefolio.dto.LoginReqDto;
import com.betu.codefolio.dto.RegisterReqDto;
import com.betu.codefolio.model.Role;
import com.betu.codefolio.model.User;
import com.betu.codefolio.repository.UserRepository;
import com.betu.codefolio.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponseDto register(RegisterReqDto request) {
        String email = normalizeEmail(request.getEmail());

        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }

        User user = userRepository.save(User.builder()
                .name(request.getName())
                .email(email)
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build());

        return buildAuthResponse(user);
    }

    public AuthResponseDto login(LoginReqDto request) {
        String email = normalizeEmail(request.getEmail());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, request.getPassword())
        );

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        return buildAuthResponse(user);
    }

    private AuthResponseDto buildAuthResponse(User user) {
        return AuthResponseDto.builder()
                .token(jwtService.generateToken(user))
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    private String normalizeEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
        }

        return email.trim().toLowerCase();
    }
}
