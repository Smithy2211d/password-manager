export function generatePassword(
    length: number = 16,
    includeUppercase: boolean = true,
    includeNumbers: boolean = true,
    includeSymbols: boolean = true
): string {
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    
    if (includeUppercase) {
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (includeNumbers) {
        charset += '0123456789';
    }
    if (includeSymbols) {
        charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }
    
    let password = '';
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);
    
    for (let i = 0; i < length; i++) {
        const randomIndex = randomValues[i] % charset.length;
        password += charset[randomIndex];
    }
    
    return password;
}

export function calculatePasswordStrength(password: string): { strength: number; text: string; color: string } {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    
    if (strength <= 2) {
        return { strength, text: 'Weak', color: '#dc3545' };
    } else if (strength <= 4) {
        return { strength, text: 'Medium', color: '#ffc107' };
    } else {
        return { strength, text: 'Strong', color: '#28a745' };
    }
}
