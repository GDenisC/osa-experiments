// Log startup messages
console.log("Starting up...");
console.log("Importing modules...\n");

const path = require('path');
const fs = require('fs');
let express;
let expressWs;
let minify;
let cors;
// Attempt to get the HTTP Express server instance.
try {
    express = require("express");
    expressWs = require("express-ws");
    minify = require("express-minify");
    cors = require("cors");
} catch (e) { // If we did not get the packages, then warn the user.
    console.warn("Package's are not correctly installed! To install all of the packages, run 'npm install' in the terminal to solve the problem.");
    console.warn("Process terminated.");
    process.exit(1);
}

const { Worker } = require("worker_threads");

// Increase the stack trace limit for better debugging
Error.stackTraceLimit = Infinity;

// Load environment variables from .env using a custom dotenv loader
const dotenv = require('./lib/dotenv.js');
const envContent = fs.readFileSync(path.join(__dirname, './.env')).toString();
const environment = dotenv(envContent);

// Set each environment variable in process.env
for (const key in environment) {
    process.env[key] = environment[key];
}

// Load all necessary modules and files via the loader
const GLOBAL = require("./loaders/loader.js");

// Optionally load all mockups if enabled in configuration
if (Config.LOAD_ALL_MOCKUPS) global.loadAllMockups();

// Log loader information including creation date and time
console.log(`Loader successfully loaded all files. Info: [ Created Date: ${GLOBAL.creationDate} Created Time: ${GLOBAL.creationTime} ]`);

// Define the public directory for static files
const publicRoot = path.join(__dirname, "../public/");

let server; // HTTP + Express server instance

// Log a warning if Access-Control-Allow-Origin is enabled
if (c.allowAccessControlAllowOrigin && c.LOGS) {
    util.warn("'Access-Control-Allow-Origin' is enabled, which allows any server/client to access it.");
}

// Create an HTTP Express server to handle both API and static file requests

server = express();
server.use(express.json());
expressWs(server);
server.use(minify());

// Set CORS headers if enabled in the configuration
if (c.allowAccessControlAllowOrigin) server.use(cors());
// Get our index html.
server.use(express.static(publicRoot));
// Serve a list of active servers (excluding hidden ones)
server.get("/getServers.json", function(request, response) {
    response.send(JSON.stringify(servers.filter(s => s && !s.hidden).map(server => ({
        ip: server.ip,
        players: server.players,
        maxPlayers: server.maxPlayers,
        id: server.id,
        region: server.region,
        gameMode: server.gameMode
    }))));
});
server.get("/getTotalPlayers", function(request, response) {
    let countPlayers = 0;
    servers.forEach(s => {
        countPlayers += s.players;
    });
    response.send(JSON.stringify(countPlayers));
});

// Loads a game server
function loadGameServer(host, gamemode, region, properties, glitchMode = false) {
    // If glitch mode is enabled, create the game server directly without a worker thread
    if (glitchMode) {
        const GameServer = require("./game.js").gameServer;
        new GameServer(c.host, c.port, gamemode, region, properties, false);
        return;
    }
    // If multi-port support is not allowed (e.g., on Glitch), throw an error
    if (c.host.endsWith("glitch.me")) {
        throw new Error("Glitch does not support multi ports! Please enable glitch mode (c.GLITCH_MODE) to solve this error.");
    }
    // Determine the new server index and initialize an empty object in the global servers array
    let index = global.servers.length;
    global.servers.push({});

    // Create a new worker thread to load the game server asynchronously
    let worker = new Worker("./server/serverLoader.js", {
        workerData: {
            host,
            port: c.port + index + 1, // Increment port for each server
            gamemode,
            region,
            properties
        }
    });

    // Listen for messages from the worker to update the server's status
    worker.on("message", message => {
        const flag = message.shift();
        switch (flag) {
            case false:
                // Initial load: store server details
                global.servers[index] = message.shift();
                break;
            case true:
                // Update: change the server's player count
                global.servers[index].players = message.shift();
                break;
            case "doneLoading":
                // Once loading is complete, trigger the server loaded callback
                onServerLoaded();
                break;
        }
    });
}

