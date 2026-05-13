const formLogin = document.getElementById("formLogin");
const formRegistro = document.getElementById("formRegistro");
const btnMostrarRegistro = document.getElementById("btnMostrarRegistro");
const btnMostrarLogin = document.getElementById("btnMostrarLogin");
const pantallaLogin = document.getElementById("pantallaLogin");
const pantallaSeleccion = document.getElementById("pantallaSeleccion");
const btnCliente = document.getElementById("btnCliente");
const btnProveedor = document.getElementById("btnProveedor");

btnMostrarRegistro.addEventListener("click", () => {
    formLogin.style.display = "none";
    formRegistro.style.display = "block";
});

btnMostrarLogin.addEventListener("click", () => {
    formRegistro.style.display = "none";
    formLogin.style.display = "block";
});

function validarPassword(password){
    return password.length >= 4;
}

formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("registroNombre").value.trim();
    const email = document.getElementById("registroEmail").value.trim();
    const password = document.getElementById("registroPassword").value.trim();

    if(nombre === "" || email === "" || password === ""){
        alert("Completa todos los campos");
        return;
    }

    if(!email.includes("@")){
        alert("Correo inválido");
        return;
    }

    if(!validarPassword(password)){
        alert("La contraseña debe tener al menos 4 caracteres");
        return;
    }

    const usuario = { nombre, email, password };

    try{
        const response = await fetch("http://localhost:8080/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });

        const data = await response.text();
        alert(data);
        formRegistro.reset();
        formRegistro.style.display = "none";
        formLogin.style.display = "block";
    }catch(error){
        alert("Error al registrar");
    }
});

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if(email === "" || password === ""){
        alert("Completa todos los campos");
        return;
    }

    try{
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.text();
        if(data === "ok"){
            pantallaLogin.style.display = "none";
            pantallaSeleccion.style.display = "flex";
        }else{
            alert("Datos incorrectos");
        }
    }catch(error){
        alert("Error de conexión");
    }
});

btnCliente.addEventListener("click", () => {
    window.location.href = "/dashboard";
});

btnProveedor.addEventListener("click", () => {
    window.location.href = "/mis-servicios";
});