const seasonResults = async (season) => {
    if (season.length < 4) {
        return;
    }

    const URL = `https://ergast.com/api/f1/${season}/results.json?limit=320`;

    try {
        const app = document.getElementById('app');
        app.innerHTML = 'Cargando...';

        const res = await fetch(URL);
        const data = await res.json();

        app.innerHTML = '';

        const { RaceTable } = data.MRData;

        RaceTable.Races.forEach((race) => {
            //  Añada la bandera del pais como fondo
            const race_head = createCustomElements('', ['title']);
            const country = race.Circuit.Location.country.split(' ').join('_');
            race_head.style.backgroundImage = `url(flags/${country.toLowerCase()}.svg)`;

            //  Añade el Round
            race_head.appendChild(
                createCustomElements(race.round, ['square', 'square__black'])
            );

            //  Crea la tabla que contiene los resultados del GP
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            thead.innerHTML =
                '<tr> <th>Pos</th> <th>Driver</th> <th>Constructor</th> <th>Status</th> <th>Points</th> </tr>';
            const tbody = document.createElement('tbody');

            //  Bucle de Resultados (race.Results) de cada Carrera (race) por
            race.Results.forEach((result) => {
                //  Llenamos la tabla con los resultados de cada piloto
                let tr = document.createElement('tr');
                tr.innerHTML = `<td>${result.position}</td>
                                <td>${
                                    result.Driver.givenName
                                } ${result.Driver.familyName.toUpperCase()}</td>
                                <td>${result.Constructor.name}</td>
                                <td>${result.status}</td>
                                <td>${result.points}</td>`;
                tbody.appendChild(tr);
            });

            //  Llenamos la tabla con thead & tbody
            table.appendChild(thead);
            table.appendChild(tbody);

            //  Agrega el nombre le GP y la tabla con los resultados de la carrera
            const card = createCustomElements('', ['card']);

            //  Añadimos info como el nombre de la carrera y el circuito
            const gp = createCustomElements('', ['gp']);
            gp.appendChild(createCustomElements(race.raceName, ['race']));
            gp.appendChild(
                createCustomElements(race.Circuit.circuitName, ['circuit'])
            );

            //  Agregamos a card los elementos que lo componen
            card.appendChild(race_head);
            card.appendChild(gp);
            card.appendChild(table);

            //  Añadimos a APP el elemento card
            app.appendChild(card);
        });
    } catch (error) {
        console.log(error);
    }
};

//  Función que crea "elements" con:
//      Contenido que le proporcionemos
//      Clases que pasemos como parametro
function createCustomElements(contenido, clases = []) {
    let element = document.createElement('div');
    element.textContent = contenido;

    clases.forEach((clase) => {
        element.classList.add(clase);
    });

    return element;
}
