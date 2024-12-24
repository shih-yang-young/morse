import CryptoJS from 'crypto-js'

export function encryptDESECB(plaintext, key) {
  const cfg = {
    mode: CryptoJS.mode.ECB, // 設定為 ECB 模式
    padding: CryptoJS.pad.Pkcs7, // 默認使用 PKCS7 填充
  }

  return CryptoJS.DES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(key), cfg).toString()
}

export function decryptDESECB(ciphertext, key) {
  const cfg = {
    mode: CryptoJS.mode.ECB, // 設定為 ECB 模式
    padding: CryptoJS.pad.Pkcs7, // 默認使用 PKCS7 填充
  }

  const decrypted = CryptoJS.DES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), cfg)
  return decrypted.toString(CryptoJS.enc.Utf8)
}
