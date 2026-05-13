package com.example.demo.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.demo.model.Servicio;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
 
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
 
@Controller
public class CatalogoController {
 
    @GetMapping("/catalogo")
    public String mostrarCatalogo(Model model) { 
        List<Servicio> servicios = new ArrayList<>();
        try {

            ObjectMapper mapper = new ObjectMapper();
            InputStream input = getClass()
            .getResourceAsStream("/static/datos.json");
            servicios = mapper.readValue(input, new TypeReference<List<Servicio>>() {});
 
        } catch (Exception e) {
            System.out.println("Error al leer datos.json: " + e.getMessage());
        }
 
        model.addAttribute("servicios", servicios);
        return "catalogo";
    }
}