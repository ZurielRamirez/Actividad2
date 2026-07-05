/**
 * UTILERÍA JS - Librería de validaciones y utilidades nativas
 * Autor: Zuriel Ramirez
 */

// ==========================================
// PARTE OBLIGATORIA: 6 Funciones Core
// ==========================================

function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

function soloLetras(texto) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
}

function validarLongitud(numero, maxLongitud) {
    return String(numero).trim().length === maxLongitud;
}

function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const cumpleanos = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const mes = hoy.getMonth() - cumpleanos.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}

function esMayorDeEdad(fechaNacimiento) {
    return calcularEdad(fechaNacimiento) >= 18;
}

function validarPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    return regex.test(password);
}

// ==========================================
// SECCIÓN LIBRE: 2 Funciones Adicionales
// ==========================================

// 1. Formatear números a Moneda Nacional (MXN)
function formatearMoneda(cantidad) {
    if (isNaN(cantidad)) return "$0.00";
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(cantidad);
}

// 2. Limpiar espacios extras y capitalizar nombres propios de alumnos
function capitalizarTexto(texto) {
    return texto
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}