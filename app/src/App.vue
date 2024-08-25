<script setup lang="ts">
import {Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer} from 'three'
import {computed, onMounted, ref, watch} from "vue";
import {useWindowSize} from "@vueuse/core";

const {width, height} = useWindowSize()

const aspectRatio = computed(() => width.value / height.value)

const experience = ref<HTMLCanvasElement|null>(null)
const scene = new Scene()
const camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000)
camera.position.z = 5


scene.add(camera)

const sphere = new Mesh(
  new SphereGeometry(1, 32, 16),
  new MeshBasicMaterial({color: 0xff0000})
)
scene.add(sphere)


let renderer: WebGLRenderer

onMounted(() => {
  renderer = new WebGLRenderer({
    canvas: experience.value as unknown as HTMLCanvasElement,
    antialias: true
  })

  renderer.setSize(width.value, height.value)
  renderer.render(scene, camera)

  loop()
})

watch(aspectRatio, () => {
  renderer.setSize(width.value, height.value)
  renderer.setPixelRatio(window.devicePixelRatio)
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
})

const loop = () => {
  renderer.render(scene, camera)

  sphere.position.y += 0.01
  requestAnimationFrame(loop)
}
</script>

<template>
  <canvas ref="experience"/>
</template>

<style scoped>

</style>
