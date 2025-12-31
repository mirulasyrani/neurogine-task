package com.neurogine.taskapp.controller;

import com.neurogine.taskapp.dto.UpdateProfileRequest;
import com.neurogine.taskapp.dto.UserProfileResponse;
import com.neurogine.taskapp.model.User;
import com.neurogine.taskapp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    
    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);
    
    private final UserRepository userRepository;
    
    public ProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @GetMapping
    public ResponseEntity<UserProfileResponse> getProfile(Authentication auth) {
        logger.info("Get profile for user: {}", auth.getName());
        
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        UserProfileResponse response = new UserProfileResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setAvatarUrl(user.getAvatarUrl());
        
        return ResponseEntity.ok(response);
    }
    
    @PutMapping
    public ResponseEntity<UserProfileResponse> updateProfile(
            @RequestBody UpdateProfileRequest request, 
            Authentication auth) {
        
        logger.info("Update profile for user: {}", auth.getName());
        
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().build();
            }
            user.setEmail(request.getEmail());
        }
        
        userRepository.save(user);
        
        UserProfileResponse response = new UserProfileResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setAvatarUrl(user.getAvatarUrl());
        
        return ResponseEntity.ok(response);
    }
}
