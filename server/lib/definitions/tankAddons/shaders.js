function init() {
    const EnableBulletShaders = true; // enable shaders for bullets, drones, etc.

    const rad = 0.4
    const clr = "black"
    const a = 1
    const r = 1

    if (EnableBulletShaders) {
        Class.genericEntity.GLOW = {
            RADIUS: rad,
            COLOR: clr,
            ALPHA: a,
            RECURSION: r
        }
    } else {
        Class.genericTank.GLOW = {
            RADIUS: rad,
            COLOR: clr,
            ALPHA: a,
            RECURSION: r
        }
    }

    Class.auraBase.GLOW = {};
}
// uncomment line below to enable (these drop your FPS a FUCK TON)

//init();