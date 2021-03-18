/// functions related to updating the UX on selection of new player
////

import { transformRow } from "./data.js";
import { createPlayerInfo, updatePlayerInfo } from "./player-info.js";
import { radarChart } from "./radar-chart.js";

function update(data) {
    // get selected values for all rows and extract data
    var playerOneSelect = d3.select("#player-one-select").property("value");
    var playerTwoSelect = d3.select("#player-two-select").property("value");
    var playerThreeSelect = d3.select("#player-three-select").property("value");
    var rows = [
        transformRow(data[playerOneSelect]),
        transformRow(data[playerTwoSelect]),
        transformRow(data[playerThreeSelect]),
    ];

    // update charts
    radarChart(".radar-chart", rows);

    // update player info
    updatePlayerInfo("#player-one-info", data[playerOneSelect]);
    playerTwoSelect
        ? updatePlayerInfo("#player-two-info", data[playerTwoSelect])
        : updatePlayerInfo("#player-two-info");
    playerThreeSelect
        ? updatePlayerInfo("#player-three-info", data[playerThreeSelect])
        : updatePlayerInfo("#player-three-info");
}

export { update };
