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

function index(radarChartOptions) {
    d3.csv("data/archetypes-data.csv", function(data) {
        createPlayerInfo(
            "#player-one-info",
            "player-one-select",
            "player-one-collapse",
            data,
            false
        );
        createPlayerInfo(
            "#player-two-info",
            "player-two-select",
            "player-two-collapse",
            data,
            true
        );
        createPlayerInfo(
            "#player-three-info",
            "player-three-select",
            "player-three-collapse",
            data,
            true
        );

        // iniitialize with first player
        updatePlayerInfo("#player-one-info", data[0]);
        radarChart(".radar-chart", [transformRow(data[0])], radarChartOptions);

        // all of the jQuery hooks
        $(document).ready(function() {
            $("#player-one-select").select2({
                selectionCssClass: "player-one-select",
                width: "100%",
                dropdownCssClass: "player-one-dropdown",
            });
            $("#player-two-select").select2({
                selectionCssClass: "player-two-select",
                width: "100%",
                dropdownCssClass: "player-two-dropdown",
            });
            $("#player-three-select").select2({
                selectionCssClass: "player-three-select",
                width: "100%",
                dropdownCssClass: "player-three-dropdown",
            });
        });
        $("#player-one-info").on("select2:select", () => update(data));
        $("#player-two-info").on("select2:select", () => update(data));
        $("#player-three-info").on("select2:select", () => update(data));
    });
}

export { index };
