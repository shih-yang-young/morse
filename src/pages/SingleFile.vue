<template>
  <q-page class="flex flex-center" style="margin-top: 1px">
    <div style="width: 400px">
      <q-input filled v-model="key" label="輸入加密金鑰" class="q-mb-md" />

      <h5>單一檔案加密</h5>
      <div class="button-group">
        <button class="action-button" @click="handleFileOperation('encryptDES', 'DES 加密')">
          DES 加密
        </button>
        <button class="action-button" @click="handleFileOperation('encryptAES', 'AES 加密')">
          AES 加密
        </button>
      </div>
      <h5>單一檔案解密</h5>
      <div class="button-group">
        <button class="action-button" @click="handleFileOperation('decryptDES', 'DES 解密')">
          DES 解密
        </button>
        <button class="action-button" @click="handleFileOperation('decryptAES', 'AES 解密')">
          AES 解密
        </button>
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

const key = ref('')
const encrypted = ref('')

const operations = {
  encryptDES: encryptDES,
  decryptDES: decryptDES,
  encryptAES: encryptAES,
  decryptAES: decryptAES,
}

const handleFileOperation = async (operation, operationName) => {
  if (!key.value) {
    alert('請輸入加密金鑰！')
    return
  }
  try {
    const [handle] = await window.showOpenFilePicker()
    const file = await handle.getFile()
    const content = await file.text()
    console.log('content', content)

    const process = operations[operation]
    if (!process) {
      alert(`無效的操作: ${operationName}`)
      return
    }

    encrypted.value = process(content, key.value)
    console.log('result', encrypted.value)

    const writable = await handle.createWritable()
    await writable.write(encrypted.value)
    await writable.close()
    alert(`檔案已完成${operationName}！`)
  } catch (error) {
    console.error(`${operationName}失敗:`, error)
    alert(`${operationName}失敗！`)
  }
}
</script>

<style>
h5 {
  margin: 5px; /* 調整按鈕上下間距減小 */
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
.action-button {
  flex: 0.5 1 auto; /* 使按鈕等比例分布 */
  text-align: center;
  margin: 30px 0;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
</style>
