class Maze {
    constructor(gameManager, type) {
        this.type = type;
    }
    generate() {
        // Spawn maze
        let mazeGenerator = new global.mazeGenerator.MazeGenerator(this.type);
        let { squares, width, height } = mazeGenerator.placeMinimal();
        for (let instance of entities) {
            if (instance.type == "wall") instance.kill();
        }
        squares.forEach(element => {
            let wall = new Entity({
                x: global.gameManager.room.width / width * element.x - global.gameManager.room.width / 2 + global.gameManager.room.width / width / 2 * element.size, 
                y: global.gameManager.room.height / height * element.y - global.gameManager.room.height / 2 + global.gameManager.room.height / height / 2 * element.size
            })
            wall.define("wall");
            wall.SIZE = global.gameManager.room.width / width / 2 * element.size / lazyRealSizes[4] * Math.SQRT2 - 2;
            wall.protect();
            wall.life();
            makeHitbox(wall);
            walls.push(wall);
            wall.on("dead", () => {
                util.remove(walls, walls.indexOf(wall));
            })
        });
    }
    redefine(type) {
        this.type = type;
    }
}

module.exports = { Maze };