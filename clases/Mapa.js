const fs = require("fs");
class Mapa {
	constructor(filename) {
		this.data = [];
		this.feromonas = [];
		if (filename) {
			this.loadFromFile(filename);
		}
	}

	loadFromFile(filename) {
		const data = fs.readFileSync(`./datos/${filename}`, "utf8");
		this.data = JSON.parse(data);

		this.feromonas = this.data.map((row) => row.map(() => 1.0));
	}

	getSize() {
		return this.data.length;
	}

	computarCandidatos(TAMVEC) {
		const n = this.data.length;
		let candidatosDeNodo = [];

		for (let i = 0; i < n; i++) {
			const cola = [];
			for (let j = 0; j < n; j++) {
				if (i === j) continue;
				cola.push([this.data[i][j], j]);
			}
			cola.sort((a, b) => a[0] - b[0]);

			const candidatos = [];
			for (let k = 0; k < TAMVEC; k++) {
				const [peso, nodo] = cola[k];
				candidatos.push(nodo);
			}
			candidatosDeNodo.push(candidatos);
		}

		return candidatosDeNodo;
	}

	// Método para obtener la cantidad de feromonas entre dos ciudades
	getFeromonas(ciudadActual, ciudadDestino) {
		return this.feromonas[ciudadActual][ciudadDestino];
	}

	// Método para obtener la distancia entre dos ciudades
	getDistancia(ciudadActual, ciudadDestino) {
		return this.data[ciudadActual][ciudadDestino];
	}

	// Método para actualizar las feromonas entre dos ciudades
	actualizarFeromonas(ciudadActual, ciudadDestino, valor) {
		this.feromonas[ciudadActual][ciudadDestino] = valor;
	}
}

module.exports = Mapa;
