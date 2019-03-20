import '../css/main.css';
import Datos from "./datos";


const datos = new Datos();


console.log('data', datos.obtenerDatos());
let inicio = '2019-02-11'; let fin = '2019-03-11';
console.log('Filtro por mes: ' + inicio + ' -> ' + fin, datos.filtrarPorMes(inicio, fin));
console.log('Filtro por año: ' + inicio + ' -> ' + fin, datos.filtrarPorAño(inicio, fin));



