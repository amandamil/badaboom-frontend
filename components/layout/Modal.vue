<template>
  <div class="modal">
    <div class="modal__body">
      <iframe src="https://form.typeform.com/to/jBRdVd" frameborder="0" />
      <div class="modal__close" @click="$emit('close-modal')">
        <img src="~/assets/images/close.png" alt="close icon" />
      </div>
    </div>
  </div>
</template>
