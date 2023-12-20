<template>
  <div :class="$style['speak-control']">
    <div class="speak-item">按住说话</div>
  </div>
</template>

<script setup lang="ts"></script>

<style module lang="scss">
  .speak-control {
    cursor: pointer;
    flex: 1;
    height: 32px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    :global {
      .speak-item {
        user-select: none;
        height: 100%;
        width: 100%;
        line-height: 32px;
        text-align: center;
        border-radius: 15px;
        transition: all 0.5s ease;
      }
    }
  }
  .speak-control:active {
    :global {
      .speak-item {
        color: var(--primary-1);
        transform: scaleX(0.97);
        box-shadow: 0 0 10px 3px var(--bg-2);
      }
    }
  }
</style>
