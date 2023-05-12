// Selecciona el botón con el id "btnPresupuesto" del HTML y lo almacena en la variable
var presupuestoClick = document.querySelector('#btnPresupuesto');
// Selecciona el botón con el id "btnGasto" del HTML y lo almacena en la variable gastoClick.
var gastoClick = document.querySelector('#btnGasto');
// Selecciona la tabla con el id "detalleGastos" y su elemento tbody del HTML y lo almacena en la variable detalleGastoBody.
var detalleGastoBody = document.querySelector('#detalleGastos, #trGastos');
// Crea un arreglo vacío y lo almacena en la variable resultadoGasto
var resultadoGasto = [];


// Crea una función constructora Gasto que recibe dos parámetros: nombre y monto.
function Gasto(nombre, monto) {
    // Crea una propiedad nombre en el objeto Gasto actual y le asigna el valor del parámetro nombre
    this.nombre = nombre;
    // Crea una propiedad monto en el objeto Gasto actual y le asigna el valor del parámetro monto.
    this.monto = monto;
}


// Agrega un evento de escucha al botón presupuestoClick para el evento click, que ejecutará la función presupuestoIngresado cuando se haga clic en el botón.
presupuestoClick.addEventListener('click', presupuestoIngresado);
// Agrega un evento de escucha al botón gastoClick para el evento click, que ejecutará la función gastoIngresado cuando se haga clic en el botón.
gastoClick.addEventListener('click', gastoIngresado);
// Ejecuta la función resultadoGasto cada 100 milisegundos, actualizando los resultados de los gastos en la página.
setInterval(resultadoGasto, 100);


function presupuestoIngresado() {
    // Selecciona el elemento con el id "inputPresupuesto" del HTML y lo almacena en la variable presupuesto.
    var presupuesto = document.querySelector('#inputPresupuesto');
    // esta línea selecciona el elemento del documento HTML con el id presupuesto y lo almacena en la variable presupuestoMostrado.
    var presupuestoMostrado = document.querySelector('#presupuesto');
    // esta línea establece el contenido HTML del elemento presupuestoMostrado a la cadena '$' + presupuesto.value, que es el valor del input inputPresupuesto precedido por un signo de dólar. Esto sirve para mostrar el valor del presupuesto ingresado por el usuario.
    presupuestoMostrado.innerHTML = '$' + presupuesto.value;
    // esta línea establece el valor del input inputPresupuesto a una cadena vacía, borrando así el valor que el usuario había ingresado previamente.
    presupuesto.value = '';
}


