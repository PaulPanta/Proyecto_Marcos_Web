package quickservice.controller;

import quickservice.model.Usuario;
import quickservice.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping("/registro")
    public String registro(@RequestBody Usuario usuario){
        repository.save(usuario);
        return "Registro exitoso";
    }

    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario){

        Usuario user = repository.findByEmail(usuario.getEmail());

        if(user != null && user.getPassword().equals(usuario.getPassword())){
            return "ok";
        }

        return "error";
    }
}