# Client
## Additions
- Added kill bar
- Added blackout
- Added radial mode

## Changes
- Leaderboard is more accurate to arras.io
- Entities will no longer draw outside the minimap

# Server
## Additions
- Added sandbox gamemode
- Added assault gamemode
- Added space gamemode (WIP)
- Added train wars gamemode (WIP; you may encounter issues)
- Added outbreak gamemode

## Changes
- Props are no longer handled by the server, except for split upgrades
- The `entities` list is now a Map
- `GameManager` is now global
- The gameManager config settings has been added into config.js
- Added portal system to travel between servers
- The tank addon folder has been renamed to `tankAddons`

# Client and Server
## Changes
- Props are handled by the client
- Overall more optimized

# NOTE FROM DEVELOPER

The server may stutter; we don't know yet what causes that but we'll try our best to fix it.

The client may lag over time but resizing your window seems to fix it.