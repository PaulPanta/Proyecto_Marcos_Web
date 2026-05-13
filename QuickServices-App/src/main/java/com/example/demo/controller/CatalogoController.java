package com.example.demo.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.demo.model.Servicio;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CatalogoController {

    @GetMapping({"/", "/catalogo"})
    public String mostrarCatalogo(Model model) { 
        List<Servicio> servicios = cargarServicios();
        model.addAttribute("servicios", servicios);
        return "catalogo";
    }

    @GetMapping("/dashboard")
    public String mostrarDashboard(Model model) {
        List<Servicio> servicios = cargarServicios();
        
        // Datos simulados para el cliente
        Map<String, Object> cliente = new HashMap<>();
        cliente.put("nombre", "Dayana Martínez");
        cliente.put("iniciales", "DM");
        cliente.put("solicitudes", new ArrayList<>());
        
        model.addAttribute("cliente", cliente);
        model.addAttribute("servicios", servicios);
        model.addAttribute("totalServicios", servicios.size());
        model.addAttribute("solicitudesPendientes", 0);
        model.addAttribute("solicitudesCompletadas", 0);
        
        return "dashboard_cliente";
    }

    private List<Servicio> cargarServicios() {
        List<Servicio> servicios = new ArrayList<>();
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream input = getClass().getResourceAsStream("/static/datos.json");
            if (input != null) {
                servicios = mapper.readValue(input, new TypeReference<List<Servicio>>() {});
            }
        } catch (Exception e) {
            System.err.println("Error al leer datos.json: " + e.getMessage());
        }
        return servicios;
    }
}