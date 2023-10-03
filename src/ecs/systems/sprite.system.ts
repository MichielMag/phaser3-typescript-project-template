import { defineSystem, defineQuery, IWorld, enterQuery, exitQuery } from 'bitecs';
import Sprite from '../components/sprite.component';
import { SpriteStore } from '../../sprite.store';
import Position from '../components/position.component';

const spriteQuery = defineQuery([Sprite, Position]);
const spriteQueryEnter = enterQuery(spriteQuery);
const spriteQueryExit = exitQuery(spriteQuery);
export const createSpriteSystem = (scene : Phaser.Scene) => {
    return defineSystem((world : IWorld) => {
        const enterEntities = spriteQueryEnter(world);
        for(const ent of enterEntities)
        {
            const textureId = Sprite.texture[ent];
            SpriteStore.add(scene, textureId, ent);
        }

        const entities = spriteQuery(world);
        for(const ent of entities)
        {
            const sprite = SpriteStore.getSpriteByEntityId(ent);

            if (!sprite) continue;

            sprite.x = Position.x[ent];
            sprite.y = Position.y[ent];
        }

        const exitEntities = spriteQueryExit(world);
        for(const ent of exitEntities)
        {
            const sprite = SpriteStore.getSpriteByEntityId(ent);

            if (!sprite) continue;

            sprite.destroy();
            SpriteStore.destroy(ent);
        }

        return world;
    });
}

export default createSpriteSystem;