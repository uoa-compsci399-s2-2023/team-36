import { cellSize, globalY } from "./sandSim.js";
export function drawGrass(ctx, canvas) {
    const colors = [
        '#9dc183', // Light green
        '#89b471', // Medium green
        '#779a60'  // Dark green
    ];



    let grassPixels = [
        "                                                        0000                                                                             ",
        "         2222           111  111                       0000000000    1111                                                                ",
        "     222222222        111111111111  00 0000  111 11   0000022202211111111111                                                             ",
        "    0002002222222     111111112222222000000111111111110002222222222000000111111                          1111                            ",
        "  000000000222222   000111111100200222200000111111000000222222222222000000022222111                    111100000 0            0 000      ",
        "  00000000022222220000001111100000022222000011111000000020002222222000000000222221111                01111110000000         00000000     ",
        "00000000000022222200022221110000000022222001111100000002200000022222111000222222221111100          00222111000000022  22 0000000111100   ",
        "0000000000002222220002222220000000000222201111100000000220000000221111110022222222200000000       0002222111000000222222200000111110000  ",
        " 0000000000002222000222222200000000000220011111100000000000000002111111110222222222000000000     000002221110000022222222222111111000000 ",
        "  000000000002222000222222200000000000220011111100000000000000222211111111222222222000000000     0022222211111122222222222211111110000000",
    ];

    let startX = 0; 
    //let startY = (Math.ceil(70*pixelSize/(canvas.width/canvas.height)));

    
    let startY = globalY-10;
    //console.log(startY);
    //let startY = (globalY-10)*cellSize; // height for soil - x
    /*
    if(canvas.width > canvas.height && canvas.width/canvas.height >1.33){
        let difference = (Math.ceil(10/(canvas.width/canvas.height)));
        startY = (Math.ceil((70-difference)/(canvas.width/canvas.height)));
    }
    */

    
    
    
    for (let y = 0; y < grassPixels.length; y++) {
        for (let x = 0; x < grassPixels[y].length; x++) {
            switch (grassPixels[y][x]) {
                case '0':
                    ctx.fillStyle = colors[0];
                    break;
                case '1':
                    ctx.fillStyle = colors[1];
                    break;
                case '2':
                    ctx.fillStyle = colors[2];
                    break;
                default:
                    ctx.fillStyle = 'transparent';
                    break;
            }
            ctx.fillRect((startX + x) * cellSize, (startY + y) * cellSize, cellSize, cellSize);  // Remove the * pixelSize from startY
        }
    }
}