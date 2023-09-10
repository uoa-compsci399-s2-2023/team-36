const canvas = document.getElementById('sandCanvas');
const ctx = canvas.getContext('2d');

const gridWidth = 200;  // Change for finer granularity
const gridHeight = 150; // Change for finer granularity
const cellSize = canvas.width / gridWidth;

let stoneIdCounter = 0;

let grid = Array(gridHeight).fill().map(() => Array(gridWidth).fill(null));

const elements = {
    sand: {
        color: "#FFD700",
        behavior: [],
    },
    soil: {
        color: "#452c1b",
        behavior: [],
    },
    stone: {
        color: "#211811",
        behavior: [],
    },
};

elements.stone.behavior.push(function (y, x, grid) {

});

elements.soil.behavior.push(function (y, x, grid) {

    if (grid[y + 1][x] === null) {
        // If the bottom is empty, let the dirt move downward
        grid[y + 1][x] = 'soil';
        grid[y][x] = null;
    } else {
        // If the bottom is not empty, try to let the dirt slide to the sides
        let leftX = x - 1;
        let rightX = x + 1;

        if (leftX >= 0 && rightX < gridWidth) {
            let leftHeight = 0;
            let rightHeight = 0;

            // Calculate the height of the left and right sides
            while (leftX >= 0 && grid[y + 1][leftX] === null) {
                leftHeight++;
                leftX--;
            }
            while (rightX < gridWidth && grid[y + 1][rightX] === null) {
                rightHeight++;
                rightX++;
            }

            // If the height of the left side is greater than or equal to 3 or the height of the right side is greater than or equal to 3, let the clods slide in both directions
            if (leftHeight >= 3 || rightHeight >= 3) {
                if (leftHeight >= rightHeight) {
                    grid[y + 1][x - leftHeight] = 'soil';
                    grid[y][x] = null;
                } else {
                    grid[y + 1][x + rightHeight] = 'soil';
                    grid[y][x] = null;
                }
            }
        }
    }
});


function drawSandAutomatically() {

    for (let y = gridHeight - 1; y >= gridHeight*0.6; y--) {
        for (let x = 0; x < gridWidth; x++) {

            if (grid[y][x] === null) {
                grid[y][x] = 'soil';

                if (Math.random() < 0.01) {
                    const stoneSizeX = Math.floor(Math.random() * 2) + 4;
                    const stoneSizeY = Math.floor(Math.random() * 2) + 4;
                    const stoneId = `stone-${stoneIdCounter++}`;

                    for (let i = 0; i < stoneSizeX; i++) {
                        for (let j = 0; j < stoneSizeY; j++) {
                            const stoneX = x + i;
                            const stoneY = y - j;
                            grid[stoneY][stoneX] = stoneId;
                        }
                        
                    }
                }
            }
        }
    }
}

function updateGrid() {
    for (let y = gridHeight - 2; y >= 0; y--) {
        for (let x = 0; x < gridWidth; x++) {
            let element = grid[y][x];
            if (element && elements[element] && Array.isArray(elements[element].behavior)) {
                for (let func of elements[element].behavior) {
                    func(y, x, grid);
                }
            }
        }
    }
}


function loop() {
    updateGrid();
    drawGrid();
    requestAnimationFrame(loop);
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const element = grid[y][x];

            if (element in elements) {
                ctx.fillStyle = elements[grid[y][x]].color;
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            } else if (element && element.startsWith('stone-')) {
                ctx.fillStyle = elements.stone.color;
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

window.addEventListener('load', function () {
    loop();
    drawSandAutomatically();
});
