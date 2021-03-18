/////// functions for creating and working with the player info boxes
//////

import { update } from "./update.js";

function createPlayerInfo(id, selectId, collapseId, data, emptyRowBool) {
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

    // dropdown button for indices //
    pI.append("hr");
    var button = pI
        .append("button")
        .attr("type", "button")
        .attr("class", "btn dropdown-button")
        .attr("data-toggle", "collapse")
        .attr("data-target", "#" + collapseId)
        .attr("aria-expanded", false);

    button.append("i").attr("class", "bi bi-caret-down-fill arrow-down");
    button.append("i").attr("class", "bi bi-caret-up-fill arrow-up");

    button.append("span").text(" Indices");

    pI.append("div")
        .attr("class", "collapse")
        .attr("id", collapseId)
        .append("hr");
    createPlayerRow("#" + collapseId, "Shot Index: ", "shot-index");
    createPlayerRow("#" + collapseId, "PSA Index: ", "psa-index");
    createPlayerRow("#" + collapseId, "Passing Index: ", "passing-index");
    createPlayerRow("#" + collapseId, "Entry Index: ", "entry-index");
    createPlayerRow(
        "#" + collapseId,
        "Danger Pass Index: ",
        "danger-pass-index"
    );
    createPlayerRow(
        "#" + collapseId,
        "Danger Shot Index: ",
        "danger-shot-index"
    );
    createPlayerRow("#" + collapseId, "Takeaways Index: ", "takeaways-index");
    createPlayerRow(
        "#" + collapseId,
        "Puck Recovery Index: ",
        "puck-recovery-index"
    );
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
