import {ConeGeometry, CylinderGeometry, Group, Mesh, MeshLambertMaterial} from "three";

export type Arrow = 'TR' | 'TL' | 'B'

function createArrow(shaftLength: number, shaftRadius: number, headLength: number, headRadius:number, color: number): Group {
    const group = new Group();

    // Create the shaft
    const shaftGeometry = new CylinderGeometry(shaftRadius, shaftRadius, shaftLength, 32);
    const shaftMaterial = new MeshLambertMaterial({ color: color });
    const shaft = new Mesh(shaftGeometry, shaftMaterial);
    shaft.position.y = shaftLength / 2;
    group.add(shaft);

    // Create the arrowhead
    const headGeometry = new ConeGeometry(headRadius, headLength, 32);
    const headMaterial = new MeshLambertMaterial({ color: color });
    const head = new Mesh(headGeometry, headMaterial);
    head.position.y = shaftLength + headLength / 2;
    group.add(head);

    return group;
}

export function getArrows() {
    const arrowTR = createArrow(0.4, 0.05, 0.2, 0.1, 0xDDFFDD);
    const arrowTL = createArrow(0.4, 0.05, 0.2, 0.1, 0xDDFFDD);
    const arrowB = createArrow(0.45, 0.05, 0.2, 0.1, 0xDDFFDD);
    arrowTR.rotation.set(Math.PI*3/4,0,Math.PI/4-0.2)
    arrowTR.position.set(2,2,-2)
    arrowTL.rotation.set(-Math.PI*3/4,0,-Math.PI/4+0.2)
    arrowTL.position.set(-2,2,2)
    arrowB.rotation.set(5,0,Math.PI/4)
    arrowB.position.set(2,-2,2)
    const arrows = new Group();
    arrows.add(arrowTR);
    arrows.add(arrowTL);
    arrows.add(arrowB);

    function setVisibility(visible:Arrow) {
        switch(visible) {
            case 'TR':
                arrowTR.visible = true;
                arrowTL.visible = false;
                arrowB.visible = false;
                break;
            case 'TL':
                arrowTR.visible = false;
                arrowTL.visible = true;
                arrowB.visible = false;
                break;
            case 'B':
                arrowTR.visible = false;
                arrowTL.visible = false;
                arrowB.visible = true;
                break;
        }
    }

    return {arrows, setVisibility}
}