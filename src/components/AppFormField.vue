<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { Ref, ref } from 'vue';

defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [Number, String, Boolean],
    default: '',
  },
})

const thisInput: Ref<HTMLElement | null> = ref(null);

const focus = () => {
  if (thisInput.value) {
    thisInput.value.querySelector('input')?.focus();

  }
};

defineExpose({
  focus,
});

</script>

<template>
  <div ref="thisInput">
    <label :for="name">{{ label }}:</label>
    <VeeErrorMessage :name="name" class="input-error" />
    <VeeField class="field" v-if="$attrs.as !== 'select'" :name="name" :label="label" :modelValue="modelValue"
      @input="$emit('modelUpdate', $event)" :id="name" v-bind="$attrs" />
    <VeeField class="field" v-if="$attrs.as === 'select'" :name="name" :label="label" :modelValue="modelValue"
      @input="$emit('modelUpdate', $event)" :id="name" v-bind="$attrs">
      <slot></slot>
    </VeeField>
  </div>
</template>

<style scoped>
.input-error {
  float: right;
  margin-right: 3px;
  text-align: right;
  color: var(--redColor);
}

.input-error+.field {
  border-color: var(--redColor);
}
</style>