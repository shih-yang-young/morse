const CryptoJS = require('crypto-js')

// 定義密鑰和消息
const key = CryptoJS.enc.Utf8.parse('12345678') // DES 密鑰必須是 8 字節
const message = 'Hello, CryptoJS!'

// 定義初始化向量 (IV)
const iv = CryptoJS.enc.Utf8.parse('87654321')

// 配置對象
const cfg = {
  mode: CryptoJS.mode.CBC, // 使用 CBC 模式
  padding: CryptoJS.pad.Pkcs7, // 默認的填充方式
  iv: iv, // 指定 IV
}

// 加密
const ciphertext = CryptoJS.DES.encrypt(message, key, cfg)
console.log('Encrypted:', ciphertext.toString())

// 解密
const plaintext = CryptoJS.DES.decrypt(ciphertext, key, cfg)
console.log('Decrypted:', plaintext.toString(CryptoJS.enc.Utf8))
