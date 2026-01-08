export class MasterPassword {
    private isAuthenticated: boolean = false;
    private masterPasswordHash: string | null = null;

    constructor() {
        this.masterPasswordHash = localStorage.getItem('masterPasswordHash');
    }

    public isSetup(): boolean {
        return this.masterPasswordHash !== null;
    }

    public async setupMasterPassword(password: string): Promise<void> {
        const hash = await this.hashPassword(password);
        localStorage.setItem('masterPasswordHash', hash);
        localStorage.setItem('masterPasswordKey', password); // Store for encryption
        this.masterPasswordHash = hash;
        this.isAuthenticated = true;
    }

    public async authenticate(password: string): Promise<boolean> {
        if (!this.masterPasswordHash) {
            return false;
        }
        
        const hash = await this.hashPassword(password);
        const isValid = hash === this.masterPasswordHash;
        
        if (isValid) {
            this.isAuthenticated = true;
            localStorage.setItem('masterPasswordKey', password);
        }
        
        return isValid;
    }

    public isLoggedIn(): boolean {
        return this.isAuthenticated;
    }

    public logout(): void {
        this.isAuthenticated = false;
        localStorage.removeItem('masterPasswordKey');
    }

    private async hashPassword(password: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    public showAuthDialog(onSuccess: () => void): void {
        const overlay = document.createElement('div');
        overlay.className = 'auth-overlay';
        
        const dialog = document.createElement('div');
        dialog.className = 'auth-dialog';
        
        const title = this.isSetup() ? 'Enter Master Password' : 'Create Master Password';
        const buttonText = this.isSetup() ? 'Unlock' : 'Create';
        
        dialog.innerHTML = `
            <h2>${title}</h2>
            <p>${this.isSetup() ? 'Enter your master password to access your passwords.' : 'Create a master password to secure your passwords.'}</p>
            <input type="password" id="masterPasswordInput" placeholder="Master Password" />
            ${!this.isSetup() ? '<input type="password" id="confirmPasswordInput" placeholder="Confirm Password" />' : ''}
            <div class="auth-buttons">
                <button id="authSubmitBtn">${buttonText}</button>
            </div>
            <div id="authError" class="auth-error"></div>
        `;
        
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        
        const input = document.getElementById('masterPasswordInput') as HTMLInputElement;
        
        // Focus after render to avoid autofocus warning
        setTimeout(() => {
            if (input) input.focus();
        }, 100);
        const confirmInput = document.getElementById('confirmPasswordInput') as HTMLInputElement;
        const submitBtn = document.getElementById('authSubmitBtn') as HTMLButtonElement;
        const errorDiv = document.getElementById('authError') as HTMLDivElement;
        
        const handleSubmit = async () => {
            const password = input.value;
            
            if (!password) {
                errorDiv.textContent = 'Password cannot be empty';
                return;
            }
            
            if (!this.isSetup()) {
                const confirm = confirmInput?.value;
                if (password !== confirm) {
                    errorDiv.textContent = 'Passwords do not match';
                    return;
                }
                if (password.length < 8) {
                    errorDiv.textContent = 'Password must be at least 8 characters';
                    return;
                }
                await this.setupMasterPassword(password);
                overlay.remove();
                onSuccess();
            } else {
                const success = await this.authenticate(password);
                if (success) {
                    overlay.remove();
                    onSuccess();
                } else {
                    errorDiv.textContent = 'Incorrect password';
                    input.value = '';
                    input.focus();
                }
            }
        };
        
        submitBtn.addEventListener('click', handleSubmit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (!this.isSetup() && confirmInput) {
                    confirmInput.focus();
                } else {
                    handleSubmit();
                }
            }
        });
        
        if (confirmInput) {
            confirmInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSubmit();
            });
        }
    }
}
