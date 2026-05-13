package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Servicio {

    private Long id;
    private String nombre;
    private String categoria;
    private double precio;
    private String estado;
    private String descripcion;
    private String imagenUrl;

    public Servicio() {}

    public Servicio(Long id, String nombre, String categoria,double precio, String estado, String descripcion, String imagenUrl) {
        this.id          = id;
        this.nombre      = nombre;
        this.categoria   = categoria;
        this.precio      = precio;
        this.estado      = estado;
        this.descripcion = descripcion;
        this.imagenUrl   = imagenUrl;
    }

    public Long    getId()          { return id; }
    public String  getNombre()      { return nombre; }
    public String  getCategoria()   { return categoria; }
    public double  getPrecio()      { return precio; }
    public String  getEstado()      { return estado; }
    public String  getDescripcion() { return descripcion; }
    public String  getImagenUrl()   { return imagenUrl; }

    
    public void setId(Long id)                { this.id = id; }
    public void setNombre(String nombre)      { this.nombre = nombre; }
    public void setCategoria(String categoria){ this.categoria = categoria; }
    public void setPrecio(double precio)      { this.precio = precio; }
    public void setEstado(String estado)      { this.estado = estado; }
    public void setDescripcion(String desc)   { this.descripcion = desc; }
    public void setImagenUrl(String imagenUrl){ this.imagenUrl = imagenUrl; }
}