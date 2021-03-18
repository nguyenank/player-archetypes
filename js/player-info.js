/////// functions for creating and working with the player info boxes
//////

import { update } from "./update.js";

function createPlayerInfo(id, selectId, data, emptyRowBool) {
    var pI = d3.select(id);

    // create dropdown button //
    var select = pI
        .append("select")
        .attr("id", selectId)
        .attr("class", "select-dropdown");
    if (emptyRowBool) {
        select.append("option").text("");
    }
    select
        .selectAll("option")
        .data(data)
        .enter()
        .append("option")
        .text(d => d.Player)
        .attr("value", (d, i) => i);

    // create rest of player info //
    pI.append("hr");

    pI.append("span")
        .attr("class", "bold player-team")
        .text("Team");

    pI.append("hr");

    createPlayerRow(id, "Position: ", "player-position");
    createPlayerRow(id, "Archetype: ", "player-archetype");

    pI.append("hr");

    createPlayerRow(id, "Shot Index: ", "shot-index");
    createPlayerRow(id, "PSA Index: ", "psa-index");
    createPlayerRow(id, "Passing Index: ", "passing-index");
    createPlayerRow(id, "Entry Index: ", "entry-index");
    createPlayerRow(id, "Danger Pass Index: ", "danger-pass-index");
    createPlayerRow(id, "Danger Shot Index: ", "danger-shot-index");
    createPlayerRow(id, "Takeaways Index: ", "takeaways-index");
    createPlayerRow(id, "Puck Recovery Index: ", "puck-recovery-index");
}

// helper function for creating rows
function createPlayerRow(id, text, className) {
    var pI = d3.select(id);
    let d = pI.append("div");
    d.append("span")
        .attr("class", "bold")
        .text(text);
    d.append("span").attr("class", className);
}

function updatePlayerInfo(id, player) {
    var pI = d3.select(id);
    if (player) {
        pI.select(".player-team").text(player.Team);
        pI.select(".player-position").text(player.Position);
        pI.select(".player-archetype").text(player.Archetype);
        pI.select(".shot-index").text(player["Shot Index"]);
        pI.select(".psa-index").text(player["PSA Index"]);
        pI.select(".passing-index").text(player["Passing Index"]);
        pI.select(".entry-index").text(player["Entry Index"]);
        pI.select(".danger-pass-index").text(player["Danger Pass Index"]);
        pI.select(".danger-shot-index").text(player["Danger Shot Index"]);
        pI.select(".takeaways-index").text(player["Takeaways Index"]);
        pI.select(".puck-recovery-index").text(player["Puck Recovery Index"]);
    } else {
        // if no player, blank out info
        pI.select(".player-team").text("");
        pI.select(".player-position").text("");
        pI.select(".player-archetype").text("");
        pI.select(".shot-index").text("");
        pI.select(".psa-index").text("");
        pI.select(".passing-index").text("");
        pI.select(".entry-index").text("");
        pI.select(".danger-pass-index").text("");
        pI.select(".danger-shot-index").text("");
        pI.select(".takeaways-index").text("");
        pI.select(".puck-recovery-index").text("");
    }
}
export { createPlayerInfo, updatePlayerInfo };
