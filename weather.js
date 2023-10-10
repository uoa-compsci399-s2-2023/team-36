

export let sunShow = true;
export let rainShow = false;

export function drawSun(ctx, canvas, pixelSize) {
    if (sunShow) {
        let sunPixels = [
            "      X       ",
            "   X XX XXX   ",
            "   XXXXXXX    ",
            " X XX....XXXX ",
            " XXX......XX  ",
            " XX........XX ",
            "  X........XXX",
            "XXX........X  ",
            " XX........XX ",
            "  XX......XXX ",
            " XXXX....XX X ",
            "    XXXXXXX   ",
            "   XXX XX X   ",
            "       X      ",
        ];

        let startX = (canvas.width - (sunPixels[0].length * pixelSize)) + 30;
        let startY = 0;

        for (let y = 0; y < sunPixels.length; y++) {
            for (let x = 0; x < sunPixels[y].length; x++) {
                switch (sunPixels[y][x]) {
                    case 'X':
                        ctx.fillStyle = 'orange';
                        break;
                    case '.':
                        ctx.fillStyle = 'yellow';
                        break;
                    default:
                        ctx.fillStyle = 'transparent';
                        break;
                }
                ctx.fillRect(startX + x * pixelSize, startY + y * pixelSize, pixelSize, pixelSize);
            }
        }
    }
}

export function generateRain(grid, gridWidth) {
    if (rainShow) {
        if (Math.random() < 0.8) {
            let x = Math.floor(Math.random() * gridWidth);
            let raindropLength = Math.floor(Math.random() * 3) + 1; // Random number between 1 and 3

            for (let i = 0; i < raindropLength; i++) {
                if (grid[i][x] === null) {
                    grid[i][x] = 'water';
                }
            }
        }
    }
}


setInterval(() => {
    rainShow = true;  // Start rain
    sunShow = false;

    setTimeout(() => {
        rainShow = false;  // Stop rain after 10s
    }, 10 * 1000);

    setTimeout(() => {
        sunShow = true;  // Show sun after 15s (10s rain + 3s nothing)
    }, 13 * 1000);

}, 27 * 1000);

