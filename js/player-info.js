function createPlayerRow(id, text, className) {
    var pI = d3.select(id);
    let d = pI.append("div");
    d.append("span")
        .attr("class", "bold")
        .text(text);
    d.append("span").attr("class", className);
}

function createDropdownButton(id, selectId, data, emptyRowBool) {
    var pI = d3.select(id);
    var select = pI.append("select").attr("id", selectId);

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
}

function createPlayerInfo(id) {
    var pI = d3.select(id);

    pI.append("hr");

    pI.append("span")
        .attr("class", "bold")
        .attr("id", "player-team")
        .text("Team");
    pI.append("hr");
    createPlayerRow(id, "Position: ", "player-team");
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

function updatePlayerInfo(id, player) {
    var pS = d3.select(id);
    pS.select(".player-team").text(player.Team);
    pS.select(".player-position").text(player.Position);
    pS.select(".player-archetype").text(player.Archetype);
    pS.select(".shot-index").text(player["Shot Index"]);
    pS.select(".psa-index").text(player["PSA Index"]);
    pS.select(".passing-index").text(player["Passing Index"]);
    pS.select(".entry-index").text(player["Entry Index"]);
    pS.select(".danger-pass-index").text(player["Danger Pass Index"]);
    pS.select(".danger-shot-index").text(player["Danger Shot Index"]);
    pS.select(".takeaways-index").text(player["Takeaways Index"]);
    pS.select(".puck-recovery-index").text(player["Puck Recovery Index"]);
}

export { createPlayerInfo, updatePlayerInfo, createDropdownButton };