function gastoIngresado() {
    // Se utiliza document.querySelector() para seleccionar el elemento de HTML con el ID inputGasto y se almacena en la variable cifraGasto.
    var cifraGasto = document.querySelector('#inputGasto');
    // Se utiliza document.querySelector() para seleccionar el elemento de HTML con el ID textGasto y se almacena en la variable textoGasto.
    var textoGasto = document.querySelector('#textGasto');
    // Se utiliza document.querySelector() para seleccionar el elemento de HTML con el ID detalleGastos y se almacena en la variable detalleGasto.
    var detalleGasto = document.querySelector('#detalleGastos');
    // Se crea un nuevo objeto Gasto utilizando la función constructora Gasto() y se le pasa el valor de textoGasto.value y cifraGasto.value como argumentos para asignar el nombre y monto del gasto respectivamente. Luego, el objeto gasto se almacena en la variable gasto.
    var gasto = new Gasto(textoGasto.value, cifraGasto.value);
    // El objeto gasto se agrega al final del arreglo resultadoGasto.
    resultadoGasto.push(gasto);
    actualizarResultadoGasto();

    // Se crea un nuevo elemento de tabla HTML <tr> utilizando la función document.createElement(), y se almacena en la variable filanueva.
    var filanueva = document.createElement('tr');
    // Se crea un nuevo elemento de tabla HTML <td> utilizando la función document.createElement(), y se almacena en la variable cajaNombre.
    var cajaNombre = document.createElement('td');
    // Se crea un nuevo elemento de tabla HTML <td> utilizando la función document.createElement(), y se almacena en la variable cajaValor.
    var cajaValor = document.createElement('td');
    // Se crea un nuevo elemento de tabla HTML <td> utilizando la función document.createElement(), y se almacena en la variable cajaEliminar.
    var cajaEliminar = document.createElement('td');
    // Se crea un nuevo elemento de botón HTML <button> utilizando la función document.createElement(), y se almacena en la variable btnEliminar.
    var btnEliminar = document.createElement('button');

    // El valor del nombre del objeto gasto se asigna al contenido de texto del elemento cajaNombre.
    cajaNombre.textContent = gasto.nombre;
    // El valor del monto del objeto gasto se convierte a un número entero utilizando parseInt(), y se concatena con el símbolo $ para mostrarlo como una cantidad de dinero. Luego, el resultado se asigna al contenido de texto del elemento cajaValor.
    cajaValor.textContent = '$' + parseInt(gasto.monto);
    // Se agrega la clase button al elemento btnEliminar.
    btnEliminar.classList.add('button');
    // Se agrega el elemento btnEliminar al elemento cajaEliminar como un hijo.
    cajaEliminar.append(btnEliminar);
    // Se agrega el elemento cajaNombre al elemento filanueva como un hijo.
    filanueva.append(cajaNombre);
    // Se agrega la celda "cajaValor" a la fila "filanueva".
    filanueva.append(cajaValor);
    // Se agrega la celda "cajaEliminar" a la fila "filanueva".
    filanueva.append(cajaEliminar);
    // Se agrega la fila "filanueva" a la tabla de detalles de gastos.
    detalleGastoBody.append(filanueva);
    // Se limpia el valor del input "textGasto".
    textoGasto.value = '';
    // Se limpia el valor del input "inputGasto".
    cifraGasto.value = '';

    // Se agrega un escucha de eventos al botón de eliminar que realiza las siguientes acciones al hacer clic:
    btnEliminar.addEventListener('click', function () {
        // línea elimina la fila de la tabla a la que pertenece el botón de eliminar. Para ello, primero se accede al nodo padre de la fila (el elemento <tbody> de la tabla) mediante la propiedad parentNode, y luego se utiliza el método removeChild() para eliminar la fila.
        filanueva.parentNode.removeChild(filanueva);
        // línea actualiza el array resultadoGasto, eliminando el objeto Gasto correspondiente al botón que se ha hecho clic en él. Esto se hace utilizando el método splice() del array, pasando como argumentos el índice del elemento a eliminar y el número 1, que indica que solo se debe eliminar un elemento del array.
        resultadoGasto.splice(resultadoGasto.indexOf(gasto), 1);
        actualizarResultadoGasto();
    });
}
// define una función llamada totalGastos usando la sintaxis de función de flecha (=>).
var totalGastos = () => {
    var total = 0;
    for (var i = 0; i < resultadoGasto.length; i++) {
        total += parseFloat(resultadoGasto[i].monto);
    }
    return "$" + total
};

function actualizarResultadoGasto() {
    // busca el elemento en el DOM con el id presupuesto y lo almacena en la variable presupuesto.
    var presupuesto = document.querySelector('#presupuesto');
    // busca el elemento en el DOM con el id gastos y lo almacena en la variable gastos.
    var gastos = document.querySelector('#gastos');
    // Esta línea busca el elemento en el DOM con el id saldo y lo almacena en la variable saldo.
    var saldo = document.querySelector('#saldo');
    // llama a la función totalGastos, obtiene el resultado y lo convierte a un número entero usando la función parseInt. Luego, se quita el signo $ de la cadena resultante con el método replace.
    var sumatoria = parseInt(totalGastos().replace('$', ''));
    // establece el contenido HTML del elemento gastos con la cadena $ concatenada con sumatoria
    gastos.innerHTML = '$' + sumatoria
    // establece el contenido HTML del elemento saldo con la cadena $ concatenada con la diferencia entre el valor numérico del contenido HTML del elemento presupuesto y sumatoria.
    saldo.innerHTML = '$' + (parseInt(presupuesto.innerHTML.replace('$', '')) - sumatoria)
    // comprueba si el valor numérico del contenido HTML del elemento saldo, después de quitar el signo $, es menor que 0.
    if (parseInt(saldo.innerHTML.replace('$', '')) < 0) {
        // establece el color de texto del elemento saldo en rojo si la condición anterior se cumple.
        saldo.style.color = 'red';
    } else {
        // establece el color de texto del elemento saldo en verde.
        saldo.style.color = 'green';
    }
}
