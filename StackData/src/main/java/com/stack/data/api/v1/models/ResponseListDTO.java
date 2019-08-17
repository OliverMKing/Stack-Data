package com.stack.data.api.v1.models;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResponseListDTO {

    Integer responseCount;
    Map<String, Integer> languages = new HashMap();
    Map<String, Integer> frameworks = new HashMap();
    List<ResponseDTO> responseDTOS;

    public ResponseListDTO() {
    }

    public ResponseListDTO(List<ResponseDTO> responseDTOS) {
        this.responseDTOS = responseDTOS;
        this.responseCount = responseDTOS.size();
        setLanguagesAndFrameworks();
    }

    private void setLanguagesAndFrameworks() {
        for (ResponseDTO response : responseDTOS) {
            for (String language : response.getLanguages()) {
                languages.put(language, languages.getOrDefault(language, 0) + 1);
            }
            for (String framework : response.getFrameworks()) {
                frameworks.put(framework, frameworks.getOrDefault(framework, 0) + 1);
            }
        }
    }

    public Integer getResponseCount() {
        return responseCount;
    }

    public void setResponseCount(Integer responseCount) {
        this.responseCount = responseCount;
    }

    public Map<String, Integer> getLanguages() {
        return languages;
    }

    public void setLanguages(Map<String, Integer> languages) {
        this.languages = languages;
    }

    public Map<String, Integer> getFrameworks() {
        return frameworks;
    }

    public void setFrameworks(Map<String, Integer> frameworks) {
        this.frameworks = frameworks;
    }

    public Integer getResponses() {
        return responseCount;
    }

    public void setResponses(Integer responses) {
        this.responseCount = responses;
    }

    public List<ResponseDTO> getResponseDTOS() {
        return responseDTOS;
    }

    public void setResponseDTOS(List<ResponseDTO> responseDTOS) {
        this.responseDTOS = responseDTOS;
    }
}
