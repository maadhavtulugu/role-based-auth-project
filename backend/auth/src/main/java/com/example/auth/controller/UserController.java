package com.example.auth.controller;

import com.example.auth.entity.User;
import com.example.auth.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<User> getUser(@AuthenticationPrincipal UserPrincipal userPrincipal){
        return ResponseEntity.ok(userPrincipal.getUser());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin-only")
    public ResponseEntity<String> getAdminData(){
        return ResponseEntity.ok("You are an ADMIN 🔐");
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user-data")
    public ResponseEntity<String> getUserData(){
        return ResponseEntity.ok("You are a USER ✅");
    }

}
