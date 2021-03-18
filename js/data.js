///// helper function for transforming data into format for radar chart //
////

function transformRow(row) {
    let indices = [
        "Shot Index",
        "PSA Index",
        "Passing Index",
        "Entry Index",
        "Danger Pass Index",
        "Danger Shot Index",
        "Takeaways Index",
        "Puck Recovery Index",
    ];
    if (!row) {
        // help when dealing with empty players later
        return _.map(indices, index => ({ axis: index, value: -1 }));
    }
    return _.map(indices, index => ({ axis: index, value: row[index] }));
}

export { transformRow };
