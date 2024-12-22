<template>
  <q-page class="flex flex-center">
    <input type="file" webkitdirectory @change="handleFileChange" />
  </q-page>
</template>

<script setup>
// 響應式變數

// 處理文件夾上傳
const handleFileChange = (event) => {
  const files = event.target.files

  console.log(files)
}
</script>
