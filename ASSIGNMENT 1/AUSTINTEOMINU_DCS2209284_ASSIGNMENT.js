let redBallSize = 50; // Size of the "SECOND" red ball 
let yellowBallSize = 50; // Size of the "THIRD" yellow ball 
let shrinking = true; // Shrinking animation for "FIRST" yellow ball 
let yellowRingComplete = false; // Yellow ring will be gone after the animation is finished 
let shrinkRate = 1; // Speed for "FIRST" ball shrink 
let yellowRingSize = 80; // Size of the "FIRST" yellow ring 
let yellowRingAlpha = 90; // Opaque for the "FIRST" circle animation 
let yellowRingShrinkRate = 2; // Speed for "FIRST" yellow ring shrink 
let yellowCircleAlpha = 0; // Opaque for the "FIRST" yellow circle 
let yellowCircleSize = 80; // Size for the "FIRST" filled yellow circle 
let growthRate = 2; // Rate for "TWO MIDDLE" circle grow  
let growthComplete = false; // Flag to track growth completion 
let transitionToMiddleBig = false; // Flag to start the final animation 
let MiddleBallSize = 80; // Size of the "TWO MIDDLE" ball 
let finalMiddleBallSize = 80; // Final size for "TWO MIDDLE" ball after shrinking 
let smallCircleSize = 10; // Size of the "TWO MIDDLE SMALL" circles 
let finalSmallCircleSize = 80; // Final size for "TWO MIDDLE SMALL" circles after growth 
let smallCircleGrowthRate = 2.7; // Speed for "TWO MIDDLE SMALL" circles grow 
let halfCircleRectComplete = false; // Flag to track half-circular rectangle animation completion 
let animationComplete = false; // Flag to indicate the end of all animations 
let halfRingRotation = 0; // Rotation angle for the half ring 
let rotationSpeed = 0.1; // Speed of the rotation 
let rotationsCount = 0; // Count of rotations 
let t = 0; 
let img;
 
 
function setup() { 
  createCanvas(880, 440); 
  noStroke(); 
  img= loadImage('cic.png')
} 
 
