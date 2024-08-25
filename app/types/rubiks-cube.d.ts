// types/rubiks-cube.d.ts
declare module 'rubiks-cube' {
    import {CUBE} from "./src/cube/cubeConstants";
    type Cube = {
        identity: () => CUBE
        random: () => CUBE
    };

    const Cube: Cube;
    export default Cube;
}