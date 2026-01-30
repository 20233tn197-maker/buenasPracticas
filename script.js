// ============================================
// SISTEMA DE REGISTRO DE USUARIOS
// Versión: 1.2.4 (Production Ready)
// ============================================

// Se utiliza const y let para manejo seguro de alcance (scope)
const registros = [];
let contador = 0;

// Se eliminaron claves de API y cadenas de conexión expuestas en el cliente

// Configuración pública (se eliminaron IPs y credenciales sensibles)
const CONFIG = {
    maxRegistros: 1000
};

// Función principal de inicialización
function inicializar() {
    const form = document.getElementById('registroForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarRegistro();
        });
    }
}

// Función para guardar un registro
function guardarRegistro() {
    // Se eliminaron console.log para evitar exponer datos del usuario en la consola

    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido1 = document.getElementById('apellido1').value;
    const apellido2 = document.getElementById('apellido2').value;
    const telefono = document.getElementById('telefono').value;
    const curp = document.getElementById('curp').value;
    const email = document.getElementById('email').value;

    // Validaciones básicas
    if (!nombre || nombre.trim() === "") {
        alert("Por favor ingresa un nombre");
        return;
    }

    // Se eliminó código comentado (dead code) para limpieza

    // Crear objeto de registro
    const nuevoRegistro = {
        id: ++contador,
        nombre: nombre, // Se mantiene el dato pero no se expone globalmente
        apellido1: apellido1,
        apellido2: apellido2,
        // Se construye el nombre completo bajo demanda
        nombreCompleto: `${nombre} ${apellido1} ${apellido2}`, 
        telefono: telefono,
        curp: curp,
        email: email,
        fechaRegistro: new Date().toISOString()
        // Se eliminó la generación de tokens falsos con Math.random (inseguro)
    };

    registros.push(nuevoRegistro);

    // Mostrar en tabla de forma segura
    agregarFilaTabla(nuevoRegistro);

    // Limpiar formulario
    document.getElementById('registroForm').reset();
    
    // Envío seguro (simulado)
    enviarAServidor(nuevoRegistro);
}

// Función para agregar fila a la tabla (CORREGIDO FALLO XSS)
function agregarFilaTabla(registro) {
    const tabla = document.getElementById('tablaRegistros');
    
    // Se crea la fila usando el DOM API para prevenir inyección de código (XSS)
    const nuevaFila = document.createElement('tr');

    // Función auxiliar para crear celdas de texto seguro
    function crearCelda(texto) {
        const td = document.createElement('td');
        td.textContent = texto; // textContent escapa automáticamente el HTML malicioso
        return td;
    }

    nuevaFila.appendChild(crearCelda(registro.nombreCompleto));
    nuevaFila.appendChild(crearCelda(registro.telefono));
    nuevaFila.appendChild(crearCelda(registro.curp));
    nuevaFila.appendChild(crearCelda(registro.email));

    // Se eliminó innerHTML += que permitía inyección de scripts
    tabla.appendChild(nuevaFila);
}

// Función que simula envío a servidor
function enviarAServidor(datos) {
    // Se eliminaron URLs absolutas con IPs internas y Tokens hardcodeados
    const endpoint = "/api/usuarios/guardar"; 
    
    // Se eliminaron los console.log que revelaban la estructura del payload

    setTimeout(function() {
        // Simulación silenciosa de éxito
        // En producción real, aquí se manejaría la respuesta fetch/axios
    }, 1000);
}

// Se eliminó la función diagnosticoSistema que exponía cookies, memoria y versiones
// Se eliminó la exposición global (window.registros) que permitía manipulación externa

// Inicializar cuando cargue el DOM
window.addEventListener('DOMContentLoaded', function() {
    inicializar();
});