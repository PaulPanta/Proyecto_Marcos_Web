// ELEMENTOS

const formLogin = document.getElementById("formLogin");

const formRegistro = document.getElementById("formRegistro");

const btnMostrarRegistro =
document.getElementById("btnMostrarRegistro");

const btnMostrarLogin =
document.getElementById("btnMostrarLogin");

const pantallaLogin =
document.getElementById("pantallaLogin");

const pantallaSeleccion =
document.getElementById("pantallaSeleccion");

const btnCliente =
document.getElementById("btnCliente");

const btnProveedor =
document.getElementById("btnProveedor");


// CAMBIAR FORMULARIOS

btnMostrarRegistro.addEventListener("click", () => {

    formLogin.style.display = "none";

    formRegistro.style.display = "block";

});

btnMostrarLogin.addEventListener("click", () => {

    formRegistro.style.display = "none";

    formLogin.style.display = "block";

});


// VALIDAR CONTRASEÑA

function validarPassword(password){

    return password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password);

}


// REGISTRO

formRegistro.addEventListener("submit", (e) => {

    e.preventDefault();

    const inputs =
    formRegistro.querySelectorAll("input");

    const nombre =
    inputs[0].value.trim();

    const email =
    inputs[1].value.trim();

    const password =
    inputs[2].value.trim();


    if(nombre === "" ||
    email === "" ||
    password === ""){

        alert("Completa todos los campos");
        return;

    }

    if(!email.includes("@")){

        alert("Ingrese un correo válido");
        return;

    }

    if(!validarPassword(password)){

        alert("La contraseña debe tener mayúscula, minúscula y número");
        return;

    }


    const usuario = {

        nombre: nombre,
        email: email,
        password: password

    };

    localStorage.setItem("user",
    JSON.stringify(usuario));

    alert("Registro exitoso");

    formRegistro.style.display = "none";

    formLogin.style.display = "block";

});


// LOGIN

formLogin.addEventListener("submit", (e) => {

    e.preventDefault();

    const email =
    formLogin.querySelector('input[type="text"]')
    .value.trim();

    const password =
    formLogin.querySelector('input[type="password"]')
    .value.trim();


    if(email === "" || password === ""){

        alert("Completa todos los campos");
        return;

    }


    const user =
    JSON.parse(localStorage.getItem("user"));


    if(user &&
    user.email === email &&
    user.password === password){

        pantallaLogin.style.display = "none";

        pantallaSeleccion.style.display = "flex";

    }else{

        alert("Datos incorrectos");

    }

});


// REDIRECCIONES

btnCliente.addEventListener("click", () => {

    window.location.href =
    "dashboard_cliente.html";

});

btnProveedor.addEventListener("click", () => {

    window.location.href =
    "dashboard_proveedor.html";

});