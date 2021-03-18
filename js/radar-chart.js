/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////
//// Modified by An Nguyen //////////////////////////////

function radarChart(id, data) {
    var cfg = {
        w: 600, //Width of the circle
        h: 600, //Height of the circle
        margin: { top: 125, right: 125, bottom: 125, left: 125 }, //The margins of the SVG
        levels: 5, //How many levels or inner circles should there be drawn
        labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
        wrapWidth: 80, //The number of pixels after which a label needs to be given a new line
        opacityArea: 0.4, //The opacity of the area of the blob
        dotRadius: 4, //The size of the colored circles of each blog
        opacityCircles: 0.15, //The opacity of the circles of each blob
        strokeWidth: 2, //The width of the stroke around each blob
        roundStrokes: false, //If true the area and stroke will follow a round path (cardinal-closed)
        color: ["#35aba9", "#ea8e48", "#9659b5"], //Color function for blobs
    };
    // random style things I pulled out of the code below
    var style = {
        circleFill: "#ededed",
        circleStroke: "#dedede",
        axisStrokeWidth: ".2em",
        axisFontSize: "1em",
        axisFontColor: "#737373",
        axisDY: ".4em",
        labelDY: "-.5em",
    };
    /////////////////////////////////////////////////////////
    ///////////////////////// Calculations///////////////////
    /////////////////////////////////////////////////////////

    // If actual < 0.1, maxValue = 0.2
    // if actual > 1, maxValue = actual
    // otherwise actual = 1
    var maxValue = 1;
    var actualMax = d3.max(data, function(i) {
        return d3.max(
            i.map(function(o) {
                return o.value;
            })
        );
    });
    if (actualMax < 0.1) {
        maxValue = 0.2;
    }
    if (actualMax > maxValue) {
        maxValue = actualMax;
    }

    var allAxis = data[0].map(function(i, j) {
            return i.axis;
        }), //Names of each axis
        total = allAxis.length, //The number of different axes
        radius = Math.min(cfg.w / 2, cfg.h / 2), //Radius of the outermost circle
        Format = d3.format(".2f"), // 2 decimal place formatting
        angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"

    //Scale for the radius
    var rScale = d3.scale
        .linear()
        .range([0, radius])
        .domain([0, maxValue]);

    /////////////////////////////////////////////////////////
    //////////// Create the container SVG and g /////////////
    /////////////////////////////////////////////////////////

    //Remove whatever chart with the same id/class was present before
    d3.select(id)
        .select("svg")
        .remove();

    var width = cfg.w + cfg.margin.left + cfg.margin.right;
    var height = cfg.h + cfg.margin.top + cfg.margin.bottom;
    //Initiate the radar chart SVG
    var svg = d3
        .select(id)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("class", "radar" + id);
    //Append a g element
    var g = svg
        .append("g")
        .attr(
            "transform",
            "translate(" +
                (cfg.w / 2 + cfg.margin.left) +
                "," +
                (cfg.h / 2 + cfg.margin.top) +
                ")"
        );

    /////////////////////////////////////////////////////////
    /////////////// Draw the Circular grid //////////////////
    /////////////////////////////////////////////////////////

    //Wrapper for the grid & axes
    var axisGrid = g.append("g").attr("class", "axisWrapper");

    //Draw the background circles
    axisGrid
        .selectAll(".levels")
        .data(d3.range(1, cfg.levels + 1).reverse())
        .enter()
        .append("circle")
        .attr("class", "gridCircle")
        .attr("r", function(d, i) {
            return (radius / cfg.levels) * d;
        })
        .style("fill", style.circleFill)
        .style("stroke", style.circleStroke)
        .style("fill-opacity", cfg.opacityCircles);

    //Text indicating at what number each level is
    axisGrid
        .selectAll(".axisLabel")
        .data(d3.range(1, cfg.levels + 1).reverse())
        .enter()
        .append("text")
        .attr("class", "axisLabel")
        .attr("x", 4)
        .attr("y", function(d) {
            return (-d * radius) / cfg.levels;
        })
        .attr("dy", style.axisDY)
        .style("font-size", style.axisFontSize)
        .attr("fill", style.axisFontColor)
        .text(function(d, i) {
            return Format((maxValue / cfg.levels) * (cfg.levels - i));
        });

    /////////////////////////////////////////////////////////
    //////////////////// Draw the axes //////////////////////
    /////////////////////////////////////////////////////////

    //Create the straight lines radiating outward from the center
    var axis = axisGrid
        .selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");
    //Append the lines
    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", function(d, i) {
            return (
                rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2)
            );
        })
        .attr("y2", function(d, i) {
            return (
                rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2)
            );
        })
        .attr("class", "line")
        .style("stroke", style.circleStroke)
        .style("stroke-width", style.axisStrokeWidth);

    //Append the labels at each axis
    axis.append("text")
        .attr("class", "legend")
        .attr("text-anchor", "middle")
        .attr("dy", style.labelDY)
        .attr("x", function(d, i) {
            return (
                rScale(maxValue * cfg.labelFactor) *
                Math.cos(angleSlice * i - Math.PI / 2)
            );
        })
        .attr("y", function(d, i) {
            return (
                rScale(maxValue * cfg.labelFactor) *
                Math.sin(angleSlice * i - Math.PI / 2)
            );
        })
        .text(function(d) {
            return d;
        })
        .call(wrap, cfg.wrapWidth);

    /////////////////////////////////////////////////////////
    ///////////// Draw the radar chart blobs ////////////////
    /////////////////////////////////////////////////////////

    //The radial line function
    var radarLine = d3.svg.line
        .radial()
        .interpolate("linear-closed")
        .radius(d => (d.value >= 0 ? rScale(d.value) : 0)) // ignore empty player (value = -1)
        .angle((d, i) => i * angleSlice);

    if (cfg.roundStrokes) {
        radarLine.interpolate("cardinal-closed");
    }

    //Create a wrapper for the blobs
    var blobWrapper = g
        .selectAll(".radarWrapper")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "radarWrapper");

    //Append the backgrounds
    blobWrapper
        .append("path")
        .attr("class", "radarArea")
        .attr("d", function(d, i) {
            return radarLine(d);
        })
        .style("fill", function(d, i) {
            return cfg.color[i];
        })
        .style("fill-opacity", cfg.opacityArea)
        .on("mouseover", function(d, i) {
            //Dim all blobs
            d3.selectAll(".radarArea")
                .transition()
                .duration(200)
                .style("fill-opacity", 0.1);
            //Bring back the hovered over blob
            d3.select(this)
                .transition()
                .duration(200)
                .style("fill-opacity", 0.8);
        })
        .on("mouseout", function() {
            //Bring back all blobs
            d3.selectAll(".radarArea")
                .transition()
                .duration(200)
                .style("fill-opacity", cfg.opacityArea);
        });

    //Create the outlines
    blobWrapper
        .append("path")
        .attr("class", "radarStroke")
        .attr("d", function(d, i) {
            return radarLine(d);
        })
        .style("stroke-width", cfg.strokeWidth + "px")
        .style("stroke", function(d, i) {
            return cfg.color[i];
        })
        .style("fill", "none");
    // .style("filter" , "url(#glow)");

    //Append the circles
    blobWrapper
        .selectAll(".radarCircle")
        .data(function(d, i) {
            return d;
        })
        .enter()
        .append("circle")
        .attr("class", "radarCircle")
        .attr("r", cfg.dotRadius)
        .attr("cx", function(d, i) {
            return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
        })
        .attr("cy", function(d, i) {
            return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
        })
        .style("fill", function(d, i, j) {
            return cfg.color[j];
        })
        .style("fill-opacity", d => (d.value >= 0 ? 0.8 : 0)); // ignore no player

    /////////////////////////////////////////////////////////
    //////// Append invisible circles for tooltip ///////////
    /////////////////////////////////////////////////////////

    //Wrapper for the invisible circles on top
    var blobCircleWrapper = g
        .selectAll(".radarCircleWrapper")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "radarCircleWrapper");

    //Append a set of invisible circles on top for the mouseover pop-up
    blobCircleWrapper
        .selectAll(".radarInvisibleCircle")
        .data(function(d, i) {
            return d;
        })
        .enter()
        .append("circle")
        .attr("class", "radarInvisibleCircle")
        .attr("r", cfg.dotRadius * 1.5)
        .attr("cx", function(d, i) {
            return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
        })
        .attr("cy", function(d, i) {
            return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
        })
        .style("fill", (d, i, j) => cfg.color[j])
        .style("fill-opacity", 0)
        .style("pointer-events", "all")
        .on("mouseover", function(d) {
            d3.select(this)
                .transition()
                .duration(200)
                .style("fill-opacity", d => (d.value >= 0 ? 1 : 0));

            var newX = parseFloat(d3.select(this).attr("cx")) - 10;
            var newY = parseFloat(d3.select(this).attr("cy")) - 10;

            tooltip
                .attr("x", newX)
                .attr("y", newY)
                .text(Format(d.value))
                .transition()
                .duration(200)
                .style("opacity", d.value >= 0 ? 1 : 0);
        })
        .on("mouseout", function() {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0);
            d3.select(this)
                .transition()
                .duration(200)
                .style("fill-opacity", 0);
        });

    //Set up the small tooltip for when you hover over a circle
    var tooltip = g
        .append("text")
        .attr("class", "tooltip")
        .style("opacity", 0);

    /////////////////////////////////////////////////////////
    /////////////////// Helper Function /////////////////////
    /////////////////////////////////////////////////////////

    //Taken from http://bl.ocks.org/mbostock/7555321
    //Wraps SVG text
    function wrap(text, width) {
        text.each(function() {
            var text = d3.select(this),
                words = text
                    .text()
                    .split(/\s+/)
                    .reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.4, // ems
                y = text.attr("y"),
                x = text.attr("x"),
                dy = parseFloat(text.attr("dy")),
                tspan = text
                    .text(null)
                    .append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", dy + "em");

            while ((word = words.pop())) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", ++lineNumber * lineHeight + dy + "em")
                        .text(word);
                }
            }
        });
    } //wrap
} //RadarChart

export { radarChart };
