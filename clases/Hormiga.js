class Hormiga {
	constructor(mapa) {
		this.mapa = mapa;
		this.tour = [];
		this.largo = mapa.data.length;
		this.visitados = Array(this.largo).fill(false);
		this.candidatos = [];
		this.ciudadActual = null;
	}

	getRandom = (largo) => {
		return Math.floor(Math.random() * largo);
	};

	mover(CANTIDAD_CANDIDATOS) {
		// La hormiga ya está en una ciudad aleatoria, ahora debo generar los candidatos para que se mueva a la siguiente ciudad
		this.candidatos = [];

		// Obtengo los candidatos para la ciudad actual
		const candidatos = this.mapa.computarCandidatos(CANTIDAD_CANDIDATOS);

		// Ahora vamos a ver candidato por candidato si puedo avanzar por ese camino
		for (let i = 0; i < candidatos[this.ciudadActual].length; i++) {
			const candidato = candidatos[this.ciudadActual][i];
			if (!this.visitados[candidato]) {
				this.candidatos.push(candidato);
			}
		}

		// Si no hay candidatos, entonces debo ir a una ciudad aleatoria
		if (this.candidatos.length === 0) {
			let posible = this.getRandom(this.largo - 1);
			while (this.visitados[posible]) {
				posible = (posible + 1) % this.largo;
			}
			this.ciudadActual = posible;
		} else {
			// Si hay candidatos, entonces debo elegir uno de ellos
			// const aleatorio = this.getRandom(this.candidatos.length - 1);
			// this.ciudadActual = this.candidatos[aleatorio];
			// Si hay candidatos, entonces debo elegir uno de ellos usando un método probabilístico basado en feromonas
			const probabilidades = [];
			let sumProb = 0;

			// Calcular probabilidades basadas en feromonas
			for (let i = 0; i < this.candidatos.length; i++) {
				const candidato = this.candidatos[i];
				const feromonas = this.mapa.getFeromonas(this.ciudadActual, candidato);
				console.log(
					`Feromonas de ${this.ciudadActual} a ${candidato}: `,
					feromonas,
				);
				const probabilidad = feromonas; // Aquí puedes ajustar la influencia de las feromonas
				probabilidades.push(probabilidad);
				sumProb += probabilidad;
			}

			// Normalizar las probabilidades
			for (let i = 0; i < probabilidades.length; i++) {
				probabilidades[i] /= sumProb;
			}

			// Seleccionar un candidato basado en las probabilidades
			let random = Math.random();
			let acumulado = 0;
			for (let i = 0; i < probabilidades.length; i++) {
				acumulado += probabilidades[i];
				if (random <= acumulado) {
					this.ciudadActual = this.candidatos[i];
					break;
				}
			}
		}

		// Ahora marco la ciudad como visitada
		this.visitados[this.ciudadActual] = true;

		// Guardo la ciudad actual en el tour
		this.tour.push(this.ciudadActual);
	}
}

module.exports = Hormiga;
