/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////

//// Modified by An Nguyen //////////////////////////////

import {
    createPlayerInfo,
    updatePlayerInfo,
    createDropdownButton,
} from "./js/player-info.js";
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

        createDropdownButton(
            "#player-one-info",
            "player-one-select",
            data,
            false
        );

        createDropdownButton(
            "#player-two-info",
            "player-two-select",
            data,
            true
        );

        createDropdownButton(
            "#player-three-info",
            "player-three-select",
            data,
            true
        );

        createPlayerInfo("#player-one-info");
        createPlayerInfo("#player-two-info");
        createPlayerInfo("#player-three-info");
        updatePlayerInfo("#player-one-info", data[0]);
        radarChart(".radarChart", firstRows, radarChartOptions);

        function update() {
            var playerOneSelect = d3
                .select("#player-one-select")
                .property("value");
            var playerTwoSelect = d3
                .select("#player-two-select")
                .property("value");
            var playerThreeSelect = d3
                .select("#player-three-select")
                .property("value");
            var rows = [
                transformRow(data[playerOneSelect]),
                transformRow(data[playerTwoSelect]),
                transformRow(data[playerThreeSelect]),
            ];
            radarChart(".radarChart", rows, radarChartOptions);
            updatePlayerInfo("#player-one-info", data[playerOneSelect]);
            if (playerTwoSelect) {
                updatePlayerInfo("#player-two-info", data[playerTwoSelect]);
            }
            if (playerThreeSelect) {
                updatePlayerInfo("#player-three-info", data[playerThreeSelect]);
            }
        }

        d3.select("#player-one-select").on("change", update);
        d3.select("#player-two-select").on("change", update);
        d3.select("#player-three-select").on("change", update);
    });
}

export { layout };
