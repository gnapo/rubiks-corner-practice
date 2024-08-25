import {Material, MeshBasicMaterial, MeshLambertMaterial} from "three";

export type CubeColor = 'w' | 'b' | 'g' | 'r' | 'y' | 'o' | ' '

export const cubeColorNames: Record<CubeColor, string> = {
    'r': 'Red',
    'o': 'Orange',
    'w': 'White',
    'y': 'Yellow',
    'g': 'Green',
    'b': 'Blue',
    ' ': 'Black'
}

export type CUBE = {
    c: number[]
    eo: number[]
    ep: number[]
    co: number[]
    cp: number[]
}

export const centerColors: CubeColor[][] = [
    ['w'],
    ['o'],
    ['g'],
    ['r'],
    ['b'],
    ['y']
]
export const centerPlaces = [
    [' ', ' ', '0', ' ', ' ', ' '],
    [' ', '0', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', '0', ' '],
    ['0', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', '0'],
    [' ', ' ', ' ', '0', ' ', ' ']
]
export const edgeColors: CubeColor[][] = [
    ['w', 'b'],
    ['w', 'r'],
    ['w', 'g'],
    ['w', 'o'],
    ['b', 'o'],
    ['g', 'o'],
    ['g', 'r'],
    ['b', 'r'],
    ['y', 'g'],
    ['y', 'r'],
    ['y', 'b'],
    ['y', 'o']
]
export const edgePlaces = [
    [' ', ' ', '0', ' ', ' ', '1'],
    ['1', ' ', '0', ' ', ' ', ' '],
    [' ', ' ', '0', ' ', '1', ' '],
    [' ', '1', '0', ' ', ' ', ' '],
    [' ', '1', ' ', ' ', ' ', '0'],
    [' ', '1', ' ', ' ', '0', ' '],
    ['1', ' ', ' ', ' ', '0', ' '],
    ['1', ' ', ' ', ' ', ' ', '0'],
    [' ', ' ', ' ', '0', '1', ' '],
    ['1', ' ', ' ', '0', ' ', ' '],
    [' ', ' ', ' ', '0', ' ', '1'],
    [' ', '1', ' ', '0', ' ', ' ']
]

export const cornerColors: CubeColor[][] = [
    ['w', 'b', 'o'],
    ['w', 'r', 'b'],
    ['w', 'g', 'r'],
    ['w', 'o', 'g'],
    ['y', 'g', 'o'],
    ['y', 'r', 'g'],
    ['y', 'b', 'r'],
    ['y', 'o', 'b']
]

export const cornerPlaces = [
    [' ', '2', '0', ' ', ' ', '1'],
    ['1', ' ', '0', ' ', ' ', '2'],
    ['2', ' ', '0', ' ', '1', ' '],
    [' ', '1', '0', ' ', '2', ' '],
    [' ', '2', ' ', '0', '1', ' '],
    ['1', ' ', ' ', '0', '2', ' '],
    ['2', ' ', ' ', '0', ' ', '1'],
    [' ', '1', ' ', '0', ' ', '2']
]

export const threeColor: Record<CubeColor, Material> = {
    'r': new MeshLambertMaterial({color: 0xee0000}), // Red
    'o': new MeshLambertMaterial({color: 0xff6d00}), // orange
    'w': new MeshLambertMaterial({color: 0xffffff}), // white
    'y': new MeshLambertMaterial({color: 0xffff00}), // Yellow
    'g': new MeshLambertMaterial({color: 0x00d800}), // green
    'b': new MeshLambertMaterial({color: 0x0000f2}),  // blue
    ' ': new MeshBasicMaterial({color: 0x000000})  // black
}