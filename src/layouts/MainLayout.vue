<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div style="display: flex; justify-content: center; width: 100%">
          <q-tabs v-model="tab">
            <q-tab name="singleFile" @click="navigateTo('/SingleFile')" label="單一檔案"></q-tab>
            <q-tab name="multiFile" @click="navigateTo('/MultiFile')" label="多個檔案"></q-tab>
            <q-tab name="directoryFile" @click="navigateTo('/DirectoryFile')" label="目錄"></q-tab>
            <q-tab
              name="exhaustiveAttack"
              @click="navigateTo('/ExhaustiveAttack')"
              label="暴力破解"
            ></q-tab>
          </q-tabs>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container style="width: 80%; margin: 0 auto">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const tab = ref('singleFile')
const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style>
button {
  padding: 10px 20px;
  color: white;
  border: none;
  cursor: pointer;
}
.button-group {
  display: flex;
  justify-content: space-between; /* 分散按鈕 */
  gap: 20px; /* 按鈕間距 */
  flex-wrap: wrap; /* 當按鈕寬度超出父容器時換行 */
}
.attack-btn {
  display: flex;
  gap: 20px; /* 按鈕間距 */
  flex-wrap: wrap; /* 當按鈕寬度超出父容器時換行 */
}
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
.result-box li {
  margin-bottom: 5px;
}
.action-button {
  flex: 0.5 1 auto; /* 使按鈕等比例分布 */
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
</style>
