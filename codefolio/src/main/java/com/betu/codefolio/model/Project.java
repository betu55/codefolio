package com.betu.codefolio.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 1000)
    private String description;

    private String status;
    private String githubUrl;
    private String liveUrl;
    private String dateWorkedOn;
    @Builder.Default
    @Column(name = "order_index")
    private Integer orderIndex = 10;

    @ElementCollection
    @CollectionTable(name = "project_stack", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "technology")
    private List<String> stack;
}
