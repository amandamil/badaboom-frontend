<template>
  <div class="modal">
    <div class="modal__body">
      <div class="modal__close" @click="$emit('close-modal')">
        <img src="~/assets/images/close.png" alt="close icon" />
      </div>
      <iframe src="https://form.typeform.com/to/jBRdVd" frameborder="0" />
    </div>
  </div>
</template>
