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
        <button class="action-button" @click="() => bruteForceDecrypt('DES')">DES 暴力破解</button>
        <button class="action-button" @click="() => bruteForceDecrypt('AES')">AES 暴力破解</button>
      </div>

      <div class="result-section">
        <h5>檔案目前內容：</h5>
        <p class="result-box">{{ encrypted }}</p>
      </div>
      <div class="result-section">
        <h5>暴力破解過程：</h5>
        <textarea class="result-box" readonly v-model="log"></textarea>
        <p>破解結果：{{ decrypted }}</p>
        <p>花費時間：{{ timeTaken }} 秒</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { encryptAES, encryptDES, decryptDES, decryptAES } from 'src/utils/crypto'

const key = ref('')
const encrypted = ref('')
const decrypted = ref('')
const log = ref('')
const timeTaken = ref(0)
const answer = ref('')
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
    answer.value = content
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

const bruteForceDecrypt = async (algorithm) => {
  if (!encrypted.value) {
    alert('請先加密檔案後再進行破解！')
    return
  }

  const startTime = performance.now()
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const maxKeyLength = 8

  log.value = `開始${algorithm}暴力破解...\n`
  decrypted.value = ''

  outerLoop: for (let length = 1; length <= maxKeyLength; length++) {
    const maxKeyCount = Math.pow(chars.length, length)

    for (let i = 0; i < maxKeyCount; i++) {
      const key = generateKey(i, chars, length)
      try {
        const result =
          algorithm === 'DES'
            ? decryptDES(encrypted.value, key, mode.value || 'ECB')
            : decryptAES(encrypted.value, key, mode.value || 'ECB')

        if (isAnswer(result)) {
          decrypted.value = result
          log.value += `找到密鑰：z${key}\n`
          break outerLoop
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // 忽略解密失敗
      }

      if (i % 1000 === 0) {
        log.value += `嘗試密鑰數：${i}/${maxKeyCount}，長度：${length}\n`
      }
    }
  }

  const endTime = performance.now()
  timeTaken.value = ((endTime - startTime) / 1000).toFixed(2)
  log.value += `${algorithm}暴力破解完成。\n`
}

const generateKey = (index, chars, length) => {
  let key = ''
  while (index > 0) {
    key = chars[index % chars.length] + key
    index = Math.floor(index / chars.length)
  }
  return key.padStart(length, chars[0])
}

const isAnswer = (text) => {
  return text === answer.value
}
</script>

<style>
.result-box {
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  overflow: auto;
  font-family: monospace;
}
</style>
