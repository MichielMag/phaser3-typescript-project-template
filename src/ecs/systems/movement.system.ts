import { defineSystem, defineQuery, IWorld } from 'bitecs';
import Position from '../components/position.component';
import Velocity from '../components/velocity.component';

const query = defineQuery([Velocity, Position]);
export const createMovementSystem = (scene : Phaser.Scene) => {
    return defineSystem((world : IWorld) => {

        const entities = query(world);
        for(const ent of entities)
        {
            Position.x[ent] += Velocity.x[ent];
            Position.y[ent] += Velocity.y[ent];
        }

        return world;
    });
}

export default createMovementSystem;