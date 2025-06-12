package com.example.boardgamereviewer.user;


import com.example.boardgamereviewer.boardGame.BoardGame;
import com.example.boardgamereviewer.history.BoardGameTransactionHistory;
import com.example.boardgamereviewer.review.Review;
import com.example.boardgamereviewer.role.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter   //simply returns the field
@Setter   //sets the field to a value
@Builder  //check https://medium.com/@sridharnarayanmkr107/spring-boot-builder-d0edc5595cda for a good explanation
@AllArgsConstructor //generates a constructor with 1 parameter for each field in your class
@NoArgsConstructor  // generates a constructor with no parameters
@Entity  //documentation at: https://jakarta.ee/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/entity
@Table(name = "users") //maps an entity class to a specific database table
                       //DO NOT NAME THIS user, IT WILL GIVE YOU AN SQL SYNTAX ERROR
@EntityListeners(AuditingEntityListener.class)  //specifies callback listener classes for an entity
// These listener classes intercept and react to lifecycle events (such as persist, update, or remove)
// associated with the entity.


public class User implements UserDetails, Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstname;
    private String lastname;
    private String dateOfBirth;
    @Column(unique = true)
    private String email;
    private String password;
    private boolean accountLocked;
    private boolean enabled;


    @ManyToMany(fetch= FetchType.EAGER) //when you fetch the user, do so eagerly
    @JoinTable(
        name="users_roles",
        joinColumns = @JoinColumn(name="roles_id"),
        inverseJoinColumns = @JoinColumn(name="users_id")
    )
    private List<Role> roles;

    @OneToMany(mappedBy="owner") //one user to many board games
    private List<BoardGame> boardGames; //you can own War of the Ring, D&D, Root, etc.

    @OneToMany(mappedBy = "user")
    private List<BoardGameTransactionHistory> histories;


    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate; //we want to keep track of the user creation date and never update it
    @LastModifiedDate
    @Column(insertable = false) //when creating a new record, we do not want to initialize the value of this variable
    private LocalDateTime modifiedDate;


    public String fullName(){
        return firstname + " " + lastname;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { //for roles and permissions
        return this.roles
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public String getName() {
        return email;
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;
}
