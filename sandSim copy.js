const canvas = document.getElementById('sandCanvas');
const ctx = canvas.getContext('2d');

const gridWidth = 200;  // Change for finer granularity
const gridHeight = 150; // Change for finer granularity
const cellSize = canvas.width / gridWidth;

let grid = Array(gridHeight).fill().map(() => Array(gridWidth).fill(null));


const elements = {
    sand: {
        color: "#FFD700",   
        //density: 0.7, gravity: 0.8, slip: 0, slide: 0.8, scatter: 0,
        behavior: [],
    },
};

let elementId = 0;
for(const elementName in elements){
    elements[elementName].id = elementId++;
}

//let currentParticleType = 'sand';




elements.sand.behavior.push(function(y, x, grid) {
    // Sand behavior logic goes here, based on the extracted updateGrid function
    if (grid[y + 1][x] === null) {
        // Move sand down
        grid[y + 1][x] = 'sand';
        grid[y][x] = null;
    } else if (grid[y + 1][x] === 'water') {
        // If there's water below the sand, swap the two
        grid[y + 1][x] = 'sand';
        grid[y][x] = 'water';
    }
    // ... rest of the sand behavior ...
});

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
            


function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            if (grid[y][x] in elements){
                ctx.fillStyle = elements[grid[y][x]].color; 
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }

}

/*
canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    grid[y][x] = currentParticleType;
});
*/



function loop() {
    updateGrid();
    drawGrid();
    requestAnimationFrame(loop);
}



window.addEventListener('load', function() {
    // Logic to draw sand on the canvas automatically
    // This is a placeholder; the actual logic will depend on the structure of the JS code.
    loop();
    drawSandAutomatically();
});

function drawSandAutomatically() {
    // Logic to draw sand on the canvas
    // This is a placeholder; the actual logic will depend on the structure of the JS code.
    // For example:
    
    grid[20][20] = 'sand'; // Fill the grid with sand

    // Call any other functions required to render the grid on the canvas.
}