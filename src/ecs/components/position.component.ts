import { defineComponent, Types } from 'bitecs'

export const Position = defineComponent({
	x: Types.f32,
	y: Types.f32,
    w: Types.f32,
    h: Types.f32
})

export default Position;