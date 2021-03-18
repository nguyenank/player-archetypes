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

function createModal(id) {
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
        .attr("class", "modal-body");
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
        .attr("class", "close")
        .attr("data-dismiss", "modal")
        .text("X");

    // customize body
    d3.select(".modal-body").text("filter!");

    // customize footer
    d3.select(".modal-footer")
        .append("button")
        .attr("type", "button")
        .attr("class", "close")
        .attr("data-dismiss", "modal")
        .text("Confirm");

    createButton("#filter");
}

export { createModal };
