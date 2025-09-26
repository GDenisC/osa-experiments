function simplecollide(my, n) {
    // Cache values to avoid redundant calculations
    const dx = my.x - n.x, dy = my.y - n.y;
    const dist = Math.hypot(dx, dy);
    const difference = (1 + dist / 2) * global.gameManager.runSpeed;
    const pushability1 = my.intangibility ? 1 : my.pushability;
    const pushability2 = n.intangibility ? 1 : n.pushability;
    const factor = pushability1 / (pushability2 + 0.3) * 0.05 / difference;
    const fx = dx * factor, fy = dy * factor;
    my.accel.x += fx;
    my.accel.y += fy;
    n.accel.x -= fx;
    n.accel.y -= fy;
}

function firmcollide(my, n, buffer = 0) {
    // Cache positions and motions
    const mx = my.x + my.xMotion, myy = my.y + my.yMotion;
    const nx = n.x + n.xMotion, ny = n.y + n.yMotion;
    const dx = nx - mx, dy = ny - myy;
    const distSq = dx * dx + dy * dy;
    if (distSq === 0) return; // Prevent divide-by-zero

    const totalSize = my.realSize + n.realSize;
    const bufferLimit = totalSize + buffer;
    if (buffer > 0 && distSq <= bufferLimit * bufferLimit) {
        const dist = Math.sqrt(distSq);
        const factor = ((my.acceleration + n.acceleration) * (bufferLimit - dist)) /
            (buffer * global.gameManager.runSpeed * dist);
        const accelX = dx * factor, accelY = dy * factor;
        my.accel.x -= accelX;
        my.accel.y -= accelY;
        n.accel.x += accelX;
        n.accel.y += accelY;
    }
    if (distSq > totalSize * totalSize) return;

    const dist = Math.sqrt(distSq);
    const overlap = totalSize - dist;
    const iterations = Math.min(20, (overlap * 20) | 0);
    const factor = 0.01 * iterations / (dist * global.gameManager.runSpeed);
    const adjustX = dx * factor, adjustY = dy * factor;

    const mySpeed = Math.hypot(my.velocity.x, my.velocity.y);
    const nSpeed = Math.hypot(n.velocity.x, n.velocity.y);

    if (mySpeed <= Math.max(mySpeed, my.topSpeed)) {
        my.velocity.x -= adjustX;
        my.velocity.y -= adjustY;
    }
    if (nSpeed <= Math.max(nSpeed, n.topSpeed)) {
        n.velocity.x += adjustX;
        n.velocity.y += adjustY;
    }
}

function reflectcollide(wall, bounce) {
    // Use cached values and avoid repeated Math.sqrt
    const dx = wall.x - bounce.x, dy = wall.y - bounce.y;
    const dist = Math.hypot(dx, dy);
    const difference = wall.size + bounce.size - dist;
    if (difference > 0) {
        const factor = difference / dist;
        bounce.accel.x -= factor * dx;
        bounce.accel.y -= factor * dy;
        return 1;
    }
    return 0;
}

