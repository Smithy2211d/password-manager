import * as CryptoJS from 'crypto-js';

function getSecretKey(): string {
    const key = localStorage.getItem('masterPasswordKey');
    if (!key) {
        throw new Error('Master password not set');
    }
    // Derive a stronger key using PBKDF2
    return CryptoJS.PBKDF2(key, 'password-manager-salt', {
        keySize: 256 / 32,
        iterations: 1000
    }).toString();
}

export function encrypt(text: string): string {
    try {
        const secretKey = getSecretKey();
        return CryptoJS.AES.encrypt(text, secretKey).toString();
    } catch (error) {
        console.error('Encryption error:', error);
        throw error;
    }
}

export function decrypt(encryptedText: string): string {
    try {
        const secretKey = getSecretKey();
        const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            throw new Error('Decryption failed');
        }
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        throw error;
    }
}
