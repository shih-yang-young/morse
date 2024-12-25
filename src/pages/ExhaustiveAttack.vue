<template>
  <q-page class="flex flex-center" style="margin-top: 20px">
    <div style="width: 600px">
      <q-input filled v-model="key" label="輸入加密金鑰" class="q-mb-sm" />
      <q-select filled v-model="mode" :options="options" label="加密模式" class="q-mb-sm" />
      <h5>單一檔案加密</h5>
      <div class="button-group">
        <button class="action-button" @click="handleFileOperation('encryptDES', 'DES 加密')">
          DES 加密
        </button>
        <button class="action-button" @click="handleFileOperation('encryptAES', 'AES 加密')">
          AES 加密
        </button>
      </div>
      <h5>暴力破解</h5>
      <div class="button-group">
        <q-btn label="開始暴力破解" @click="bruteForceDecrypt" class="q-mb-md" color="secondary" />
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
import { encryptAES, encryptDES } from 'src/utils/crypto'

const key = ref('')
const encrypted = ref('')

const mode = ref(null)
const options = ['ECB', 'CBC', 'CFB', 'OFB']

const operations = {
  encryptDES: encryptDES,
  encryptAES: encryptAES,
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
    if (!mode.value) {
      encrypted.value = process(content, key.value)
    } else {
      encrypted.value = process(content, key.value, mode.value)
    }
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

<style></style>
