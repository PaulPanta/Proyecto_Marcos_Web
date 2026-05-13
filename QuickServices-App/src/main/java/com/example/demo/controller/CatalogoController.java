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

    @GetMapping("/catalogo")
    public String mostrarCatalogo(Model model) { 
        List<Servicio> servicios = cargarServicios();
        model.addAttribute("servicios", servicios);
        return "catalogo";
    }

    @GetMapping("/")
    public String index(jakarta.servlet.http.HttpSession session) {
        session.invalidate(); 
        return "forward:/index.html";
    }

    @GetMapping("/dashboard")
    public String mostrarDashboard(Model model, jakarta.servlet.http.HttpSession session) {
        List<Servicio> servicios = cargarServicios();
        quickservice.model.Usuario user = (quickservice.model.Usuario) session.getAttribute("usuarioLogueado");
        
        Map<String, Object> cliente = new HashMap<>();
        if (user != null) {
            cliente.put("nombre", user.getNombre());
            String[] partes = user.getNombre().split(" ");
            String iniciales = partes[0].substring(0, 1).toUpperCase();
            if (partes.length > 1) {
                iniciales += partes[1].substring(0, 1).toUpperCase();
            }
            cliente.put("iniciales", iniciales);
        } else {
            cliente.put("nombre", "Invitado");
            cliente.put("iniciales", "??");
        }
        
        cliente.put("solicitudes", new ArrayList<>());
        
        model.addAttribute("cliente", cliente);
        model.addAttribute("servicios", servicios);
        model.addAttribute("totalServicios", servicios.size());
        
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