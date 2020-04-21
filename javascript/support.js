function chargeSeasons() {
    fetch('/json/season_list.json')
        .then(response => response.json())
        .then(data => {
            const data_list = document.getElementById('seasons');
            const season_list = data.MRData.SeasonTable.Seasons;
            season_list.forEach(element => {
                let option = document.createElement('option');
                option.value = element.season;
                data_list.appendChild(option);
            });
        })
        .catch(err => {

        })
}

document.getElementsByName('season-search')[0].addEventListener("keypress", (event) => {
    let val = document.getElementsByName('season-search')[0].value;
    if (event.keyCode === 13) {
        event.preventDefault();
        seasonResults(val);
    }
});