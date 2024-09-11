<script setup lang="ts">
import {AmbientLight, Color, PerspectiveCamera, Scene, WebGLRenderer} from 'three'
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {useWindowSize} from "@vueuse/core";
import {getCube} from "@/cube/cubeObjects";
import * as RUBIKSCUBE from 'rubiks-cube';
import {type Arrow, getArrows} from "@/cube/arrows";
import {type CubeColor, cubeColorNames} from "@/cube/cubeConstants";

const Cube = RUBIKSCUBE.default;

const {width, height} = useWindowSize()

const aspectRatio = computed(() => width.value / (height.value * 0.8))

const canvas = ref<HTMLCanvasElement | null>(null)
const scene = new Scene()
const camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000)
camera.position.z = 6


scene.add(camera)

const {cubes, applyCube, getHiddenColors} = getCube()

let cubeState = Cube.identity()
console.log(getHiddenColors(cubeState))
applyCube(cubeState)

scene.add(cubes)
const {arrows, setVisibility} = getArrows()
setVisibility('B')
scene.add(arrows)

function setRotation(time: number) {
  [arrows, cubes].forEach((group) => {
    group.rotation.x = 0.67 + Math.sin(time)*0.05
    group.rotation.y = -0.83 + Math.cos(time)*0.05
  })
}



//lighting
const ambientLight = new AmbientLight(0xffffff, 3.5); // White light with intensity of 0.5
scene.add(ambientLight);
scene.background = new Color(0x222341)

let renderer: WebGLRenderer

onMounted(() => {
  renderer = new WebGLRenderer({
    canvas: canvas.value as unknown as HTMLCanvasElement,
    antialias: true
  })

  renderer.setSize(width.value, height.value*0.8)
  renderer.render(scene, camera)

  loop()

  window.addEventListener("keydown", handleKeyDown)
})
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
})
watch(aspectRatio, () => {
  renderer.setSize(width.value, height.value*0.8)
  renderer.setPixelRatio(window.devicePixelRatio)
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
})

let time = 0
const loop = () => {
  renderer.render(scene, camera)
  time += 0.001
  setRotation(time)
  requestAnimationFrame(loop)
}


// game logic
const displayText = ref("determine the color of the indicated hidden face")
const correctGuess = ref(false)
const incorrectGuess = ref(false)
const arrowDirection = ref<Arrow>(getRandomArrowDirection())
setVisibility(arrowDirection.value)
function getRandomArrowDirection() {
  const val = Math.floor(Math.random() * 3)
  return (['TR', 'TL', 'B'] as Arrow[])[val]
}

function restartAnimation(className: string) {
  const element = document.querySelector('.display-text') as HTMLElement;
  if (element) {
    element.classList.remove(className);
    void element.offsetWidth; // Trigger reflow
    element.classList.add(className);
  }
}
function guess(color: CubeColor) {
  const hiddenColors = getHiddenColors(cubeState)
  if (hiddenColors[arrowDirection.value] === color) {
    displayText.value = "Correct!"
    correctGuess.value = true
    incorrectGuess.value = false
    restartAnimation('correct')
  } else {
    displayText.value = "Incorrect! It was " + cubeColorNames[hiddenColors[arrowDirection.value]]
    incorrectGuess.value = true
    correctGuess.value = false
    restartAnimation('incorrect')
  }
  arrowDirection.value = getRandomArrowDirection()
  setVisibility(arrowDirection.value)
  cubeState = Cube.random()
  applyCube(cubeState)
}

function handleKeyDown(event: KeyboardEvent) {
  if ([ 'w', 'g', 'r', 'b', 'o', 'y'].includes(event.key)) {
    guess(event.key as CubeColor)
  }
}
</script>

<template>
  <canvas ref="canvas" class="cube-image"/>
  <div class="button-row">
    <button class="white-button" @click="guess('w')">[W]hite</button>
    <button class="green-button" @click="guess('g')">[G]reen</button>
    <button class="red-button" @click="guess('r')">[R]ed</button>
    <button class="blue-button" @click="guess('b')">[B]lue</button>
    <button class="orange-button" @click="guess('o')">[O]range</button>
    <button class="yellow-button" @click="guess('y')">[Y]ellow</button>
  </div>
  <div class="display-text" :class="{correct: correctGuess, incorrect: incorrectGuess}">
    {{displayText}}
  </div>
</template>

<style scoped>

.cube-image {
  width: 100%;
  height: 80vh;
  display: block;
}

.button-row {
  height: 8vh;
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    height: 50px;
    padding: 20px;
    font-size: 1.5rem;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      border: 2px solid whitesmoke;
    }
  }

  .white-button {
    background-color: white;
    color: black;
    &:hover {
      border: 2px solid darkgray;
    }
  }
  .green-button {
    background-color: green;
    color: white;
  }
  .red-button {
    background-color: red;
    color: white;
  }
  .blue-button {
    background-color: blue;
    color: white;
  }
  .orange-button {
    background-color: #ff7300;
    color: white;
  }
  .yellow-button {
    background-color: yellow;
    color: black;
  }
}

@keyframes flashGreenToWhite {
  0% {
    color: lightgreen;
  }
  100% {
    color: white;
  }
}

@keyframes flashRedToWhite {
  0% {
    color: red;
  }
  100% {
    color: white;
  }
}

.display-text {
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: white;
  &.correct {
    animation: flashGreenToWhite 2s;
  }
  &.incorrect {
    animation: flashRedToWhite 2s;
  }
}
</style>
