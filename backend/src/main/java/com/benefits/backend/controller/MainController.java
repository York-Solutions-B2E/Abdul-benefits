package com.benefits.backend.controller;

import com.benefits.backend.service.impl.MainService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class MainController {

    private final MainService  mainService;


    @DeleteMapping("/delete")
    public void clearData(){
        mainService.deleteAll();
    }

}
