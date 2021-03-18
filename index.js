/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////

//// Modified by An Nguyen //////////////////////////////

import { transformRow } from "./js/data.js";
import { createPlayerInfo, updatePlayerInfo } from "./js/player-info.js";
import { radarChart } from "./js/radar-chart.js";
import { update } from "./js/update.js";
import { createButton } from "./js/modal.js";

function index(radarChartOptions) {
    d3.csv("data/archetypes-data.csv", function(data) {
        createButton("#filter");

        createPlayerInfo("#player-one-info", "player-one-select", data, false);
        createPlayerInfo("#player-two-info", "player-two-select", data, true);
        createPlayerInfo(
            "#player-three-info",
            "player-three-select",
            data,
            true
        );

        /// initialize information for default player
        updatePlayerInfo("#player-one-info", data[0]);
        radarChart(".radar-chart", [transformRow(data[0])], radarChartOptions);
    });
}

export { index };
