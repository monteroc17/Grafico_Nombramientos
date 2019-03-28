import '../css/main.css';
import Datos from "./datos";

const datos = new Datos();
let buttonDia = document.getElementById('btnDia');
let buttonMes = document.getElementById('btnMes');
let buttonAno = document.getElementById('btnAno');

buttonDia.onclick = datos.cargarGrafico(datos.obtenerDatos);
buttonMes.onclick = datos.cargarGrafico(datos.filtrarPorMes);
buttonAno.onclick = datos.cargarGrafico(datos.filtrarPorAño);

datos.cargarGrafico(datos.obtenerDatos());

console.log('data', datos.obtenerDatos());



