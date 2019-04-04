
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

    tempID = remplazo2;
    return tempID;
}

function crearBarra(elemento) {
    var IDNombramiento = limpiarIDNombramiento(elemento.ridnombramientos);
    var mensaje = document.createElement('span');
    mensaje.className = 'popUpInformativo';
    mensaje.innerText = 'Nombramiento: ' +
        IDNombramiento + '\nFecha: ' + elemento.rdia + '\nUso: ' + elemento.rporcentaje + '%';

    var barra = document.createElement('div');
    barra.style.height = Math.floor(parseInt(elemento.rporcentaje) / 2) + '%';
    barra.appendChild(mensaje);
    return barra
}

/**
 * carga programaticamente el JSON en el html
 * @param {object} datos 
 */
function cargarGraficoPorDias() {
    this.limpiarGrafico();
    let container = document.getElementById('chartDiv');

    for (var i = 0; i < datos.length; i++) {

        /* Se obtiene información a mostrar en el popUpInformativo */
        var barra = this.crearBarra(datos[i]);

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
    this.limpiarGrafico();
    console.log(lista)
    // con los meses se obtiene el nombre de los keys necesarios para obtener los datos
    let container = document.getElementById('chartDiv');
    lista.forEach((elemento, i) => {
        console.log(i)
        var barraMenor = this.crearBarra(elemento['mes' + i][0]);
        barraMenor.style.height = Math.floor(parseInt(elemento['mes' + i][0].rporcentaje) / 2) + '%';
        console.log('MENOR', elemento['mes' + i][0].rporcentaje);
        if (elemento['mes' + i][0].rporcentaje > 100) {
            barraMenor.className = 'redFill';
        } else if (elemento['mes' + i][0].rporcentaje < 100) {
            barraMenor.className = 'yellowFill';
        } else {
            barraMenor.className = 'greenFill';
        }
        var barraMayor = this.crearBarra(elemento['mes' + i][1]);
        console.log('MAYOR', elemento['mes' + i][1].rporcentaje);
        barraMayor.style.height = Math.floor(parseInt(elemento['mes' + i][1].rporcentaje) / 2) + '%';
        if (elemento['mes' + i][1].rporcentaje > 100) {
            barraMayor.className = 'redFill';
        } else if (elemento['mes' + i][1].rporcentaje < 100) {
            barraMayor.className = 'yellowFill';
        } else {
            barraMayor.className = 'greenFill';
        }
        var tempDivMenor = document.createElement('div');
        tempDivMenor.className = 'tub';
        tempDivMenor.appendChild(barraMenor);
        var tempDivMayor = document.createElement('div');
        tempDivMayor.className = 'tub';
        tempDivMayor.appendChild(barraMayor);
        container.appendChild(tempDivMenor);
        container.appendChild(tempDivMayor);
    });
}

/**
 * Carga la lista filtrada por meses
 * @param {object} lista 
 */
function cargarGraficoPorAños(lista) {
    this.limpiarGrafico();
    console.log(lista)
    // con los meses se obtiene el nombre de los keys necesarios para obtener los datos
    let container = document.getElementById('chartDiv');
    lista.forEach((elemento, i) => {
        var barraMenor = this.crearBarra(elemento['año' + i][0]);
        barraMenor.style.height = Math.floor(parseInt(elemento['año' + i][0].rporcentaje) / 2) + '%';
        console.log('MENOR', elemento['año' + i][0].rporcentaje);
        if (elemento['año' + i][0].rporcentaje > 100) {
            barraMenor.className = 'redFill';
        } else if (elemento['año' + i][0].rporcentaje < 100) {
            barraMenor.className = 'yellowFill';
        } else {
            barraMenor.className = 'greenFill';
        }
        var barraMayor = this.crearBarra(elemento['año' + i][1]);
        console.log('MAYOR', elemento['año' + i][1].rporcentaje);
        barraMayor.style.height = Math.floor(parseInt(elemento['año' + i][1].rporcentaje) / 2) + '%';
        if (elemento['año' + i][1].rporcentaje > 100) {
            barraMayor.className = 'redFill';
        } else if (elemento['año' + i][1].rporcentaje < 100) {
            barraMayor.className = 'yellowFill';
        } else {
            barraMayor.className = 'greenFill';
        }
        var tempDivMenor = document.createElement('div');
        tempDivMenor.className = 'tub';
        tempDivMenor.appendChild(barraMenor);
        var tempDivMayor = document.createElement('div');
        tempDivMayor.className = 'tub';
        tempDivMayor.appendChild(barraMayor);
        container.appendChild(tempDivMenor);
        container.appendChild(tempDivMayor);
    });
}

/**
 * filtra el JSON por mes
 */
function filtrarPorMes() {
    let meses = this.obtenerMeses();
    let res = [];
    meses.forEach((mes, index) => {
        let msg = "mes" + index
        res.push({
            [msg]: this.obtenerValores(datos.filter(elemento => {
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
    let años = this.obtenerAños();
    let res = [];
    años.forEach((año, index) => {
        let msg = "año" + index
        res.push({
            [msg]: this.obtenerValores(datos.filter(elemento => {
                return elemento.rdia.split('-')[0] === año; // filtra la lista por mes
            }))
        });
    });
    console.log('por anio ')
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

function scroll()
{
    const slider = document.getElementById('chartDiv');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
}


let buttonDia = document.getElementById('btnDia');
let buttonMes = document.getElementById('btnMes');
let buttonAno = document.getElementById('btnAno');

// buttonDia.onclick = cargarGrafico(datos);
// buttonMes.onclick = cargarGrafico(filtrarPorMes());
// buttonAno.onclick = cargarGrafico(filtrarPorAño());

cargarGraficoPorDias(datos);
scroll();



