
function limpiarGrafico() {
    var node = document.getElementById('chartDiv');
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

function limpiarIDNombramiento(ID) {
    let tempID = ID;
    let remplazo1 = tempID.replace("{", "");
    let remplazo2 = remplazo1.replace("}", "");

    tempID=remplazo2;
    return tempID;
}

/**
 * carga programaticamente el JSON en el html
 * @param {object} datos 
 */
function cargarGrafico() {
    let container = document.getElementById('chartDiv');
    
    for (var i = 0; i < datos.length; i++) {
        
        var IDNombramiento = limpiarIDNombramiento(datos[i].ridnombramientos);
        var mensaje = document.createElement('span');
        mensaje.className = 'tooltipInfo';
        mensaje.innerText = 'Día: ' + datos[i].rdia + '\nNombramiento: ' + IDNombramiento;

        var barra = document.createElement('div');
        barra.style.height = Math.floor(parseInt(datos[i].rporcentaje) / 2) + '%';
        barra.appendChild(mensaje);

        if (datos[i].rporcentaje > 100) {
            barra.className = 'redFill';
        } else if (datos[i].rporcentaje < 100) {
            barra.className = 'yellowFill';
        } else {
            barra.className = 'greenFill';
        }
        var tempDiv = document.createElement('div');
        tempDiv.className = 'tub';
        tempDiv.appendChild(barra);
        container.appendChild(tempDiv);
    }
}

/**
 * Carga la lista filtrada por meses
 * @param {object} lista 
 */
function cargarGraficoPorMeses(lista) {
    let meses = obtenerMeses();
    // con los meses se obtiene el nombre de los keys necesarios para obtener los datos
    let container = document.getElementById('chartDiv');
    for (var i = 0; i < lista.length; i++) {
        var barraMenor = document.createElement('div');
        barraMenor.style.height = Math.floor(parseInt(lista[i].rporcentaje) / 2) + '%';
        if (lista[i].rporcentaje > 100) {
            barraMenor.className = 'redFill';
        } else if (lista[i].rporcentaje < 100) {
            barraMenor.className = 'yellowFill';
        } else {
            barraMenor.className = 'greenFill';
        }
        var barraMayor = document.createElement('div');
        barraMayor.style.height = Math.floor(parseInt(lista[i].rporcentaje) / 2) + '%';
        if (lista[i].rporcentaje > 100) {
            barraMayor.className = 'redFill';
        } else if (lista[i].rporcentaje < 100) {
            barraMayor.className = 'yellowFill';
        } else {
            barraMayor.className = 'greenFill';
        }
        var tempDiv = document.createElement('div');
        tempDiv.className = 'tub';
        tempDiv.appendChild(barraMenor);
        container.appendChild(tempDiv);
    }
}

/**
 * filtra el JSON por mes
 */
function filtrarPorMes() {
    this.limpiarGrafico();
    let meses = obtenerMeses();
    let res = [];
    meses.forEach(mes => {
        res.push({
            [mes]: this.obtenerValores(datos.filter(elemento => {
                return elemento.rdia.split('-')[1] === mes; // filtra la lista por mes
            }))
        });
    });
    console.log('por mes ', res.keys.toString())
    return res;
}

/**
 * filtra el JSON por año
 */
function filtrarPorAño() {
    this.limpiarGrafico();
    let años = obtenerAños();
    let res = [];
    años.forEach(año => {
        res.push({
            [año]: this.obtenerValores(datos.filter(elemento => {
                return elemento.rdia.split('-')[0] === año; // filtra la lista por mes
            }))
        });
    });
    console.log('por anio ', res[0]['2019'])
    return res;
}

/**
 * retorna una lista con todos los años del JSON
 */
function obtenerAños() {
    let años = [];
    datos.forEach(e => {
        años.push(e.rdia.split('-')[0]);
    });
    if (años.length > 1) {
        años = años.sort().filter((item, pos, ary) => {
            return !pos || item != ary[pos - 1];
        });
    }
    return años
}

/**
 * retorna una lista con todos los meses del JSON
 */
function obtenerMeses() {
    let meses = [];
    datos.forEach(e => {
        meses.push(e.rdia.split('-')[1]);
    });
    meses = meses.sort().filter((item, pos, ary) => {
        return !pos || item != ary[pos - 1];
    });
    return meses;
}

/**
 * Obtiene el porcentaje minimo y maximo de una lista dada
 * @param {object} lista 
 */
function obtenerValores(lista) {
    return [this.obtenerMenor(lista), this.obtenerMayor(lista)];
}

/**
 * obtiene el elemento menor del JSON
 * @param {object} lista 
 */
function obtenerMenor(lista) {
    let elementoMin;
    let min = 200;
    lista.forEach(elemento => {
        if (parseInt(elemento.rporcentaje) <= min) {
            elementoMin = elemento;
            min = elemento.rporcentaje;
        }
    });
    return elementoMin;
}

/**
 * obtiene el elemento mayor del JSON
 * @param {object} lista 
 */
function obtenerMayor(lista) {
    let elementoMax;
    let max = 0;
    lista.forEach(elemento => {
        if (parseInt(elemento.rporcentaje) >= max) {
            elementoMax = elemento;
            max = elemento.rporcentaje;
        }
    });
    return elementoMax;
}


let buttonDia = document.getElementById('btnDia');
let buttonMes = document.getElementById('btnMes');
let buttonAno = document.getElementById('btnAno');

// buttonDia.onclick = cargarGrafico(datos);
// buttonMes.onclick = cargarGrafico(filtrarPorMes());
// buttonAno.onclick = cargarGrafico(filtrarPorAño());

cargarGrafico(datos);



