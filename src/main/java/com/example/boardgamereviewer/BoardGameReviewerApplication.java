package com.example.boardgamereviewer;

import com.example.boardgamereviewer.role.Role;
import com.example.boardgamereviewer.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
@EntityScan("com.example.boardgamereviewer")

public class BoardGameReviewerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoardGameReviewerApplication.class, args);

	}

	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository) {
		return args ->{
			if (roleRepository.findByName("USER").isEmpty()){
				roleRepository.save(Role.builder().name("USER").build());
			}
		};
	}
}
