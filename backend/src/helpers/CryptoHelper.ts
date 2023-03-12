import CryptoJS from 'crypto-js';

const encrypt = (value: string) => {
    const key = CryptoJS.enc.Utf8.parse(process.env.AES_256_PUBLIC_KEY!);
    const cipherText = CryptoJS.AES.encrypt(value, key, { iv: key }).toString();
    return cipherText;
}

export default {
    encrypt
}