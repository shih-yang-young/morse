<template>
  <q-page class="flex flex-center" style="margin-top: 50px">
    <div style="width: 400px">
      <q-input filled v-model="key" label="輸入加密金鑰" class="q-mb-md" />
      <q-select filled v-model="mode" :options="options" label="加密模式" class="q-mb-sm" />

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

const mode = ref(null)
const options = ['ECB', 'CBC', 'CFB', 'OFB']

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

        const result = ref('')
        if (!mode.value) {
          result.value = process(content, key.value)
        } else {
          result.value = process(content, key.value, mode.value)
        }
        const writable = await handle.createWritable()
        await writable.write(result.value)
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

<style></style>
