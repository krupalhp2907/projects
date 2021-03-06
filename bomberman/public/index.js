/* eslint-disable no-loop-func */
function playAgain() {
    window.location.reload();
}
function generateBombIndicies(pCount, pMin, pMax) {
    let arr = [[0, 1], [0, 2], [0, 3], [1, 3], [3, 5], [7, 7], [5, 3], [3, 6], [5, 1], [1, 3]];
    for (let i = 0; i < arr.length; i++) {
        arr[i] = (arr[i][0] * 9 + arr[i][1]);
    }
    return arr;
}
function findNeighbourBombs(bombIndices, index, colCount, rowCount) {
    let bombs = 0;
    // positions
    // |1|2|3|
    // |4|x|5|
    // |6|7|8|
    if (index % colCount !== 1 && bombIndices.includes(index - colCount - 1)) {
        bombs++;
    }
    if (index > colCount && bombIndices.includes(index - colCount)) {
        bombs++;
    }
    if (index % colCount !== 0 && bombIndices.includes(index - colCount + 1)) {
        bombs++;
    }

    if (index % colCount !== 1 && bombIndices.includes(index - 1)) {
        bombs++;
    }
    if (index % colCount !== 0 && bombIndices.includes(index + 1)) {
        bombs++;
    }
    if (index % colCount !== 1 && bombIndices.includes(index + colCount - 1)) {
        bombs++;
    }
    if (
        index <= colCount * (rowCount - 1) &&
        bombIndices.includes(index + colCount)
    ) {
        bombs++;
    }
    if (index % colCount !== 0 && bombIndices.includes(index + colCount + 1)) {
        bombs++;
    }
    return bombs;
}
function render() {
    const rowCount = 9;
    const colCount = 9;
    const MIN = 1;
    let bi = 0;
    let points = 0;
    let gameover = false;
    let visited = [];
    let bombIndices = generateBombIndicies(
        rowCount,
        MIN,
        rowCount * colCount);
    let grid = document.querySelector(".grid");
    let pointer = document.querySelector(".points");
    pointer.innerHTML = points;
    // grid creation
    for (let j = 0; j < rowCount; j++) {
        let row = document.createElement("div");
        row.classList.add("row");
        grid.appendChild(row);
        for (let i = 0; i < colCount; i++) {
            let col = document.createElement("div");
            col.classList.add("col");
            col.setAttribute("id", `${j}_${i}`);
            //listener for bomb and safe buttons
            col.addEventListener("click", () => {
                if (bombIndices.indexOf(i + j * 9) !== -1) {
                    while (bi < bombIndices.length) {
                        let bombcol = document.getElementById(`${parseInt(bombIndices[bi] / 9, 10)}_${bombIndices[bi] % 9}`);
                        bombcol.classList.add("bomb");
                        bombcol.innerHTML = "💣";
                        bi++;
                    }
                    gameover = true;
                } else {
                    if (!gameover && !visited.includes(`${j}_${i}`)) {
                        visited.push(`${j}_${i}`);
                        let safeCol = document.getElementById(`${j}_${i}`);
                        safeCol.classList.add("safe");
                        const neighbouringBombs = findNeighbourBombs(
                            bombIndices,
                            i + j * rowCount,
                            colCount,
                            rowCount
                        );
                        points++;
                        safeCol.innerHTML = points - 1;
                        pointer.innerHTML = points;
                    }
                }
            });
            row.appendChild(col);
        }
    }
}
render();