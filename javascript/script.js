
function seasonResults(season) {

    if (season.length < 4) {
        return;
    }

    const URL = `https://ergast.com/api/f1/${season}/results.json?limit=500&offset=0`;

    //Arrays -> forEach
    //Dictionary -> punto o corchetes

    fetch(URL)
        .then(response => response.json())
        .then(season => {
            const app = document.getElementById('app');
            app.innerHTML = "";
            const race_table = season.MRData.RaceTable;

            console.log(race_table);

            race_table.Races.forEach(race => {

                //  Añada la badera del pais como fondo
                const race_head = createCustomElements('', ['title']);
                const country = race.Circuit.Location.country.split(' ').join('_');
                race_head.style.backgroundImage = `url(flags/${country.toLowerCase()}.svg)`;

                //  Añade el Round
                race_head.appendChild(createCustomElements(race.round, ['square', 'square__black']));

                //  Crea la tabla que contiene los resultados del GP
                const table = document.createElement('table');
                const thead = document.createElement('thead');
                thead.innerHTML = '<tr> <th>Pos</th> <th>Driver</th> <th>Constructor</th> <th>Points</th> </tr>';
                const tbody = document.createElement('tbody');

                //  Bucle de Resultados (race.Results) de cada Carrera (race) por 
                race.Results.forEach(result => {
                    //  Llenamos la tabla con los resultados de cada piloto
                    //console.log(result.position);
                    //console.log(result.Driver.givenName);
                    //console.log(result.Driver.familyName);
                    //console.log(result.Constructor.name);

                    let tr = document.createElement('tr');
                    tr.innerHTML = `<td>${result.position}</td>
                                <td>${result.Driver.givenName} ${result.Driver.familyName.toUpperCase()}</td>
                                <td>${result.Constructor.name}</td>
                                <td>${result.points}</td>`;

                    tbody.appendChild(tr);
                });

                //  Llenamos la tabla con thead & tbody
                table.appendChild(thead);
                table.appendChild(tbody);

                //  Agrega el nombre le GP y la tabla con los resulatdos de la carrera
                const item = createCustomElements('', ['item']);

                //  Añadimos info como el nombre de la carrera y el circuito
                const gp = createCustomElements('', ['gp']);
                gp.appendChild(createCustomElements(race.raceName, ['race']));
                gp.appendChild(createCustomElements(race.Circuit.circuitName, ['circuit']))

                //  Agregamos a item los elementos que lo componen
                item.appendChild(race_head);
                item.appendChild(gp);
                item.appendChild(table);

                //  Añadimos a APP el elemento item
                app.appendChild(item);

            });

        })
        .catch(err => console.log(err));
}

//  Función que crea "elements" con:
//      Contenido que le proporcionemos
//      Clases que pasemos como parametro
function createCustomElements(contenido, clases = []) {
    let element = document.createElement('div');
    element.textContent = contenido;

    clases.forEach(clase => {
        element.classList.add(clase);
    });

    return element;
}