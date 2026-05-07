package com.betu.codefolio.service;
import com.betu.codefolio.model.Skill;
import com.betu.codefolio.repository.SkillRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // Additional service methods can be added here

}
