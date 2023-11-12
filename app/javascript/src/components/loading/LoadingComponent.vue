<template>
  <div>
    <div
      class="character"
      :class="animationType"
      v-for="(char, index) in textArray"
    >
      {{ char }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    text: string;
    animationType: "fade-in-zoom-out" | "fade-in-zoom-in" | "wavy";
  }>(),
  {
    text: "Text",
    animationType: "wavy",
  },
);

const textArray = computed(() => props.text.split(""));

onMounted(() => {
  document.documentElement.style.setProperty("--content", props.text);
});
</script>

<style scoped lang="scss">
:root {
  --content: "";
}

$length: str-length(var(--content));
$factor: 100ms;
$duration: $length * $factor;

.character {
  padding: 0.5rem;
  display: inline-flex;

  &.fade-in-zoom-out {
    animation: fadeInZoomOut $duration ease-in-out infinite;
  }

  &.fade-in-zoom-in {
    animation: fadeInZoomIn $duration ease-in-out infinite;
  }

  &.wavy {
    animation: wavy $duration ease-in-out infinite;
  }

  animation-direction: alternate-reverse;

  @for $i from 1 through $length {
    &:nth-child(#{$i}) {
      animation-delay: ($i - 1) * $factor;
    }
  }
}

@keyframes fadeInZoomOut {
  0% {
    opacity: 0;
    transform: scale(3);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeInZoomIn {
  0% {
    opacity: 0;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.5);
  }

  100% {
    opacity: 0;
    transform: scale(1);
  }
}

@keyframes wavy {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
