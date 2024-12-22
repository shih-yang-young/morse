<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    /> -->
    <div>
      <q-input filled v-model="key" label="輸入加密金鑰" class="q-mb-md" />
      <button id="modify-btn" @click="handleEncryptDES">Encrypt DES</button>
      <button id="modify-btn" @click="handleEncryptAES">Encrypt AES</button>
      <br />
      <button id="modify-btn" @click="handleDecryptDES">Decrypt DES</button>
      <button id="modify-btn" @click="handleDecryptAES">Decrypt AES</button>

      <div>
        <h5>檔案目前內容:</h5>
        <p>{{ encrypted }}</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { encryptAES, decryptAES, encryptDES, decryptDES } from 'src/utils/crypto'

// 定義響應式變數
const key = ref('')
const encrypted = ref('')

const handleEncryptDES = async () => {
  if (!key.value) {
    alert('請輸入加密金鑰！')
    return
  }
  try {
    // 請求用戶選擇檔案
    const [handle] = await window.showOpenFilePicker()
    const file = await handle.getFile()
    const content = await file.text()
    console.log('content', content)
    encrypted.value = encryptDES(content, key.value)

    // 修改檔案內容
    const modifiedContent = encrypted.value
    console.log('modifiedContent', modifiedContent)
    // 保存修改後的檔案
    const writable = await handle.createWritable()
    await writable.write(modifiedContent)
    await writable.close()
    alert('檔案已修改！')
  } catch (error) {
    console.error('檔案修改失敗:', error)
    alert('檔案修改失敗！')
  }
}

const handleDecryptDES = async () => {
  if (!key.value) {
    alert('請輸入加密金鑰！')
    return
  }
  try {
    // 請求用戶選擇檔案
    const [handle] = await window.showOpenFilePicker()
    const file = await handle.getFile()
    const content = await file.text()
    console.log('content', content)
    encrypted.value = decryptDES(content, key.value)

    // 修改檔案內容
    console.log('encrypted.value: ', encrypted.value)
    if (!encrypted.value) {
      alert('解密失敗！')
      return
    }
    // 保存修改後的檔案
    const writable = await handle.createWritable()
    await writable.write(encrypted.value)
    await writable.close()
    alert('檔案已修改！')
  } catch (error) {
    console.error('檔案修改失敗:', error)
    alert('檔案修改失敗！')
  }
}

const handleEncryptAES = async () => {
  if (!key.value) {
    alert('請輸入加密金鑰！')
    return
  }
  try {
    // 請求用戶選擇檔案
    const [handle] = await window.showOpenFilePicker()
    const file = await handle.getFile()
    const content = await file.text()
    console.log('content', content)
    encrypted.value = encryptAES(content, key.value)

    // 修改檔案內容
    const modifiedContent = encrypted.value
    console.log('modifiedContent', modifiedContent)
    // 保存修改後的檔案
    const writable = await handle.createWritable()
    await writable.write(modifiedContent)
    await writable.close()
    alert('檔案已修改！')
  } catch (error) {
    console.error('檔案修改失敗:', error)
    alert('檔案修改失敗！')
  }
}

const handleDecryptAES = async () => {
  if (!key.value) {
    alert('請輸入加密金鑰！')
    return
  }
  try {
    // 請求用戶選擇檔案
    const [handle] = await window.showOpenFilePicker()
    const file = await handle.getFile()
    const content = await file.text()
    console.log('content', content)
    encrypted.value = decryptAES(content, key.value)

    // 修改檔案內容
    console.log('encrypted.value: ', encrypted.value)
    if (!encrypted.value) {
      alert('解密失敗！')
      return
    }
    // 保存修改後的檔案
    const writable = await handle.createWritable()
    await writable.write(encrypted.value)
    await writable.close()
    alert('檔案已修改！')
  } catch (error) {
    console.error('檔案修改失敗:', error)
    alert('檔案修改失敗！')
  }
}
</script>

<style>
button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #358a6e;
}
</style>
