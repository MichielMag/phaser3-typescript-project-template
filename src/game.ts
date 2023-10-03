import * as Phaser from 'phaser';

import {
    IWorld,
    createWorld,
    addEntity,
    addComponent,
    removeComponent,
    defineQuery,
    System
} from 'bitecs'

import Position from './ecs/components/position.component';
import Velocity from './ecs/components/velocity.component';
import Sprite from './ecs/components/sprite.component';
import { SpriteStore } from './sprite.store';
import createSpriteSystem from './ecs/systems/sprite.system';
import createMovementSystem from './ecs/systems/movement.system';
import { createInputSystem } from './ecs/systems/input.system';
import { createPlayerVelocitySystem } from './ecs/systems/velocity.system';
import Input from './ecs/components/player/input.component';
import Player from './ecs/components/player/player.component';

const Constants = {
    WIDTH: 800,
    HEIGHT: 600
}

export default class Demo extends Phaser.Scene
{
    private world : IWorld;
    private entities : number[] = [];
    private player : number;

    private cursors : Phaser.Types.Input.Keyboard.CursorKeys;

    private spriteSystem : System;
    private movementSystem : System;
    private inputSystem : System;
    private playerVelocitySystem : System;

    constructor ()
    {
        super('demo');
    }

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
    }
    preload ()
    {
        SpriteStore.load(this, 'paddle', 'assets/paddle.png');
    }

    create ()
    {
        this.world = createWorld();
        this.player = addEntity(this.world);
        addComponent(this.world, Position, this.player);
        addComponent(this.world, Velocity, this.player);
        addComponent(this.world, Sprite, this.player);
        addComponent(this.world, Input, this.player);
        addComponent(this.world, Player, this.player);

        Position.x[this.player] = 100;
        Position.y[this.player] = Constants.HEIGHT - 40;
        Player.speed[this.player] = 5;

        Sprite.texture[this.player] = SpriteStore.getTextureIdByKey('paddle');

        this.spriteSystem = createSpriteSystem(this);
        this.movementSystem = createMovementSystem(this);
        this.inputSystem = createInputSystem(this.cursors);
        this.playerVelocitySystem = createPlayerVelocitySystem();

        const w = this.world;
        const p = this.player;

    }

    update(time: number, delta: number): void {
        if (!this.world || 
            !this.spriteSystem || 
            !this.movementSystem ||
            !this.playerVelocitySystem ||
            !this.inputSystem) 
            return;
        
        this.inputSystem(this.world);
        this.playerVelocitySystem(this.world);
        this.movementSystem(this.world);
        this.spriteSystem(this.world);
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: Constants.WIDTH,
    height: Constants.HEIGHT,
    scene: Demo
};

const game = new Phaser.Game(config);
