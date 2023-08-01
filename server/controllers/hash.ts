import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'
const iv = crypto.randomBytes(16)

const key = crypto.createHash('sha512').update(secretKey).digest('hex').substring(0, 32)
const encryptionIV = crypto.createHash('sha512').update(iv).digest('hex').substring(0, 16)

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, encryptionIV)
  return Buffer.from(cipher.update(text, 'utf8', 'hex') + cipher.final('hex')).toString('base64')
}

export const decrypt = (encryptedData: string) => {
  const buff = Buffer.from(encryptedData, 'base64')
  const decipher = crypto.createDecipheriv(algorithm, key, encryptionIV)
  return decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8')
}
