tileClass.abase2 = new Tile({
    COLOR: "green",
    NAME: "Green Tile",
    INIT: (tile, room) => {
        if (!room.spawnable["assaultDominators"]) room.spawnable["assaultDominators"] = [];
        room.spawnable["assaultDominators"].push(tile);
        tile.isMain = false; // Reset flag
    },
});