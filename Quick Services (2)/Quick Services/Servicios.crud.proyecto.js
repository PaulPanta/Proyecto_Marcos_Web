// ===============================
// CRUD DE SERVICIOS - QuickService
// ===============================

// Cargar servicios desde localStorage o usar uno por defecto
var servicios = JSON.parse(localStorage.getItem('servicios')) || [
    {
        id: 1,
        nombre: 'Instalaciones eléctricas',
        categoria: 'Electricista',
        precio: 50,
        estado: 'Activo',
        desc: ''
    }
];

// Calcular el siguiente ID automáticamente
var nextId = servicios.length > 0
    ? Math.max.apply(null, servicios.map(function (s) { return s.id; })) + 1
    : 1;

var borrarId = null;
var modoEditar = false;

// Guardar en localStorage
function guardarEnLocalStorage() {
    localStorage.setItem('servicios', JSON.stringify(servicios));
}

// Generar badge de estado
function badgeHtml(estado) {
    if (estado === 'Activo') {
        return '<span class="badge bg-success">Activo</span>';
    }
    if (estado === 'Pausado') {
        return '<span class="badge bg-warning text-dark">Pausado</span>';
    }
    return '<span class="badge bg-secondary">' + estado + '</span>';
}

// Renderizar la tabla de servicios
function renderTabla() {
    var cuerpo = document.getElementById('cuerpo');
    var conteo = document.getElementById('conteo');

    if (!cuerpo || !conteo) return;

    var html = '';

    servicios.forEach(function (s) {
        html += '<tr>' +
            '<td class="text-muted">' + s.id + '</td>' +
            '<td>' + s.nombre + '</td>' +
            '<td class="d-none d-sm-table-cell text-muted">' + s.categoria + '</td>' +
            '<td>S/ ' + parseFloat(s.precio).toFixed(2) + '</td>' +
            '<td>' + badgeHtml(s.estado) + '</td>' +
            '<td class="text-end">' +
            '<button class="btn btn-sm btn-outline-secondary me-1" onclick="editarServicio(' + s.id + ')">&#9998;</button>' +
            '<button class="btn btn-sm btn-outline-danger" onclick="pedirBorrar(' + s.id + ')">&#10005;</button>' +
            '</td>' +
            '</tr>';
    });

    cuerpo.innerHTML = html;
    conteo.textContent = servicios.length > 0
        ? servicios.length + ' servicio' + (servicios.length !== 1 ? 's' : '')
        : 'Sin servicios';
}

// Abrir formulario para agregar
function abrirFormulario() {
    modoEditar = false;

    document.getElementById('form-titulo').textContent = 'Agregar servicio';

    var btnGuardar = document.getElementById('btn-guardar');
    if (btnGuardar) btnGuardar.textContent = 'Guardar';

    document.getElementById('inp-id').value = '';
    document.getElementById('inp-nombre').value = '';
    document.getElementById('inp-categoria').value = '';
    document.getElementById('inp-precio').value = '';
    document.getElementById('inp-estado').value = 'Activo';
    document.getElementById('inp-desc').value = '';

    var alerta = document.getElementById('alerta');
    if (alerta) alerta.classList.add('d-none');

    document.getElementById('formulario').style.display = 'block';
    document.getElementById('modal-borrar').style.display = 'none';
}

// Cerrar formulario
function cerrarFormulario() {
    document.getElementById('formulario').style.display = 'none';
}

// Editar servicio existente
function editarServicio(id) {
    var s = servicios.find(function (x) { return x.id === id; });
    if (!s) return;

    modoEditar = true;

    document.getElementById('form-titulo').textContent = 'Editar servicio';

    var btnGuardar = document.getElementById('btn-guardar');
    if (btnGuardar) btnGuardar.textContent = 'Actualizar';

    document.getElementById('inp-id').value = s.id;
    document.getElementById('inp-nombre').value = s.nombre;
    document.getElementById('inp-categoria').value = s.categoria;
    document.getElementById('inp-precio').value = s.precio;
    document.getElementById('inp-estado').value = s.estado;
    document.getElementById('inp-desc').value = s.desc;

    var alerta = document.getElementById('alerta');
    if (alerta) alerta.classList.add('d-none');

    document.getElementById('formulario').style.display = 'block';
    document.getElementById('modal-borrar').style.display = 'none';
    document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' });
}

// Guardar o actualizar servicio
function guardarServicio() {
    var nombre = document.getElementById('inp-nombre').value.trim();
    var categoria = document.getElementById('inp-categoria').value;
    var precio = parseFloat(document.getElementById('inp-precio').value);
    var estado = document.getElementById('inp-estado').value;
    var desc = document.getElementById('inp-desc').value.trim();
    var alerta = document.getElementById('alerta');

    if (!nombre || !categoria || isNaN(precio)) {
        alerta.textContent = 'Completa nombre, categoría y precio.';
        alerta.classList.remove('d-none');
        return;
    }

    if (precio <= 0) {
        alerta.textContent = 'El precio debe ser mayor a 0.';
        alerta.classList.remove('d-none');
        return;
    }

    alerta.classList.add('d-none');

    if (modoEditar) {
        var id = parseInt(document.getElementById('inp-id').value);
        var servicio = servicios.find(function (x) { return x.id === id; });

        if (servicio) {
            servicio.nombre = nombre;
            servicio.categoria = categoria;
            servicio.precio = precio;
            servicio.estado = estado;
            servicio.desc = desc;
        }
    } else {
        servicios.push({
            id: nextId++,
            nombre: nombre,
            categoria: categoria,
            precio: precio,
            estado: estado,
            desc: desc
        });
    }

    guardarEnLocalStorage();
    renderTabla();
    cerrarFormulario();
}

// Solicitar eliminación
function pedirBorrar(id) {
    var s = servicios.find(function (x) { return x.id === id; });
    if (!s) return;

    borrarId = id;
    document.getElementById('modal-nombre').textContent = s.nombre;
    document.getElementById('modal-borrar').style.display = 'block';
    document.getElementById('formulario').style.display = 'none';
}

// Cerrar modal de eliminación
function cerrarModal() {
    document.getElementById('modal-borrar').style.display = 'none';
    borrarId = null;
}

// Confirmar eliminación
function confirmarBorrar() {
    servicios = servicios.filter(function (x) { return x.id !== borrarId; });
    guardarEnLocalStorage();
    renderTabla();
    cerrarModal();
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
    renderTabla();
});