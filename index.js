const Mapa = require("./clases/Mapa");
const Hormiga = require("./clases/Hormiga");

const mapa = new Mapa("berlin52.dat");

const CANTIDAD_CANDIDATOS = 10;
const CANTIDAD_HORMIGAS = 25;

let hormigas = [];

for (let i = 0; i < CANTIDAD_HORMIGAS; i++) {
	const hormiga = new Hormiga(mapa);
	hormigas.push(hormiga);
}

for (let i = 0; i < CANTIDAD_HORMIGAS; i++) {
	const ciudadRandom = Math.floor(Math.random() * mapa.data.length);
	hormigas[i].ciudadActual = ciudadRandom;
	console.log(`Ciudad random para la hormiga ${i + 1}: `, ciudadRandom);
	for (let j = 0; j < mapa.data.length; j++) {
		hormigas[i].mover(CANTIDAD_CANDIDATOS);
	}

	console.log(`Tour de la hormiga ${i + 1}: `, hormigas[i].tour.length);
	console.log("-------------------------------");
}