function advancedcollide(my, n, doDamage, doInelastic, nIsFirmCollide = false) {
    let tock = Math.min(my.stepRemaining, n.stepRemaining),
        combinedRadius = n.size + my.size,
        motion_me = new Vector(my.xMotion, my.yMotion),
        motion_n = new Vector(n.xMotion, n.yMotion),
        delta_x = tock * (motion_me.x - motion_n.x),
        delta_y = tock * (motion_me.y - motion_n.y),
        delta_length = Math.hypot(delta_x, delta_y),
        difference_x = my.x - n.x,
        difference_y = my.y - n.y,
        difference_length = Math.hypot(difference_x, difference_y),
        direction_x = (n.x - my.x) / difference_length,
        direction_y = (n.y - my.y) / difference_length,
        component = Math.max(0, direction_x * delta_x + direction_y * delta_y);

    if (component < difference_length - combinedRadius) return;

    let goahead = false,
        tmin = 1 - tock,
        tmax = 1,
        deltaLengthSquared = delta_x * delta_x + delta_y * delta_y,
        B = 2 * (delta_x * difference_x + delta_y * difference_y),
        C = difference_length * difference_length - combinedRadius * combinedRadius,
        det = B * B - (4 * deltaLengthSquared * C),
        t;
    if (!deltaLengthSquared || det < 0 || C < 0) {
        t = 0;
        if (C < 0) goahead = true;
    } else {
        let sqrtDet = Math.sqrt(det);
        let t1 = (-B - sqrtDet) / (2 * deltaLengthSquared),
            t2 = (-B + sqrtDet) / (2 * deltaLengthSquared);
        if (t1 < tmin || t1 > tmax) {
            if (t2 < tmin || t2 > tmax) {
                t = false;
            } else {
                t = t2;
                goahead = true;
            }
        } else {
            if (t2 >= tmin && t2 <= tmax) {
                t = Math.min(t1, t2);
                goahead = true;
            } else {
                t = t1;
                goahead = true;
            }
        }
    }
    if (!goahead) return;

    my.collisionArray.push(n);
    n.collisionArray.push(my);
    if (t) {
        my.x += motion_me.x * t;
        my.y += motion_me.y * t;
        n.x += motion_n.x * t;
        n.y += motion_n.y * t;
        my.stepRemaining -= t;
        n.stepRemaining -= t;
        difference_x = my.x - n.x;
        difference_y = my.y - n.y;
        difference_length = Math.hypot(difference_x, difference_y);
        direction_x = (n.x - my.x) / difference_length;
        direction_y = (n.y - my.y) / difference_length;
        component = Math.max(0, direction_x * delta_x + direction_y * delta_y);
    }

    let componentNorm = component / (delta_length || 1);
    let reductionFactor = 1,
        deathFactor_me = 1,
        deathFactor_n = 1,
        accelerationFactor = delta_length ? (combinedRadius / 4) / (Math.floor(combinedRadius / delta_length) + 1) : 0.001,
        depth_me = util.clamp((combinedRadius - difference_length) / (2 * my.size), 0, 1),
        depth_n = util.clamp((combinedRadius - difference_length) / (2 * n.size), 0, 1),
        combinedDepth_up = depth_me * depth_n,
        combinedDepth_down = (1 - depth_me) * (1 - depth_n),
        pen_me_sqrt = Math.sqrt(my.penetration),
        pen_n_sqrt = Math.sqrt(n.penetration),
        savedHealthRatio_me = my.health.ratio,
        savedHealthRatio_n = n.health.ratio;

    if (doDamage) {
        let speedFactor_me = my.maxSpeed ? Math.pow(motion_me.length / my.maxSpeed, 0.25) : 1,
            speedFactor_n = n.maxSpeed ? Math.pow(motion_n.length / n.maxSpeed, 0.25) : 1;
        let bail = false;
        if (n.type === 'food' && my.settings.necroTypes.includes(n.shape)) {
            bail = my.necro(n);
        } else if (my.type === 'food' && n.settings.necroTypes.includes(my.shape)) {
            bail = n.necro(my);
        }
        if (!bail) {
            let resistDiff = my.health.resist - n.health.resist,
                damage_me = Config.DAMAGE_CONSTANT * my.damage * (1 + resistDiff) * (1 + n.heteroMultiplier * (my.settings.damageClass === n.settings.damageClass)) * ((my.settings.buffVsFood && n.settings.damageType === 1) ? 3 : 1) * my.damageMultiplier() * Math.min(2, Math.max(speedFactor_me, 1) * speedFactor_me),
                damage_n = Config.DAMAGE_CONSTANT * n.damage * (1 - resistDiff) * (1 + my.heteroMultiplier * (my.settings.damageClass === n.settings.damageClass)) * ((n.settings.buffVsFood && my.settings.damageType === 1) ? 3 : 1) * n.damageMultiplier() * Math.min(2, Math.max(speedFactor_n, 1) * speedFactor_n);

            if (my.settings.ratioEffects) {
                damage_me *= Math.min(1, Math.pow(Math.max(my.health.ratio, my.shield.ratio), 1 / my.penetration));
            }
            if (n.settings.ratioEffects) {
                damage_n *= Math.min(1, Math.pow(Math.max(n.health.ratio, n.shield.ratio), 1 / n.penetration));
            }
            if (my.settings.damageEffects) {
                damage_me *= accelerationFactor * (1 + (componentNorm - 1) * (1 - depth_n) / my.penetration) * (1 + pen_n_sqrt * depth_n - depth_n) / pen_n_sqrt;
            }
            if (n.settings.damageEffects) {
                damage_n *= accelerationFactor * (1 + (componentNorm - 1) * (1 - depth_me) / n.penetration) * (1 + pen_me_sqrt * depth_me - depth_me) / pen_me_sqrt;
            }
            let damageToApply_me = damage_me, damageToApply_n = damage_n;
            if (n.shield.max) damageToApply_me -= n.shield.getDamage(damageToApply_me);
            if (my.shield.max) damageToApply_n -= my.shield.getDamage(damageToApply_n);
            let stuff = my.health.getDamage(damageToApply_n, false);
            deathFactor_me = (stuff > my.health.amount) ? my.health.amount / stuff : 1;
            stuff = n.health.getDamage(damageToApply_me, false);
            deathFactor_n = (stuff > n.health.amount) ? n.health.amount / stuff : 1;
            reductionFactor = Math.min(deathFactor_me, deathFactor_n);
            const __my = damage_n * deathFactor_n;
            const __n = damage_me * deathFactor_me;
            my.damageReceived += __my * Number(__my > 0
                ? my.team != n.team
                : n.healer && n.team == my.team && my.type == "tank" && n.master.id != my.id);
            n.damageReceived += __n * Number(__n > 0
                ? my.team != n.team
                : my.healer && n.team == my.team && n.type == "tank" && my.master.id != n.id);
        }
    }
    if (n.healer && n.team == my.team && my.type == "tank" && n.master.id != my.id) return;
    if (my.healer && n.team == my.team && n.type == "tank" && my.master.id != n.id) return;

    if (nIsFirmCollide < 0) {
        nIsFirmCollide *= -0.5;
        my.accel.x -= nIsFirmCollide * component * direction_x;
        my.accel.y -= nIsFirmCollide * component * direction_y;
        n.accel.x += nIsFirmCollide * component * direction_x;
        n.accel.y += nIsFirmCollide * component * direction_y;
    } else if (nIsFirmCollide > 0) {
        n.accel.x += nIsFirmCollide * (component * direction_x + combinedDepth_up);
        n.accel.y += nIsFirmCollide * (component * direction_y + combinedDepth_up);
    } else {
        let elasticity = 2 - 4 * Math.atan(my.penetration * n.penetration) / Math.PI;
        if (doInelastic && my.settings.motionEffects && n.settings.motionEffects) {
            elasticity *= savedHealthRatio_me / pen_me_sqrt + savedHealthRatio_n / pen_n_sqrt;
        } else {
            elasticity *= 2;
        }
        let knockback;
        if (my.knockback && n.knockback) {
            knockback = my.knockback * n.knockback;
        } else if (my.knockback) {
            knockback = my.knockback;
        } else if (n.knockback) {
            knockback = n.knockback;
        } else knockback = Config.KNOCKBACK_CONSTANT;
        let spring = 2 * Math.sqrt(savedHealthRatio_me * savedHealthRatio_n) / global.gameManager.runSpeed,
            elasticImpulse = Math.pow(combinedDepth_down, 2) * elasticity * component * my.mass * n.mass / (my.mass + n.mass),
            springImpulse = knockback * spring * combinedDepth_up,
            impulse = -(elasticImpulse + springImpulse) * (1 - my.intangibility) * (1 - n.intangibility),
            force_x = impulse * direction_x,
            force_y = impulse * direction_y,
            modifier_me = knockback * my.pushability / my.mass * deathFactor_n,
            modifier_n = knockback * n.pushability / n.mass * deathFactor_me;
        my.accel.x += modifier_me * force_x;
        my.accel.y += modifier_me * force_y;
        n.accel.x -= modifier_n * force_x;
        n.accel.y -= modifier_n * force_y;
    }
}

