import { defineComponent, Types } from 'bitecs'

export const Direction = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
    NONE: 0
};

export const Input = defineComponent({
    direction: Types.ui8
})

export default Input;