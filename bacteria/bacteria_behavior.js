import { grid, processed, canvas, globalY, TIMESCALE} from '../sandSim.js';
import { topGrid } from '../sandSim.js';
import Bacteria from './bacteria.js';
import { elements, timeMove, changeChosenDirection, chosenDirection} from '../sandSim.js';
import {generateSoil} from '../aggregate/aggregate_behavior.js';


export function bacteriaBehavior (y, x, grid){
    //console.log(TIMESCALE);
    const gridHeight = grid.length;
    const gridWidth = grid[0].length;

    let currentBac = findBacteriaByPosition(elements.bacteria.bacteriaElements, x, y)

    if (topGrid[y][x] == "chemInWater"){
        currentBac.lifespan = 0;
    }

    // if bacteria is fading, dont move
    if (currentBac.fading) {      
        return;
    }

    let DISDANCE = 40;
    const result = currentBac.IfNearLiquidSugar(DISDANCE, grid);

    let Agregate = currentBac.IfNearBacteria(5, grid, 2)
    //console.log("agr", Agregate)
    
    if (Agregate){
        generateSoil(y, x);
    }
    
    

    let ifNear = result.ifNear;
    let priorityDirection = result.priorityDirection;
    //console.log(priorityDirection);

    if (ifNear) {
        //console.log(timeMove % elements.bacteria.frameTimer);
        if (timeMove % (elements.bacteria.frameTimer) == 0) {

            changeChosenDirection(priorityDirection);

            //console.log(chosenDirection);
            let random = Math.floor(Math.random() * 4);
            if (random == 0){
                changeChosenDirection(currentBac.choseDirection());
            }
            

            

            // Apply the movement
            let newY = y + chosenDirection.dy;
            let newX = x + chosenDirection.dx;

            

            if (topGrid[newY][newX] === 'liquidSugar') {
    
                topGrid[newY][newX] = null;
                
                // Create bacteria at the original position
                if(TIMESCALE>1 && TIMESCALE!=8){
                    elements.bacteria.bacteriaElements.push(new Bacteria("#800080", 15, null, 0, [], newX, newY, 7000*TIMESCALE, grid[newY][newX]));
                }
                else{
                    elements.bacteria.bacteriaElements.push(new Bacteria("#800080", 15, null, 0, [], newX, newY, 7000, grid[newY][newX]));
                }
                
                grid[newY][newX] = 'bacteria';
            
                const numberOfBacteria = 3; // Number of bacteria to generate
                const range = 3; // The range within which to generate bacteria
            
                if ((TIMESCALE > 1 && TIMESCALE != 8)|| elements.bacteria.bacteriaElements.length<15){
                    for (let i = 0; i < numberOfBacteria; i++) {
                        const randomDX = Math.floor(Math.random() * (range * 2 + 1)) - range;
                        const randomDY = Math.floor(Math.random() * (range * 2 + 1)) - range;
                
                        const x = newX + randomDX;
                        const y = newY + randomDY;
                
                        
                        // Check grid boundaries if needed
                        let newBac = 0
                        if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
                            console.log('sugar bac')
                            
                            topGrid[y][x] = null;
                            if (grid[y][x] !== null && grid[y][x] !== 'plant' && grid[y][x] !== 'water'){
                                elements.bacteria.bacteriaElements.push(new Bacteria("#800080", 15, null, 0, [], x, y, 7000*TIMESCALE, grid[y][x]));
                                grid[y][x] = 'bacteria';
                                newBac ++;
                                if (newBac >=TIMESCALE && newBac >=2 && newBac <5){
                                    return;
                                }
                            }
                            
                            
                        }
                        
                    }
                }
            }
             else {
                currentBac.bacteriaMovement(newY, newX, grid, processed);
            }
            
        }
        
    }
    else {
        //console.log(timeMove % elements.bacteria.frameTimer);
        if (timeMove % elements.bacteria.frameTimer == 0) {

            //directionTimer smaller change direction more frequentlly
            if (elements.bacteria.directionTimer % 5 !== 0) {
                changeChosenDirection(currentBac.choseDirection());
            }
            else {
                if (currentBac.currentDirection !== null) {
                    changeChosenDirection(currentBac.choseDirection());
                    // If the bacteria is touching any boundary, choose a new direction
                    if (y == 0 || y == gridHeight - 1 || x == 0 || x == gridWidth - 1) {
                        changeChosenDirection(currentBac.choseDirection());
                    }
                }
                else {
                    changeChosenDirection(currentBac.choseDirection());
                }
            }
            elements.bacteria.directionTimer++;
            //console.log(chosenDirection);



            // Apply the movement
            let newY = y + chosenDirection.dy;
            let newX = x + chosenDirection.dx;

            currentBac.bacteriaMovement(newY, newX, grid, processed);

        }
    }
}

export function findBacteriaByPosition(bacteriaElements, x, y) {
    for (let bacteria of bacteriaElements) {
        if (bacteria.x === x && bacteria.y === y) {
            return bacteria;
        }
    }
    return null;  // Return null if no matching bacteria is found
}

export function generateBacterial() {
    let currY = globalY;

    const assignRandomLife = () => Math.floor(Math.random() * (5000*TIMESCALE - 4000*TIMESCALE + 1)) + 4000*TIMESCALE*2;

    for (let i = 0; i < 50; i++) {
        const randomX = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
        const randomY = Math.floor(Math.random() * ((currY + 20) - currY + 1)) + currY;
        if (grid[randomY][randomX] == 'soil') {
            elements.bacteria.bacteriaElements.push(new Bacteria("#800080", 15, null, 0, [], randomX, randomY, assignRandomLife()))
            grid[randomY][randomX] = 'bacteria';
        }
    }

    for (let i = 0; i < 40; i++) {
        const randomX = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
        const randomY = Math.floor(Math.random() * ((currY + 30) - (currY + 20) + 1)) + (currY + 20);
        if (grid[randomY][randomX] == 'soil') {
            grid[randomY][randomX] = 'bacteria';
            elements.bacteria.bacteriaElements.push(new Bacteria("#800080", 15, null, 0, [], randomX, randomY, assignRandomLife()))
        }
    }

    for (let i = 0; i < 10; i++) {
        const randomX = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
        const randomY = Math.floor(Math.random() * ((currY + 50) - (currY + 30) + 1)) + (currY + 30);
        if (grid[randomY][randomX] == 'soil') {
            grid[randomY][randomX] = 'bacteria';
            elements.bacteria.bacteriaElements.push(new Bacteria("#800080", 15, null, 0, [], randomX, randomY, assignRandomLife()))
        }
    }
}