function mooncollide(moon, bounce) {
    const dx = bounce.x - moon.x, dy = bounce.y - moon.y;
    const collisionRadius = Math.hypot(dx, dy);
    const properCollisionRadius = moon.size + bounce.size;
    if (collisionRadius >= properCollisionRadius) return;

    const elasticity = bounce.type == 'tank' ? 0 : bounce.type == "bullet" ? 1 : bounce.pushability;
    const angleFromMoonToBounce = Math.atan2(dy, dx);
    bounce.x = moon.x + properCollisionRadius * Math.cos(angleFromMoonToBounce);
    bounce.y = moon.y + properCollisionRadius * Math.sin(angleFromMoonToBounce);

    const velocityDirection = bounce.velocity.direction;
    const angleDiff = angleFromMoonToBounce - velocityDirection;
    const tangentVelocity = bounce.velocity.length * Math.sin(angleDiff);
    const perpendicularVelocity = bounce.velocity.length * Math.cos(angleDiff) * elasticity * -1;
    if (perpendicularVelocity < 0) return;

    const newVelocityMagnitude = Math.hypot(tangentVelocity, perpendicularVelocity);
    const relativeVelocityAngle = Math.atan2(perpendicularVelocity, tangentVelocity);

    bounce.velocity.x = newVelocityMagnitude * Math.sin(Math.PI - relativeVelocityAngle - angleFromMoonToBounce);
    bounce.velocity.y = newVelocityMagnitude * Math.cos(Math.PI - relativeVelocityAngle - angleFromMoonToBounce);
}

