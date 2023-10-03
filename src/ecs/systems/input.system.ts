import { defineSystem, defineQuery, IWorld } from 'bitecs';
import Input, { Direction } from '../components/player/input.component';

const query = defineQuery([Input]);
export const createInputSystem = (cursors: Phaser.Types.Input.Keyboard.CursorKeys) => {
    return defineSystem((world : IWorld) => {

        const entities = query(world);

        for(const ent of entities)
        {        
            if (cursors.down.isDown)
            {
                Input.direction[ent] = Direction.DOWN;
            }
            else if (cursors.up.isDown)
            {
                Input.direction[ent] = Direction.UP;
            }
            else if (cursors.left.isDown)
            {
                Input.direction[ent] = Direction.LEFT;
            }
            else if (cursors.right.isDown)
            {
                Input.direction[ent] = Direction.RIGHT
            }
            else
            {
                Input.direction[ent] = Direction.NONE;
            }
        }

        return world;
    });
}

export default createInputSystem;