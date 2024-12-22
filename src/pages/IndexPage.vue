<template>
  <q-page class="flex flex-center" style="margin-top: 50px">
    <div style="width: 400px">
      <q-input filled v-model="key" label="輸入加密金鑰" class="q-mb-md" />

      <h5>加密</h5>
      <div class="button-group">
        <button class="action-button" @click="handleEncryptDES">加密 DES</button>
        <button class="action-button" @click="handleEncryptAES">加密 AES</button>
      </div>
      <h5>解密</h5>
      <div class="button-group">
        <button class="action-button" @click="handleDecryptDES">解密 DES</button>
        <button class="action-button" @click="handleDecryptAES">解密 AES</button>
      </div>

      <div class="result-section">
        <h5>檔案目前內容：</h5>
        <p class="result-box">{{ encrypted }}</p>
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

h5 {
  margin: 5px; /* 調整按鈕上下間距減小 */
}

.button-group {
  display: flex;
  justify-content: space-between; /* 分散按鈕 */
  gap: 20px; /* 按鈕間距 */
  flex-wrap: wrap; /* 當按鈕寬度超出父容器時換行 */
}

.action-button {
  flex: 1 1 auto; /* 使按鈕等比例分布 */
  text-align: center;
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #358a6e;
}
.result-box {
  background-color: #f0f0f0;
  height: 300px;
  padding: 10px;
  border-radius: 5px;
  word-wrap: break-word;
  overflow: auto;
}
</style>
