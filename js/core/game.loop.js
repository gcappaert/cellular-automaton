//  /js/core/game.loop.js

function gameLoop ( scope ) {

    var loop = this;

    var fps = scope.constants.targetFps,
        fpsInterval = 1000/fps, 
        before = window.performance.now(), // gets a high-resolution timestamp
        cycles = {
            new: {
                frameCount: 0,
                startTime: before,
                sinceStart: 0
            },
            old: {
                frameCount: 0,
                startTime: before,
                sinceStart: 0
            }

        },
        

        resetInterval = 5,
        resetState = 'new';

    loop.fps = 0


    loop.main = function mainLoop( tframe ) {

        // Request a new animation frame
        // To stop the loop, can call window.cancelAnimationFrame( loop.main )
        loop.stopLoop = window.requestAnimationFrame( loop.main );

        // When did the last loop occur?

        var now = tframe,
            elapsed = now - before,
            activeCycle, targetResetInterval;
        
        if (elapsed > fpsInterval) {
            before = now - (elapsed % fpsInterval);

            for (var calc in cycles) {
                ++cycles[calc].frameCount
                cycles[calc].sinceStart = now - cycles[calc].startTime;
                }
        

        activeCycle = cycles[resetState];
        loop.fps = Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100)/100;

        targetResetInterval = (cycles.new.frameCount === cycles.old.frameCount?
            resetInterval * fps // Wait for the interval
            : (resetInterval*2) * fps); // Wait for double the interval
        
        if (activeCycle.frameCount > targetResetInterval) {
            cycles[resetState].frameCount = 0;
            cycles[resetState].startTime = now;
            cycles[resetState].sinceStart = 0;

            resetState = (resetState === 'new' ? 'old' : 'new');
            }
        
        
        scope.render(); 
        
        // Only update if start button has been pressed

        if (scope.state.start){
            scope.state = scope.update( now );
        }
               
        

        }   
    };


    loop.main();
    return loop;

};

module.exports = gameLoop;
