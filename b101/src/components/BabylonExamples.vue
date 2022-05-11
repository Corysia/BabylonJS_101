<template>
  <div>
    <h3>Babylon Examples</h3>
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { StandardMaterials } from "@/BabylonExamples/StandardMaterials";
import { PBR } from "@/BabylonExamples/PBR";

export default defineComponent({
  name: 'BabylonExamples',
  mounted() {
    const canvas = document.querySelector("canvas")!;
    // new StandardMaterials(canvas);
    new PBR(canvas);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

canvas {
  width: 70%;
  height: 70%;
}
</style>
