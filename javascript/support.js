const chargeSeasons = async () => {
    const season_url = 'https://ergast.com/api/f1/seasons.json?limit=100';
    try {
        const res = await fetch(season_url);
        const data = await res.json();

        const data_list = document.getElementById('seasons');
        const { Seasons } = data.MRData.SeasonTable;

        Seasons.reverse();

        Seasons.forEach((element) => {
            let option = document.createElement('option');
            option.value = element.season;
            data_list.appendChild(option);
        });
    } catch (error) {
        console.log(error);
    }
};

document.querySelector('#enviar').addEventListener('click', (event) => {
    let val = document.getElementsByName('season-search')[0].value;
    seasonResults(val);
});
