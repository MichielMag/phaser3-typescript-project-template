import { defineSystem, defineQuery, IWorld } from 'bitecs';
import Input, { Direction } from '../components/player/input.component';
import Velocity from '../components/velocity.component';
import Player from '../components/player/player.component';

const query = defineQuery([Input, Velocity, Player]);
export const createPlayerVelocitySystem = () => {
    return defineSystem((world : IWorld) => {

        const entities = query(world);

        for(const ent of entities)
        {        
            const dir = Input.direction[ent];
            const speed = Player.speed[ent];

            if (dir === Direction.DOWN)
                Velocity.y[ent] = speed;
            if (dir === Direction.UP)
                Velocity.y[ent] = -speed;
            if (dir === Direction.RIGHT)
                Velocity.x[ent] = speed;
            if (dir === Direction.LEFT)
                Velocity.x[ent] = -speed;
            if (dir === Direction.NONE)
            {
                Velocity.x[ent] = 0;
                Velocity.y[ent] = 0;
            }
        }

        return world;
    });
}

export default createPlayerVelocitySystem;