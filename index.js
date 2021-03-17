/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////

//// Modified by An Nguyen //////////////////////////////

import { createPlayerInfo, updatePlayerInfo } from "./js/player-info.js";
import { radarChart } from "./js/radar-chart.js";

function layout(radarChartOptions) {
    function transformRow(row) {
        let indices = [
            "Shot Index",
            "PSA Index",
            "Passing Index",
            "Entry Index",
            "Danger Pass Index",
            "Danger Shot Index",
            "Takeaways Index",
            "Puck Recovery Index",
        ];
        if (!row) {
            return _.map(indices, index => ({ axis: index, value: -1 }));
        }
        return _.map(indices, index => ({ axis: index, value: row[index] }));
    }
    d3.csv("data/archetypes-data.csv", function(data) {
        var firstRows = [transformRow(data[0]), transformRow(null)];
        d3.select("#selectLeft")
            .selectAll("optionsLeft")
            .data(data)
            .enter()
            .append("option")
            .text(d => d.Player)
            .attr("value", (d, i) => i);

        d3.select("#selectRight")
            .append("option")
            .text("");

        d3.select("#selectRight")
            .selectAll("t")
            .data(data)
            .enter()
            .append("option")
            .text(d => d.Player)
            .attr("value", (d, i) => i);

        updatePlayerInfo("#left-player", data[0]);
        createPlayerInfo("#player-three-info");
        radarChart(".radarChart", firstRows, radarChartOptions);

        function update() {
            var selectedLeft = d3.select("#selectLeft").property("value");
            var selectedRight = d3.select("#selectRight").property("value");
            rows = [
                transformRow(data[selectedLeft]),
                transformRow(data[selectedRight]),
            ];
            radarChart(".radarChart", rows, radarChartOptions);
            playerInfo("#left-player", data[selectedLeft]);
            if (selectedRight) {
                playerInfo("#right-player", data[selectedRight]);
            }
        }

        d3.select("#selectLeft").on("change", update);

        d3.select("#selectRight").on("change", update);
    });
}

export { layout };
