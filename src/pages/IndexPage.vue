<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    /> -->
    <div>
      <q-input filled v-model="plaintext" label="輸入要加密的文字" class="q-mb-md" />

      <q-input filled v-model="key" label="輸入加密金鑰" class="q-mb-md" />

      <q-btn label="AES 加密" @click="handleEncryptAES" class="q-mb-md" />
      <q-btn label="DES 加密" @click="handleEncryptDES" class="q-mb-md" />

      <div>
        <h5>加密結果:</h5>
        <p>{{ encrypted }}</p>
      </div>

      <q-btn label="AES 解密" @click="handleDecryptAES" class="q-mb-md" />
      <q-btn label="DES 解密" @click="handleDecryptDES" class="q-mb-md" />

      <div>
        <h5>解密結果:</h5>
        <p>{{ decrypted }}</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { encryptAES, decryptAES, encryptDES, decryptDES } from 'src/utils/crypto'

// 定義響應式變數
const plaintext = ref('')
const key = ref('')
const encrypted = ref('')
const decrypted = ref('')

// 加密和解密功能
const handleEncryptAES = () => {
  encrypted.value = encryptAES(plaintext.value, key.value)
}

const handleDecryptAES = () => {
  decrypted.value = decryptAES(encrypted.value, key.value)
}

const handleEncryptDES = () => {
  encrypted.value = encryptDES(plaintext.value, key.value)
}

const handleDecryptDES = () => {
  decrypted.value = decryptDES(encrypted.value, key.value)
}
</script>

<style>
/* 根據需求自定義樣式 */
</style>