function draw() { 
  background(0); 
   
  image(img,390,20,100,100);
  if (!yellowRingComplete) { 
    fill(0, 0, 255); // Blue circle 
    ellipse(233, 220, 80, 80); 
 
    noFill(); // Yellow ring inside the blue circle 
    stroke(255, 255, 0, yellowRingAlpha); 
    strokeWeight(30); 
    ellipse(233, 220, yellowRingSize, yellowRingSize); 
  } 
 
  noStroke(); // Red circle 
  fill(255, 0, 0); 
  ellipse(377, 220, redBallSize, redBallSize); 
 
  fill(255, 255, 0); // Yellow circle 
  ellipse(510, 220, yellowBallSize, yellowBallSize); 
 
  fill(0, 255, 0); // Green circle 
  ellipse(650, 220, 80, 80); 
 
  // Animation logic for shrinking balls 
  if (shrinking) { 
    redBallSize -= shrinkRate; 
    yellowBallSize -= shrinkRate; 
    yellowRingAlpha += 15; 
    yellowRingSize -= yellowRingShrinkRate; 
    if (yellowRingAlpha >= 255) yellowRingAlpha = 255; 
    if (yellowRingSize <= 50) { 
      shrinking = false; 
      yellowRingComplete = true; 
    } 
  } 
 
  // Draw the filled yellow circle and shrink it when the animation is complete 
  if (yellowRingComplete) { 
    if (yellowCircleAlpha < 255) { 
      yellowCircleAlpha += 100; // Increase alpha gradually 
      if (yellowCircleAlpha > 255) yellowCircleAlpha = 255; 
    } 
    if (yellowCircleAlpha == 255 && yellowCircleSize > 40) { 
      yellowCircleSize -= 2; // Shrink the yellow circle 
      if (yellowCircleSize < 40) yellowCircleSize = 40; 
    } 
    fill(255, 255, 0, yellowCircleAlpha); // Yellow circle with alpha 
    ellipse(233, 220, yellowCircleSize, yellowCircleSize); 
  } 
 
  //   Middle Small circle grow from small size 
  if (transitionToMiddleBig) { 
    if (MiddleBallSize > finalMiddleBallSize) { 
      MiddleBallSize -= shrinkRate; 
    } 
    if (redBallSize < MiddleBallSize) { 
      redBallSize += growthRate; 
    } 
    if (yellowBallSize < MiddleBallSize) { 
       yellowBallSize += growthRate; 
    } 
    // Mark animation as complete when the middle ball sizes reach the final size 
    if (MiddleBallSize <= finalMiddleBallSize && redBallSize >= MiddleBallSize && yellowBallSize >= MiddleBallSize) { 
      animationComplete = true; 
    } 
  } 
   
  // Growth logic for red and yellow circles after initial shrink 
  if (yellowRingComplete && !growthComplete) { 
    redBallSize += growthRate; 
    yellowBallSize += growthRate; 
    if (redBallSize >= 0 + 1 && yellowBallSize >= 0 + 1) { 
       growthComplete = true;
} 
  } 
 
    // Start Middle Small Circle Grow after growth is complete 
    if (growthComplete && !transitionToMiddleBig) { 
      transitionToMiddleBig = true; 
   } 
 
  // Draw Small circles in the middle of red and yellow circles 
  if (growthComplete) { 
    if (smallCircleSize < finalSmallCircleSize) { 
      smallCircleSize += smallCircleGrowthRate; // Increase size gradually 
      if (smallCircleSize > finalSmallCircleSize) smallCircleSize = finalSmallCircleSize; 
    }  
   
    fill(255, 255, 0); // Small yellow circle 
    ellipse(377, 220, smallCircleSize, smallCircleSize); 
   
    fill(255, 0, 0); // Small red circle 
    ellipse(510, 220, smallCircleSize, smallCircleSize); 
 
if (millis() - 0 >= 670) { 
    let startX = 335; // Starting x position of the rectangle
    let initialWidth = 80; // Initial width of the rectangle
    let finalWidth = 215; // Final width of the rectangle
    let extendDuration = 100; // Duration for the extension animation
    let disappearDelay = 100; // Delay before starting the disappearance
    let totalDuration = extendDuration + disappearDelay; // Total duration for the extension and disappearance
    let elapsed = millis() - 670; // Elapsed time since the start of the animation
    let newWidth;
    let disappearingStartX;

    if (elapsed < extendDuration) {
        // Extend the rectangle
        newWidth = lerp(initialWidth, finalWidth, elapsed / extendDuration);
        disappearingStartX = startX;
    } else if (elapsed < totalDuration) {
        // Start disappearing the rectangle
        let disappearElapsed = elapsed - extendDuration;
        newWidth = lerp(finalWidth, 0, disappearElapsed / disappearDelay);
        disappearingStartX = startX + (finalWidth - newWidth);
    } else {
        // After disappearing, set width to 0
        newWidth = 0;
    }
    fill(255, 255, 0); // Yellow color
    rect(disappearingStartX, 180, newWidth, smallCircleSize, 100, 100, 100, 100); // Draw the rectangle
    t += 0.025; 
    if (t > 1) { 
        t = 1; 
      } 
    } 
  } 
 
  // Draw the rotating half ring on the first circle once the entire animation is complete 
  if (animationComplete) { 
    push(); 
    translate(233, 220); 
    rotate(halfRingRotation); 
    drawHalfRing(0, 0, 80, 60, PI, TWO_PI); 
    pop(); 
 
    halfRingRotation += rotationSpeed; 
 
    // Count the rotations 
    if (halfRingRotation >= TWO_PI) { 
      rotationsCount++; 
      halfRingRotation = 0; 
    } 
 
    // Stop after 2 rotations 
    if (rotationsCount >= 2) { 
      noLoop(); // Stop the draw loop 
    } 
  } 
} 
 
function drawHalfRing(x, y, outerDiameter, innerDiameter, startAngle, endAngle) { 
  noFill(); 
  stroke(0, 0, 255); // Color for the half ring 
 
  // Draw the outer arc 
  strokeWeight((outerDiameter - innerDiameter) / 2); 
  arc(x, y, outerDiameter, outerDiameter, startAngle, endAngle); 
}