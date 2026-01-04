// Made using p5.js using inspiration from https://codepen.io/VoXelo/pen/myVpoLm

function setup() {
    // Create canvas that fills the window
    const canvas = createCanvas(windowWidth, windowHeight);
    
    // Attach it to a container or style it directly
    // We want it to be a fixed background
    canvas.style('display', 'block');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1'); // Behind everything
    
    // Set initial background to white
    background(255);
}

const numLines = 60; 

frequencies = [];
stroke_saturation = [];
for (let i = 0; i < numLines; i++) {
    frequencies.push(Math.random() * 0.2);
    stroke_saturation.push(Math.trunc(100+Math.random()*150));
}


function draw() {
    background(255, 25);
    
    // Strict 20:80 split
    // The sidebar is the left 20% of the screen.
    let sidebarWidth = width * 0.2;
    let centerX = 0;
    
    translate(centerX, height / 2);
    
    const time = frameCount * 0.002; 

    let maxRawAmplitude = sidebarWidth;

    for (let i = 0; i < numLines; i++) {
        const linePhase = (i / numLines);

        beginShape();


        const top = -height / 2.8;
        const bottom = height/2.2;

        const y = map(linePhase, 0, 1, top , bottom);

        const wave1 = sin(time*10*2*PI*frequencies[i] + linePhase);
        const wave2 = cos(linePhase*2*PI*frequencies[i]);
        const wave3 = sin((0.2+linePhase*0.6)*PI);
        const x =  wave3 * (1+wave1)/2 *  (1+wave2)/2 * maxRawAmplitude;

        colorMode(RGB);
        let gradient = drawingContext.createLinearGradient(0, 0, x, 0);
        let s = stroke_saturation[i];
        gradient.addColorStop(0, color(s,s,s,255));
        gradient.addColorStop(1, color(s,s,s,0));
        
        noStroke();
        drawingContext.fillStyle = gradient;
        // fill(stroke_saturation[i]);
        rect(0,y, x, (bottom-top)/numLines);

        endShape();


    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(255); // Reset background on resize to avoid streaks
}
