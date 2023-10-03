const spriteStore = {};
const numberStore = {};
const keyStore = {};

let counter = 0;
export let SpriteStore = {
    load: (scene : Phaser.Scene, key : string, path : string) => {
        let currentCounter = counter;
        counter++;
        scene.load.image(key, path);
        numberStore[key] = currentCounter;
        keyStore[currentCounter] = key;
        return currentCounter;
    },
    add: (scene, textureId, entity) => {
        spriteStore[entity] = scene.add.sprite(0, 0, keyStore[textureId])
    },
    destroy: (entityId) => { if (spriteStore[entityId]) delete spriteStore[entityId] },
    getSpriteByEntityId: (id) => spriteStore[id],
    getSpriteByKey: (key) => spriteStore[numberStore[key]],
    getTextureIdByKey: (key) => numberStore[key],
    getKeyByTextureId: (textureId) => keyStore[textureId]
}