function mazewallcollidekill(bounce, wall) {
    if (bounce.type !== 'tank' && bounce.type !== 'miniboss' && bounce.type !== 'food' && bounce.type !== 'crasher') {
        bounce.destroy();
    } else {
        bounce.collisionArray.push(wall);
    }
}

function mazewallcollide(wall, bounce) {
    if (bounce.god === true || bounce.passive === true || bounce.isArenaCloser || bounce.master.isArenaCloser) return;
    if (bounce.store.noWallCollision) return;
    if (bounce.team === wall.team && bounce.type === "tank") return;
    const trueWallSize = wall.size * lazyRealSizes[4] / Math.SQRT2 + 2;
    if (bounce.x + bounce.size < wall.x - trueWallSize ||
        bounce.x - bounce.size > wall.x + trueWallSize ||
        bounce.y + bounce.size < wall.y - trueWallSize ||
        bounce.y - bounce.size > wall.y + trueWallSize) return 0;
    if (wall.intangibility) return 0;

    const collisionFaces = [
        bounce.x < wall.x,
        bounce.y < wall.y,
        bounce.x >= wall.x,
        bounce.y > wall.y,
    ];
    const extendedOverFaces = [
        bounce.x < wall.x - trueWallSize,
        bounce.y < wall.y - trueWallSize,
        bounce.x > wall.x + trueWallSize,
        bounce.y > wall.y + trueWallSize,
    ];
    const wallPushPositions = [
        { x: wall.x - trueWallSize - bounce.size },
        { y: wall.y - trueWallSize - bounce.size },
        { x: wall.x + trueWallSize + bounce.size },
        { y: wall.y + trueWallSize + bounce.size },
    ];
    for (let i = 0; i < 4; i++) {
        if (!collisionFaces[i] | extendedOverFaces[(i + 3) % 4] | extendedOverFaces[(i + 1) % 4]) continue;
        mazewallcollidekill(bounce, wall);
        for (let axis in wallPushPositions[i]) {
            bounce[axis] = wallPushPositions[i][axis];
            bounce.velocity[axis] = 0;
            return true;
        }
    }
    const cornerPositions = [
        { x: wall.x - trueWallSize, y: wall.y - trueWallSize },
        { x: wall.x + trueWallSize, y: wall.y - trueWallSize },
        { x: wall.x + trueWallSize, y: wall.y + trueWallSize },
        { x: wall.x - trueWallSize, y: wall.y + trueWallSize },
    ];
    for (let i = 0; i < 4; i++) {
        if (
            !collisionFaces[i] | !collisionFaces[(i + 1) % 4] |
            !extendedOverFaces[i] | !extendedOverFaces[(i + 1) % 4]
        ) continue;
        const cornerX = cornerPositions[i].x;
        const cornerY = cornerPositions[i].y;
        if (Math.hypot(bounce.x - cornerX, bounce.y - cornerY) > bounce.size) return;
        mazewallcollidekill(bounce, wall);
        const angleFromCornerToBounce = Math.atan2(bounce.y - cornerY, bounce.x - cornerX);
        bounce.x = cornerX + bounce.size * Math.cos(angleFromCornerToBounce);
        bounce.y = cornerY + bounce.size * Math.sin(angleFromCornerToBounce);
        return true;
    }
}

