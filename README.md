# Librería Modular de Validación y Procesamiento: utileria.js

**Desarrollado por:** Zuriel Ramirez  
**Problema que resuelve:** Simplifica y centraliza la validación de formularios web y el procesamiento de datos del lado del cliente. Evita la acumulación de expresiones regulares y lógica repetitiva en las vistas (HTML), aislando las reglas de negocio en un núcleo limpio, reutilizable y fácil de auditar mediante la consola del navegador.

---

##  Instalación

Para integrar esta librería en cualquier proyecto web, basta con colocar el archivo `utileria.js` en tu directorio de scripts e incluir la siguiente etiqueta al final del archivo HTML, justo antes del cierre de la etiqueta `</body>`:

html
<script src="js/utileria.js"></script>
A continuación, se muestran los fragmentos de código real implementados en la librería y cómo se ejecutan dentro del sistema:
1. Validación de Correo Electrónico
Comprueba que el string cumpla con la estructura estándar de un email mediante expresiones regulares.
JavaScript
function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

// Ejemplo de uso en el sistema:
console.log(validarCorreo("correo@dominio.com")); // Retorna: true
console.log(validarCorreo("correo-invalido"));    // Retorna: false
2. Validación de Longitud Exacta (Teléfono)
Evalúa que la extensión de un campo sea estrictamente igual al parámetro requerido,允許 la captura libre en el HTML para atrapar errores por exceso o falta de dígitos.
JavaScript
function validarLongitud(numero, maxLongitud) {
    return String(numero).trim().length === maxLongitud;
}

// Ejemplo de uso en el sistema (Evaluando 10 dígitos obligatorios):
console.log(validarLongitud("9511234567", 10));    // Retorna: true
console.log(validarLongitud("9511234567890", 10)); // Retorna: false (Exceso)

3. Filtro de Solo Letras (Nombre)
Garantiza que cadenas destinadas a nombres propios no contengan números ni caracteres especiales dañinos.
JavaScript
function soloLetras(texto) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
}

// Ejemplo de uso en el sistema:
console.log(soloLetras("Zuriel Ramirez")); // Retorna: true
console.log(soloLetras("Zuriel123"));     // Retorna: false

4. Control de Seguridad en Contraseñas
Fuerza al usuario a cumplir con políticas de seguridad alta (mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial).
JavaScript
function validarPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    return regex.test(password);
}

// Ejemplo de uso en el sistema:
console.log(validarPassword("Temporal.1")); // Retorna: true
console.log(validarPassword("12345"));      // Retorna: false

5. Control de Edad y Restricción de Menores
Calcula la edad exacta restando los años y ajustando por meses/días pendientes. Posteriormente, evalúa el umbral legal.
JavaScript
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

// Ejemplo de uso en el sistema:
console.log(esMayorDeEdad("2000-05-15")); // Retorna: true

6. Optimización y Formateo de Texto (Sección Libre)
Elimina espacios duplicados accidentales y transforma la cadena a formato de nombre propio (Capital Letter).
JavaScript
function capitalizarTexto(texto) {
    return texto
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

// Ejemplo de uso en el sistema:
console.log(capitalizarTexto("   zuriel    ramirez  ")); // Retorna: "Zuriel Ramirez"

7. Formateo de Divisas Localizadas (Sección Libre)
Transforma entradas numéricas planas a strings con formato contable de Moneda Nacional (MXN).
JavaScript
function formatearMoneda(cantidad) {
    if (isNaN(cantidad)) return "$0.00";
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(cantidad);
}

// Ejemplo de uso en el sistema:
console.log(formatearMoneda(2550.5)); // Retorna: "$2,550.50"
