import CryptoJS from 'crypto-js'

// AES 加密
export function encryptAES(plaintext, key) {
  return CryptoJS.AES.encrypt(plaintext, key).toString()
}

// AES 解密
export function decryptAES(ciphertext, key) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}

// DES 加密
export function encryptDES(plaintext, key) {
  return CryptoJS.DES.encrypt(plaintext, key).toString()
}

// DES 解密
export function decryptDES(ciphertext, key) {
  const bytes = CryptoJS.DES.decrypt(ciphertext, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}
