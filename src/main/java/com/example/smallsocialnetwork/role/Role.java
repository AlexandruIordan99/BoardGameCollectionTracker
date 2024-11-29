package com.example.smallsocialnetwork.role;

import com.example.smallsocialnetwork.user.User;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "role")
@EntityListeners(AuditingEntityListener.class)



public class Role {

    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private String name;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore //to ignore serialization for user
    private List<User> users;


    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate; //we want to keep track of the user creation date and never update it
    @LastModifiedDate
    @Column(insertable = false) //when creating a new record, we do not want to initialize the value of this variable
    private LocalDateTime modifiedDate;

}
