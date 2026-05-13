// =========================
// ELEMENTOS
// =========================

const formLogin =
document.getElementById("formLogin");

const formRegistro =
document.getElementById("formRegistro");

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


// =========================
// PRUEBA DE SCRIPT
// =========================

alert("SCRIPT CARGADO CORRECTAMENTE");


// =========================
// CAMBIAR FORMULARIOS
// =========================

btnMostrarRegistro.addEventListener("click", () => {

    formLogin.style.display = "none";

    formRegistro.style.display = "block";

});

btnMostrarLogin.addEventListener("click", () => {

    formRegistro.style.display = "none";

    formLogin.style.display = "block";

});


// =========================
// VALIDAR CONTRASEÑA
// =========================

function validarPassword(password){

    return password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password);

}


// =========================
// REGISTRO
// =========================

formRegistro.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombre =
    document.getElementById("registroNombre").value.trim();

    const email =
    document.getElementById("registroEmail").value.trim();

    const password =
    document.getElementById("registroPassword").value.trim();


    if(nombre === "" ||
    email === "" ||
    password === ""){

        alert("Completa todos los campos");
        return;

    }


    if(!email.includes("@")){

        alert("Correo inválido");
        return;

    }


    if(!validarPassword(password)){

        alert(
        "La contraseña debe tener mayúscula, minúscula y número"
        );

        return;

    }


    const usuario = {

        nombre: nombre,
        email: email,
        password: password

    };


    console.log(usuario);


    try{

        const response = await fetch(
        "http://localhost:8080/registro", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(usuario)

        });


        const data =
        await response.text();

        console.log(data);

        alert(data);

        formRegistro.reset();

        formRegistro.style.display = "none";

        formLogin.style.display = "block";

    }catch(error){

        console.log(error);

        alert("Error al registrar");

    }

});


// =========================
// LOGIN
// =========================

formLogin.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
    document.getElementById("loginEmail").value.trim();

    const password =
    document.getElementById("loginPassword").value.trim();


    if(email === "" || password === ""){

        alert("Completa todos los campos");
        return;

    }


    try{

        const response = await fetch(
        "http://localhost:8080/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                email: email,
                password: password

            })

        });


        const data =
        await response.text();

        console.log(data);


        if(data === "ok"){

            pantallaLogin.style.display = "none";

            pantallaSeleccion.style.display = "flex";

        }else{

            alert("Datos incorrectos");

        }

    }catch(error){

        console.log(error);

        alert("Error de conexión");

    }

});


// =========================
// REDIRECCIONES
// =========================

btnCliente.addEventListener("click", () => {

    window.location.href =
    "dashboard_cliente.html";

});

btnProveedor.addEventListener("click", () => {

    window.location.href =
    "dashboard_proveedor.html";

});