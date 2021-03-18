function createButton(id) {
    d3.xml("../assets/funnel.svg", data => {
        var div = d3
            .select(id)
            .attr("type", "button")
            .attr("data-toggle", "modal")
            .attr("data-target", "#myModal")
            .append("div");
        div.node().append(data.documentElement);
        div.append("span").text(" Filter Players");
    });
}

export { createButton };
