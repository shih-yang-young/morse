<template>
  <q-page class="flex flex-center" style="margin-top: 1px">
    <div style="width: 400px">
      <q-input filled v-model="key" label="輸入加密金鑰" class="q-mb-md" />

      <h5>目錄檔案加密</h5>
      <div class="button-group">
        <button class="action-button" @click="handleDirectoryOperation('encryptDES', 'DES 加密')">
          DES 加密
        </button>
        <button class="action-button" @click="handleDirectoryOperation('encryptAES', 'AES 加密')">
          AES 加密
        </button>
      </div>
      <h5>目錄檔案解密</h5>
      <div class="button-group">
        <button class="action-button" @click="handleDirectoryOperation('decryptDES', 'DES 解密')">
          DES 解密
        </button>
        <button class="action-button" @click="handleDirectoryOperation('decryptAES', 'AES 解密')">
          AES 解密
        </button>
      </div>

      <div class="result-section">
        <h5>處理結果：</h5>
        <ul class="result-box">
          <li v-for="(result, index) in processedFiles" :key="index">{{ result }}</li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { encryptAES, decryptAES, encryptDES, decryptDES } from 'src/utils/crypto'

const key = ref('')
const processedFiles = ref([])

const operations = {
  encryptDES: encryptDES,
  decryptDES: decryptDES,
  encryptAES: encryptAES,
  decryptAES: decryptAES,
}

const handleDirectoryOperation = async (operation, operationName) => {
  if (!key.value) {
    alert('請輸入加密金鑰！')
    return
  }

  try {
    const directoryHandle = await window.showDirectoryPicker()
    processedFiles.value = []

    for await (const [name, handle] of directoryHandle.entries()) {
      if (handle.kind === 'file') {
        const file = await handle.getFile()
        const content = await file.text()
        console.log(`Processing file: ${name}, content: ${content}`)

        const process = operations[operation]
        if (!process) {
          alert(`無效的操作: ${operationName}`)
          return
        }

        const result = process(content, key.value)
        const writable = await handle.createWritable()
        await writable.write(result)
        await writable.close()

        processedFiles.value.push(`${name} 已完成${operationName}`)
      }
    }

    alert(`目錄中所有檔案已完成${operationName}！`)
  } catch (error) {
    console.error(`${operationName}失敗:`, error)
    alert(`${operationName}失敗！`)
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
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  word-wrap: break-word;
  overflow: auto;
  height: 300px;
  list-style-type: none;
}
.result-box li {
  margin-bottom: 5px;
}
</style>
