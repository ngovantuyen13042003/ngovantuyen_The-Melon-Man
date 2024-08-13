game.player2 = {
    x: 54,
    y: 0,
    height: 24,
    highestY: 0,
    direction: "left",
    isInAir: false,
    startedJump: false,
    canDoubleJump: false,  // New property to track double jump
    moveInterval: null,
    fallTimeout: function(startingY, time, maxHeight) {
        setTimeout(function() {
            if (this.isInAir) {
                this.y = startingY - maxHeight + Math.pow((-time / 3 + 11), 2);
                if (this.y < this.highestY) {
                    this.highestY = this.y;
                }
                if (time > 37) {
                    this.startedJump = false;
                    game.checkCollisions();
                }
                if (time < 150) {
                    time++;
                    this.fallTimeout(startingY, time, maxHeight);
                } else {
                    game.isOver = true;
                }
                if (this.y > 40) {
                    game.isOver = true;
                }
                game.requestRedraw();
            }
        }.bind(this, startingY, time, maxHeight), 12);
    },
    animationFrameNumber: 0,
    collidesWithGround: true,
    animations: {
        left: [
            {tileColumn: 1, tileRow: 4}, // Walk left frame 1
            {tileColumn: 2, tileRow: 4}, // Walk left frame 2
            {tileColumn: 3, tileRow: 4}, // Walk left frame 3
            {tileColumn: 4, tileRow: 4}  // Walk left frame 4
        ],
        right: [
            {tileColumn: 4, tileRow: 4}, // Walk right frame 1
            {tileColumn: 6, tileRow: 4}, // Walk right frame 2
            {tileColumn: 7, tileRow: 4}, // Walk right frame 3
            {tileColumn: 8, tileRow: 4}  // Walk right frame 4
        ]
    },
    jump: function (type) {
        if (!this.isInAir) {
            clearInterval(this.fallInterval)
            game.sounds.jump.play()
            this.isInAir = true
            this.startedJump = true
            var startingY = this.y
            var time = 1
            maxHeight = 121
            if (type == "fall") {
                time = 30
                maxHeight = 0
            }
            this.fallTimeout(startingY, time, maxHeight)
        }
    }
}


