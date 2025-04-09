package com.example.auth.service;


import com.example.auth.dto.AuthResponse;
import com.example.auth.dto.LoginRequest;
import com.example.auth.dto.RegisterRequest;
import com.example.auth.entity.Role;
import com.example.auth.entity.User;
import com.example.auth.repository.UserRepository;
import com.example.auth.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request){
        User user=User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);

        String jwt=jwtService.generateToken(user);

        return  AuthResponse.builder()
                .token(jwt)
                .build();
    }

    public AuthResponse login(LoginRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));


        String jwt=jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwt)
                .build();
    }

}
