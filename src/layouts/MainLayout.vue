<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Morse Code Hacker Only </q-toolbar-title>

        <div>A__A</div>
      </q-toolbar>
    </q-header>

    <q-page-container style="width: 80%; margin: 0 auto">
      <div class="button-group">
        <button class="nav-button" @click="navigateTo('/SingleFile')">單一檔案</button>
        <button class="nav-button" @click="navigateTo('/MultiFile')">多個檔案</button>
        <button class="nav-button" @click="navigateTo('/DirectoryFile')">目錄</button>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'

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
.nav-button {
  flex: 0.5 1 auto; /* 使按鈕等比例分布 */
  text-align: center;
  margin: 30px 0 0;
  padding: 10px 20px;
  background-color: #0e4a85;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
.nav-button:hover {
  background-color: #2166ab;
}
</style>
