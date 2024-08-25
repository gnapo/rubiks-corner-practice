import {
    BoxGeometry,
    EdgesGeometry,
    Group,
    LineBasicMaterial,
    LineSegments,
    Material,
    Mesh,
    MeshLambertMaterial
} from "three";
import {
    centerColors,
    centerPlaces,
    cornerColors,
    cornerPlaces, type CUBE,
    edgeColors,
    edgePlaces,
    threeColor
} from "@/cube/cubeConstants";

const box = new BoxGeometry(1, 1, 1);
type point3D = {
    x: number
    y: number
    z: number
}
const defaultMaterial = [
    new MeshLambertMaterial({color: 0x000000}),
    new MeshLambertMaterial({color: 0x000000}),
    new MeshLambertMaterial({color: 0x000000}),
    new MeshLambertMaterial({color: 0x000000}),
    new MeshLambertMaterial({color: 0x000000}),
    new MeshLambertMaterial({color: 0x000000}),
    new MeshLambertMaterial({color: 0x000000})

]

function getCubeWithWireFrame(pos: point3D) {
    const group = new Group();
    const cube = new Mesh(box, defaultMaterial);
    const edges = new EdgesGeometry(box);
    const lineMaterial = new LineBasicMaterial({color: 0x444444});
    const lines = new LineSegments(edges, lineMaterial);
    group.add(cube);
    group.add(lines);
    group.position.set(pos.x * 1.1, pos.y * 1.1, pos.z * 1.1);
    return group;
}

export function getCube() {
    const cubes = new Group();
    const centerCubelets = [
        getCubeWithWireFrame({x: 0, y: 1, z: 0}),
        getCubeWithWireFrame({x: -1, y: 0, z: 0}),
        getCubeWithWireFrame({x: 0, y: 0, z: 1}),
        getCubeWithWireFrame({x: 1, y: 0, z: 0}),
        getCubeWithWireFrame({x: 0, y: 0, z: -1}),
        getCubeWithWireFrame({x: 0, y: -1, z: 0})
    ]

    const cornerCubelets = [
        getCubeWithWireFrame({x: -1, y: 1, z: -1}),
        getCubeWithWireFrame({x: 1, y: 1, z: -1}),
        getCubeWithWireFrame({x: 1, y: 1, z: 1}),
        getCubeWithWireFrame({x: -1, y: 1, z: 1}),
        getCubeWithWireFrame({x: -1, y: -1, z: 1}),
        getCubeWithWireFrame({x: 1, y: -1, z: 1}),
        getCubeWithWireFrame({x: 1, y: -1, z: -1}),
        getCubeWithWireFrame({x: -1, y: -1, z: -1})
    ]
    const edgeCubelets = [
        getCubeWithWireFrame({x: 0, y: 1, z: -1}),
        getCubeWithWireFrame({x: 1, y: 1, z: 0}),
        getCubeWithWireFrame({x: 0, y: 1, z: 1}),
        getCubeWithWireFrame({x: -1, y: 1, z: 0}),
        getCubeWithWireFrame({x: -1, y: 0, z: -1}),
        getCubeWithWireFrame({x: -1, y: 0, z: 1}),
        getCubeWithWireFrame({x: 1, y: 0, z: 1}),
        getCubeWithWireFrame({x: 1, y: 0, z: -1}),
        getCubeWithWireFrame({x: 0, y: -1, z: 1}),
        getCubeWithWireFrame({x: 1, y: -1, z: 0}),
        getCubeWithWireFrame({x: 0, y: -1, z: -1}),
        getCubeWithWireFrame({x: -1, y: -1, z: 0})
    ]
    centerCubelets.forEach((center) => {
        cubes.add(center);
    })
    cornerCubelets.forEach((corner) => {
        cubes.add(corner);
    })
    edgeCubelets.forEach((edge) => {
        cubes.add(edge);
    })
    function getCenterMaterials(pos: number, i: number) {
        return centerPlaces[pos].map((place) => {
            if (place === ' ') {
                return threeColor[' ']
            }
            return threeColor[centerColors[i][parseInt(place)]]
        })
    }

    function getEdgeMaterials(pos: number, i: number, orientation: number) {
        let materials = edgePlaces[pos].map((place) => {
            if (place === ' ') {
                return threeColor[' ']
            }
            return threeColor[edgeColors[i][getEdgeColorIndex(parseInt(place), orientation)]] as Material
        })
        return materials;
    }
    function getEdgeColorIndex(place: number, orientation: number) {
        // return place
        return (place + orientation) % 2
    }

    function getCornerMaterials(pos: number, i: number, orientation: number) {
        let materials = cornerPlaces[pos].map((place) => {
            if (place === ' ') {
                return threeColor[' ']
            }
            return threeColor[cornerColors[i][getCornerColorIndex(parseInt(place), orientation)]]
        })
        return materials;

    }
    function getCornerColorIndex(place: number, orientation: number) {
        return (place + orientation) % 3
    }

    function applyCube(cube: CUBE) {
        cube.c.forEach((pos, i) => {
            (centerCubelets[i].children[0] as Mesh).material = getCenterMaterials(i, pos)
        })
        cube.ep.forEach((pos, i) => {
            (edgeCubelets[i].children[0] as Mesh).material = getEdgeMaterials(i, pos, cube.eo[i])
        })
        cube.cp.forEach((pos, i) => {
            (cornerCubelets[i].children[0] as Mesh).material = getCornerMaterials(i, pos, cube.co[i])
        })
    }

    function getHiddenColors(cube:CUBE) {
        return {
            'TR': cornerColors[cube.cp[1]][(2+cube.co[1]) % 3],
            'TL': cornerColors[cube.cp[3]][(1+cube.co[3]) % 3],
            'B': cornerColors[cube.cp[5]][(cube.co[5]) % 3]
        }
    }

    return {cubes, applyCube, getHiddenColors}
}