package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Servicio {

    private Long id;
    private String nombre;
    private String categoria;
    private Double precio;
    private String estado;
    private String descripcion;

public Servicio() {}

    public Long   getId()           { return id; }
    public String getNombre()       { return nombre; }
    public String getCategoria()    { return categoria; }
    public Double getPrecio()       { return precio; }
    public String getEstado()       { return estado; }
    public String getDescripcion()  { return descripcion; }

    public void setId(Long id)                  { this.id = id; }
    public void setNombre(String nombre)        { this.nombre = nombre; }
    public void setCategoria(String categoria)  { this.categoria = categoria; }
    public void setPrecio(Double precio)        { this.precio = precio; }
    public void setEstado(String estado)        { this.estado = estado; }
    public void setDescripcion(String desc)     { this.descripcion = desc; }
}
