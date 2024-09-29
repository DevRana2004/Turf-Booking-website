function assignSlotUsingHungarianAlgorithm(costMatrix) {
    const n = costMatrix.length;
    const u = new Array(n).fill(0);
    const v = new Array(n).fill(0);
    const p = new Array(n).fill(0);
    const way = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        p.fill(0);
        v.fill(0);
        let j0 = 0;
        const minv = new Array(n).fill(Infinity);
        const used = new Array(n).fill(false);
        for (let j = 0; j < n; j++) {
            minv[j] = costMatrix[i][j] - u[i] - v[j];
        }
        for (let j = 0; j < n; j++) {
            j0 = -1;
            for (let j1 = 0; j1 < n; j1++) {
                if (!used[j1] && (j0 === -1 || minv[j1] < minv[j0])) {
                    j0 = j1;
                }
            }
            used[j0] = true;
            for (let j1 = 0; j1 < n; j1++) {
                const cur = costMatrix[i][j1] - u[i] - v[j1];
                if (cur < minv[j1]) {
                    minv[j1] = cur;
                    way[j1] = j0;
                }
            }
            for (let j1 = 0; j1 < n; j1++) {
                if (used[j1]) {
                    u[j1] += minv[j0];
                    v[j1] -= minv[j0];
                }
            }
        }
        for (let j = 0; j < n; j++) {
            if (way[j] >= 0) {
                p[j] = way[j];
            }
        }
    }

    const result = [];
    for (let j = 0; j < n; j++) {
        result.push(p[j]);
    }
    return result; // Returns the assignment of slots
}

module.exports = { assignSlotUsingHungarianAlgorithm };
