import { PasswordEntry } from '../../types';
import { encrypt } from '../../utils/encryption';
import { calculatePasswordStrength } from '../../utils/passwordGenerator';

export class AddPasswordForm {
    private form: HTMLFormElement;
    private onAdd: (entry: PasswordEntry) => void;

    constructor(onAdd: (entry: PasswordEntry) => void) {
        this.onAdd = onAdd;
        this.form = this.createForm();
    }

    private createForm(): HTMLFormElement {
        const form = document.createElement('form');
        form.className = 'add-password-form';
        form.innerHTML = `
            <h2>Add New Password</h2>
            <input type="text" id="website" placeholder="Website/Service" required />
            <input type="text" id="username" placeholder="Username/Email" required />
            <input type="password" id="password" placeholder="Password" required />
            <div id="strengthIndicator" class="strength-indicator"></div>
            <button type="submit">Add Password</button>
        `;

        form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        const passwordInput = form.querySelector('#password') as HTMLInputElement;
        const strengthIndicator = form.querySelector('#strengthIndicator') as HTMLDivElement;
        
        passwordInput.addEventListener('input', () => {
            if (passwordInput.value) {
                const { text, color } = calculatePasswordStrength(passwordInput.value);
                strengthIndicator.innerHTML = `Strength: <span style="color: ${color}; font-weight: bold;">${text}</span>`;
            } else {
                strengthIndicator.innerHTML = '';
            }
        });
        
        return form;
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();
        
        const website = (document.getElementById('website') as HTMLInputElement).value;
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        try {
            const entry: PasswordEntry = {
                id: Date.now().toString(),
                website,
                username,
                password: encrypt(password),
                createdAt: new Date()
            };

            this.onAdd(entry);
            this.form.reset();
            
            const strengthIndicator = document.getElementById('strengthIndicator') as HTMLDivElement;
            if (strengthIndicator) {
                strengthIndicator.innerHTML = '';
            }
        } catch (error) {
            alert('Error saving password. Please try again.');
        }
    }

    public render(container: HTMLElement): void {
        container.appendChild(this.form);
    }
}