function mazewallcustomcollide(wall, bounce) {
    /* By LA3T */
    if (!bounce || bounce.ac || bounce.passive) return;
    if (!bounce.originalSize) {
        bounce.originalSize = bounce.SIZE;
    }
    if (!bounce.originalFov) {
        bounce.originalFov = bounce.FOV
    }
    const trueWallSize = wall.size * lazyRealSizes[4] / Math.SQRT2 + 2;
    const isColliding = !(
        bounce.x + bounce.size < wall.x - trueWallSize ||
        bounce.x - bounce.size > wall.x + trueWallSize ||
        bounce.y + bounce.size < wall.y - trueWallSize ||
        bounce.y - bounce.size > wall.y + trueWallSize
    );
    if (!isColliding) {
        if (bounce.lastWallType === 5 || bounce.lastWallType === 6 || bounce.lastWallType === 7) {
            bounce.SIZE = bounce.originalSize;
            bounce.FOV = bounce.originalFov;
        }
        bounce.lastWallType = 0;
        return;
    }
    bounce.lastWallType = wall.walltype;
    switch (wall.walltype) {
        case 2:
            if (bounce.health && !bounce.godmode && !bounce.passive && !bounce.isInvulnerable && !bounce.invuln) {
                bounce.health.amount -= bounce.health.max * 0.2;
            }
            break;
        case 3:
            if (bounce.health && !bounce.godmode && !bounce.isInvulnerable && !bounce.invuln && bounce.health.amount === bounce.health.max) {
                bounce.health.amount += bounce.health.max * 0.2;
            }
            break;
        case 4:
            let bounceFactor = 3;
            bounce.velocity.x *= -bounceFactor;
            bounce.velocity.y *= -bounceFactor;
            return;
        case 5:
            if (bounce.SIZE && bounce.SIZE < 25) {
                bounce.SIZE *= 1.1;
            }
            break;
        case 6:
            if (bounce.SIZE && bounce.SIZE > 5) {
                bounce.SIZE *= 0.9;
            }
            break;
        case 7:
            if (bounce.FOV < bounce.originalFov * 3) {
                bounce.FOV *= 3;
            }
            break;
    }
    const collisionFaces = [
        bounce.x < wall.x,
        bounce.y < wall.y,
        bounce.x >= wall.x,
        bounce.y > wall.y,
    ];
    const extendedOverFaces = [
        bounce.x < wall.x - trueWallSize,
        bounce.y < wall.y - trueWallSize,
        bounce.x > wall.x + trueWallSize,
        bounce.y > wall.y + trueWallSize,
    ];
    const wallPushPositions = [
        { x: wall.x - trueWallSize - bounce.size },
        { y: wall.y - trueWallSize - bounce.size },
        { x: wall.x + trueWallSize + bounce.size },
        { y: wall.y + trueWallSize + bounce.size },
    ];
    for (let i = 0; i < 4; i++) {
        if (!collisionFaces[i] | extendedOverFaces[(i + 3) % 4] | extendedOverFaces[(i + 1) % 4]) continue;
        bounce.collisionArray.push(wall);
        for (let axis in wallPushPositions[i]) {
            bounce[axis] = wallPushPositions[i][axis];
            bounce.velocity[axis] = 0;
            return true;
        }
    }
    const cornerPositions = [
        { x: wall.x - trueWallSize, y: wall.y - trueWallSize },
        { x: wall.x + trueWallSize, y: wall.y - trueWallSize },
        { x: wall.x + trueWallSize, y: wall.y + trueWallSize },
        { x: wall.x - trueWallSize, y: wall.y + trueWallSize },
    ];
    for (let i = 0; i < 4; i++) {
        if (!collisionFaces[i] | !collisionFaces[(i + 1) % 4] |
            !extendedOverFaces[i] | !extendedOverFaces[(i + 1) % 4]) continue;
        const cornerX = cornerPositions[i].x;
        const cornerY = cornerPositions[i].y;
        if (Math.hypot(bounce.x - cornerX, bounce.y - cornerY) > bounce.size) continue;
        bounce.collisionArray.push(wall);
        const angleFromCornerToBounce = Math.atan2(bounce.y - cornerY, bounce.x - cornerX);
        bounce.x = cornerX + bounce.size * Math.cos(angleFromCornerToBounce);
        bounce.y = cornerY + bounce.size * Math.sin(angleFromCornerToBounce);
        return true;
    }
}

module.exports = {
    simplecollide,
    firmcollide,
    reflectcollide,
    advancedcollide,
    mooncollide,
    mazewallcollide,
    mazewallcustomcollide
};
