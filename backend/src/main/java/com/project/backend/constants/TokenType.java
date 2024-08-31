package com.project.backend.constants;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TokenType {

    ACCESS("ACCESS"),
    REFRESH("REFRESH");
    
    private String type;

    TokenType(String type) {
        this.type = type;
    }
}
