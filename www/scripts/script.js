//funzione che ritorna la corrente consumata per l'intero impianto
function globalCurrent(){
    fetch('http://localhost:5000/influx/sumCurrent')
    //fetch('http://192.168.1.7:5000/influx/sumCurrent')

        .then( response => {
        if (response.status !== 200) {
            console.log(response);
        }
        return response;
    })
    .then(response => response.json())
    .then(parsedResponse => {
        const unpackData = (arr, key) => {
            return arr.map(obj => obj[key])
        };

        var today = new Date();
        var todayHour = today.getHours();

        var previous = new Date();
        previous.setHours(todayHour - 3);
        today.setHours(todayHour - 2);

        const firstTrace = {
            type: 'scatter',
            mode: 'lines',
            name: 'mean',
            x: unpackData(parsedResponse, 'time'),
            y: unpackData(parsedResponse, 'sum'),
            line: {color: '#03A9F4'},
        };

        const data = [firstTrace];

        const layout = {
            yaxis: {
                title:"Electric Current (A)",
                titlefont: {
                    family: 'Courier New',
                    size: 15,
                    color: '#FF0000'
                },
            },
            xaxis: {
                title:"Time",
                titlefont: {
                    family: 'Courier New',
                    size: 15,
                    color: '#FF0000'
                },
                range: [previous, today],
                type: 'time'
            },
            margin: {
                l: 50,
                r: 10,
                b: 40,
                t: 50,
                pad: 4
            },
            plot_bgcolor: "#fafafa",
            paper_bgcolor: "#fafafa",
        };
        return Plotly.newPlot('graphs-container', data, layout);
    })
    .catch( error => console.log(error) );
}

//funzione che ritorna la corrente consumata per un singolo componente
const componentCurrent = (clickComponent) => {

    var component = clickComponent.slice(0, -1);
    var machine = document.getElementById(clickComponent).parentElement.id;
    var section = document.getElementById(machine).parentElement.id;

    var url = "http://localhost:5000/influx/".concat(section).concat("/").concat(machine).concat("/").concat(component);
    //var url = "http://192.168.1.7:5000/influx/".concat(section).concat("/").concat(machine).concat("/").concat(component);

    fetch(url)
        .then( response => {
            if (response.status !== 200) {
                console.log(response);
            }
            return response;
        })
        .then(response => response.json())
        .then(parsedResponse => {
            const unpackData = (arr, key) => {
                return arr.map(obj => obj[key])
            };

        const firstTrace = {
            type: 'scatter',
            mode: 'lines',
            name: 'mean',
            title:"Corrente Elettrica",
            x: unpackData(parsedResponse, 'time'),
            y: unpackData(parsedResponse, 'mean_electricCurrent'),
            line: {color: '#03A9F4'}
        };
        const data = [firstTrace];

        const layout = {
            yaxis: {
                title:"Electric Current (A)",
                titlefont: {
                    family: 'Courier New',
                    size: 15,
                    color: '#FF0000'
                },
            },
            xaxis:{
                title:"Time",
                titlefont: {
                    family: 'Courier New',
                    size: 15,
                    color: '#FF0000'
                },
            },
            margin: {
                l: 50,
                r: 10,
                b: 40,
                t: 30,
                pad: 4
            },
            plot_bgcolor: "#fafafa",
            paper_bgcolor: "#fafafa",
            title: '',//component + ' di '+ machine, // lo disabilito al volo cosi?
        };
        return Plotly.newPlot('graphs-container', data, layout);
    })
    .catch( error => console.log(error) );
};

