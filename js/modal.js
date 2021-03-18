import { filter } from "./filter.js";

function createButton(id) {
    var div = d3
        .select(id)
        .attr("type", "button")
        .attr("data-toggle", "modal")
        .attr("data-target", "#filterModal")
        .append("div");
    div.append("i").attr("class", "bi bi-funnel-fill");
    div.append("span").text(" Filter Players");
}

function createModal(id, data) {
    d3.select(id)
        .attr("class", "modal modal-fade")
        .append("div")
        .attr("class", "modal-dialog")
        .append("div")
        .attr("class", "modal-content");

    // add header, body, and footer
    d3.select(".modal-content")
        .append("div")
        .attr("class", "modal-header");
    d3.select(".modal-content")
        .append("div")
        .attr("class", "modal-body container");
    d3.select(".modal-content")
        .append("div")
        .attr("class", "modal-footer");

    // customize header
    d3.select(".modal-header")
        .append("h4")
        .attr("class", "modal-title")
        .text("Filter Players");
    d3.select(".modal-header")
        .append("button")
        .attr("type", "button")
        .attr("class", "btn-close")
        .attr("data-dismiss", "modal")
        .text("X");

    // customize body
    var body = d3.select(".modal-body");
    var row = body.append("div").attr("class", "row");
    var col1 = row
        .append("div")
        .attr("class", "col-sm")
        .attr("id", "archetypes");
    col1.append("h4").text("Archetypes");
    col1.append("h5").text("Forward Archetypes");
    createSwitch("#archetypes", "dependent", "Dependent");
    createSwitch("#archetypes", "balanced", "Balanced");
    createSwitch("#archetypes", "shooter", "Shooter");
    createSwitch("#archetypes", "playmaker", "Playmaker");

    col1.append("h5").text("Defender Archetypes");
    createSwitch("#archetypes", "defensive", "Defensive");
    createSwitch("#archetypes", "disruptor", "Disruptor");
    createSwitch("#archetypes", "two-way", "Two-Way");

    var col2 = row
        .append("div")
        .attr("class", "col-sm")
        .attr("id", "positions");
    col2.append("h4").text("Positions");
    createSwitch("#positions", "f", "F(orward)");
    createSwitch("#positions", "d", "D(efender)");
    // customize footer
    d3.select(".modal-footer")
        .append("button")
        .attr("type", "button")
        .attr("class", "btn")
        .attr("data-dismiss", "modal")
        .text("Confirm");

    createButton("#filter");
}

function createSwitch(id, switchId, label) {
    var s = d3
        .select(id)
        .append("div")
        .attr("class", "form-check form-switch");
    s.append("input")
        .attr("class", "form-check-input")
        .attr("checked", true)
        .attr("type", "checkbox")
        .attr("id", switchId);
    s.append("label")
        .attr("class", "form-check-label")
        .attr("for", switchId)
        .text(label);
}

export { createModal };
