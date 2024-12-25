import CryptoJS from 'crypto-js'

function getConfig(mode) {
  const modes = {
    ECB: CryptoJS.mode.ECB,
    CBC: CryptoJS.mode.CBC,
    CFB: CryptoJS.mode.CFB,
    OFB: CryptoJS.mode.OFB,
  }

  if (!modes[mode]) {
    throw new Error(`Unsupported mode: ${mode}`)
  }

  return {
    mode: modes[mode],
    padding: CryptoJS.pad.Pkcs7, // 默認填充方式
    ...(mode !== 'ECB' && { iv: CryptoJS.enc.Utf8.parse('87654321') }), // 非 ECB 模式需要 IV
  }
}

// DES 加密
export function encryptDES(plaintext, key, mode = 'ECB') {
  console.log('i am mode', mode)
  const cfg = getConfig(mode)
  return CryptoJS.DES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(key), cfg).toString()
}

// AES 加密
export function encryptAES(plaintext, key, mode = 'ECB') {
  const cfg = getConfig(mode)
  return CryptoJS.AES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(key), cfg).toString()
}

// DES 解密
export function decryptDES(ciphertext, key, mode = 'ECB') {
  const cfg = getConfig(mode)
  const bytes = CryptoJS.DES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), cfg)
  return bytes.toString(CryptoJS.enc.Utf8)
}

// AES 解密
export function decryptAES(ciphertext, key, mode = 'ECB') {
  const cfg = getConfig(mode)
  const bytes = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), cfg)
  return bytes.toString(CryptoJS.enc.Utf8)
}
