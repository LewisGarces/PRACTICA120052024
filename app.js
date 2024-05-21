// Definición de la función calcular
const calcular = () => {
    // Obtenemos el valor ingresado en el input
    const entrada = document.getElementById("numbers").value;
    // Dividimos la entrada por comas y la convertimos en un array de números
    const numeros = entrada.split(",").map(num => parseFloat(num.trim())); //analiza un argumento y devuelve un número de punto flotante

    // Verificamos si hay algún valor NaN en el array de números
    if (numeros.some(isNaN)) { //funcion en callback 
        // Si hay al menos un NaN, mostramos una advertencia y salimos de la función
        Swal.fire({
            title: 'Advertencia',
            text: 'Por favor, ingresa números válidos.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Verificamos si el array de números está vacío
    if (numeros.length === 0) {
        // Si no se ha ingresado ningún número, mostramos una advertencia y salimos de la función
        Swal.fire({
            title: 'Advertencia',
            text: 'Por favor, ingresa al menos un número.',
            icon: 'Erroneo',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Si todo está bien, mostramos una advertencia de confirmación antes de calcular los resultados
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se mostrarán los resultados de los cálculos.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, mostrar resultados',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        // Si el usuario confirma, procedemos a calcular y mostrar los resultados
        if (result.isConfirmed) {
            // Calculamos la suma de los números
            const suma = numeros.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
            // Calculamos la media
            const media = suma / numeros.length;
        
            // Calculamos la moda
            const moda = calcularModa(numeros);
            // Calculamos la mediana
            const mediana = calcularMediana(numeros);
        
            // Mostramos los resultados
            mostrarResultados(media, moda, mediana);
        }
    });
}

// Definición de la función calcularModa
const calcularModa = (numeros) => {
    const frecuencias = {};
    let moda = [];
    let frecuenciaMaxima = 0;

    // Contamos la frecuencia de cada número y encontramos el que tiene la frecuencia máxima
    numeros.forEach(numero => {
        frecuencias[numero] = (frecuencias[numero] || 0) + 1;

        if (frecuencias[numero] > frecuenciaMaxima) {
            moda = [numero];
            frecuenciaMaxima = frecuencias[numero];
        } else if (frecuencias[numero] === frecuenciaMaxima) {
            moda.push(numero);
        }
    });

    return moda; // Devolvemos la moda
}

// Definición de la función calcularMediana
const calcularMediana = (numeros) => {
    const numerosOrdenados = numeros.slice().sort((a, b) => a - b);
    const indiceMedio = Math.floor(numerosOrdenados.length / 2); //redondea un número al múltiplo o al entero inferior más próximo de la cifra significativa especificada.

    // Si la cantidad de números es par, la mediana es el promedio de los dos números del medio
    if (numerosOrdenados.length % 2 === 0) {
        return (numerosOrdenados[indiceMedio - 1] + numerosOrdenados[indiceMedio]) / 2;
    } else {
        // Si la cantidad de números es impar, la mediana es el número en el medio
        return numerosOrdenados[indiceMedio];
    }
}

// Definición de la función mostrarResultados
const mostrarResultados = (media, moda, mediana) => {
    // Construimos el mensaje con los resultados
    let modaMensaje = moda.length === 1 ? moda[0] : moda.join(", ");
    const mensaje = ` Los resultados estadisticos son: 

        <p>  
        <p>Media: ${media}
        <p>Moda: ${modaMensaje}
        <p>Mediana: ${mediana}
    `;
    
    // Mostramos los resultados en un cuadro de diálogo de éxito
    Swal.fire({
        title: '¡Resultados exitosos!',
        html: mensaje,
        icon: 'success',
        confirmButtonText: 'OK'
    });
}
