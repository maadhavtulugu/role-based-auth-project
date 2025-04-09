package com.example.auth.security;

import com.example.auth.entity.User;
import com.example.auth.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

            final String authHeader=request.getHeader("Authorization");
            final String jwt;
            final String userEmail;

            if(authHeader==null || !authHeader.startsWith("Bearer ")){
                filterChain.doFilter(request,response);
                return;
            }

            jwt=authHeader.substring(7);
            userEmail=jwtService.extractUsername(jwt);

            if(userEmail!=null && SecurityContextHolder.getContext().getAuthentication()==null){
                User user=userRepository.findByEmail(userEmail).orElse(null);
                UserPrincipal userPrincipal = new UserPrincipal(user);
                if(user!=null && jwtService.isTokenValid(jwt,user)){

                    UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(
                            userPrincipal, // principal
                            null,
                            userPrincipal.getAuthorities()
                    );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request,response);
    }
}


//Extracts JWT from the Authorization header
//Validates it
//Sets authenticated user in Spring Security context