// Server Loaded Callback
let loadedServers = 0;
global.onServerLoaded = () => {
    loadedServers++;
    // Once all servers are loaded, log the status and routing table
    if (loadedServers >= global.servers.length) {
        util.saveToLog("Servers up", "All servers booted up.", 0x37F554);
        if (c.LOGS) {
            util.log("Dumping endpoint -> gamemode routing table");
            for (const game of global.servers) {
                console.log("> " + `${c.host}/#${game.id}`.padEnd(40, " ") + " -> " + game.gameMode);
            }
            console.log("\n");
        }
        let serverStartEndTime = performance.now();
        console.log("Server loaded in " + util.rounder(serverStartEndTime, 4) + " milliseconds.");
        console.log("[WEB SERVER + EXPRESS] Server listening on port", Config.port);
    }
};

// Start the HTTP Server & Load Game Servers
server.listen(Config.port, () => {
    // If running in glitch mode, load a single game server
    if (Config.GLITCH_MODE) {
        loadGameServer(false, ["teams"], "local", {
            hidden: false,
            gameSpeed: 1,
            runSpeed: 1.5,
            maxPlayers: 10,
            serverID: 'local',
            TILE_WIDTH: 450,
            TILE_HEIGHT: 450,
            ENABLE_FOOD: true,
            FOOD_CAP: 70,
            FOOD_CAP_NEST: 15,
            ENEMY_CAP_NEST: 10,
            FOOD_MAX_GROUP_TOTAL: 6,
            BOTS: 0,
        }, true); // glitchMode enabled
        return;
    }
    /* HOST, GAMEMODE, REGION, { SERVER PROPERTIES } */
    loadGameServer("localhost:3001", ["ffa"], "local", {
        hidden: false,
        gameSpeed: 1,
        runSpeed: 1.5,
        maxPlayers: 10,
        serverID: 'localsb',
        TILE_WIDTH: 420,
        TILE_HEIGHT: 420,
        ENABLE_FOOD: false,
        FOOD_CAP: 10,
        FOOD_CAP_NEST: 3,
        ENEMY_CAP_NEST: 1,
        FOOD_MAX_GROUP_TOTAL: 2,
        BOTS: 20,
    }); /* HOST, GAMEMODE, REGION, { SERVER PROPERTIES } */
    /*loadGameServer("localhost:3002", ["teams", "domination"], "local", { 
        hidden: false,
        gameSpeed: 1,
        runSpeed: 1.5,
        maxPlayers: 10,
        serverID: 'loc1',
        TILE_WIDTH: 420,
        TILE_HEIGHT: 420,
        ENABLE_FOOD: true,
        FOOD_CAP: 70,
        FOOD_CAP_NEST: 15,
        ENEMY_CAP_NEST: 10,
        FOOD_MAX_GROUP_TOTAL: 6,
        BOTS: 0,
     });*/ /* HOST, GAMEMODE, REGION, { SERVER PROPERTIES } */
     /*loadGameServer("localhost:3003", ["mothership"], "local", {
        hidden: false,
        gameSpeed: 1,
        runSpeed: 1.5,
        maxPlayers: 10,
        serverID: 'loc2',
        TILE_WIDTH: 420,
        TILE_HEIGHT: 420,
        ENABLE_FOOD: true,
        FOOD_CAP: 70,
        FOOD_CAP_NEST: 15,
        ENEMY_CAP_NEST: 10,
        FOOD_MAX_GROUP_TOTAL: 6,
        BOTS: 100,
     });*/ /* HOST, GAMEMODE, REGION, { SERVER PROPERTIES } */
     /*loadGameServer("localhost:3004", ["siege_blitz"], "local", { 
        hidden: false,
        gameSpeed: 1,
        runSpeed: 1.5,
        maxPlayers: 10,
        serverID: 'loc3',
        TILE_WIDTH: 470,
        TILE_HEIGHT: 470,
        ENABLE_FOOD: true,
        FOOD_CAP: 70,
        FOOD_CAP_NEST: 15,
        ENEMY_CAP_NEST: 10,
        FOOD_MAX_GROUP_TOTAL: 6,
        BOTS: 0,
    });*/
});

// Upgrade HTTP connections to WebSocket connections if applicable
server.ws('/', (ws, req) => {
    // In glitch mode, pass the connection to the first server's game manager
    if (Config.GLITCH_MODE) {
        global.servers[0].gameManager.socketManager.connect(ws, req);
    } else {
        // Otherwise, close the WebSocket connection
        ws.close();
    }
})

// Set up a loop to periodically call Bun's garbage collector if available
let bunLoop = setInterval(() => {
    try {
        Bun.gc(true);
    } catch (e) {
        // If Bun.gc fails, clear the interval
        clearInterval(bunLoop);
    }
}, 1000);

// Log that the web server has been initialized if logging is enabled
if (c.LOGS) console.log("Web Server initialized.");
