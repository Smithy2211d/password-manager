import { PasswordEntry } from '../../types';
import { decrypt } from '../../utils/encryption';

export class PasswordList {
    private container: HTMLElement;
    private passwords: PasswordEntry[];
    private filteredPasswords: PasswordEntry[];

    constructor(container: HTMLElement) {
        this.container = container;
        this.passwords = this.loadPasswords();
        this.filteredPasswords = this.passwords;
    }

    private loadPasswords(): PasswordEntry[] {
        const stored = localStorage.getItem('passwords');
        return stored ? JSON.parse(stored) : [];
    }

    private savePasswords(): void {
        localStorage.setItem('passwords', JSON.stringify(this.passwords));
    }

    public addPassword(entry: PasswordEntry): void {
        this.passwords.push(entry);
        this.savePasswords();
        this.filteredPasswords = this.passwords;
        this.render();
    }

    public deletePassword(id: string): void {
        this.passwords = this.passwords.filter(p => p.id !== id);
        this.savePasswords();
        this.filteredPasswords = this.passwords;
        this.render();
    }

    public search(query: string): void {
        const lowerQuery = query.toLowerCase();
        this.filteredPasswords = this.passwords.filter(p => 
            p.website.toLowerCase().includes(lowerQuery) ||
            p.username.toLowerCase().includes(lowerQuery)
        );
        this.render();
    }

    public exportPasswords(): void {
        const dataStr = JSON.stringify(this.passwords, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `passwords-export-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    public importPasswords(data: PasswordEntry[]): void {
        if (!Array.isArray(data)) {
            alert('Invalid data format');
            return;
        }
        
        const confirmed = confirm(`This will import ${data.length} passwords. Continue?`);
        if (confirmed) {
            this.passwords = [...this.passwords, ...data];
            this.savePasswords();
            this.filteredPasswords = this.passwords;
            this.render();
            alert('Passwords imported successfully!');
        }
    }

    public render(): void {
        this.container.innerHTML = '<h2>Stored Passwords</h2>';
        
        if (this.filteredPasswords.length === 0) {
            this.container.innerHTML += '<p>No passwords stored yet.</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.className = 'password-list';

        this.filteredPasswords.forEach(entry => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${entry.website}</strong><br>
                Username: ${entry.username}<br>
                Password: <span class="password-hidden">••••••••</span>
                <button class="show-btn" data-id="${entry.id}">Show</button>
                <button class="copy-btn" data-id="${entry.id}">Copy</button>
                <button class="delete-btn" data-id="${entry.id}">Delete</button>
            `;
            
            const showBtn = li.querySelector('.show-btn') as HTMLButtonElement;
            const copyBtn = li.querySelector('.copy-btn') as HTMLButtonElement;
            const deleteBtn = li.querySelector('.delete-btn') as HTMLButtonElement;
            const passwordSpan = li.querySelector('.password-hidden') as HTMLSpanElement;

            showBtn.addEventListener('click', () => {
                try {
                    const decrypted = decrypt(entry.password);
                    if (passwordSpan.textContent === '••••••••') {
                        passwordSpan.textContent = decrypted;
                        showBtn.textContent = 'Hide';
                    } else {
                        passwordSpan.textContent = '••••••••';
                        showBtn.textContent = 'Show';
                    }
                } catch (error) {
                    alert('Error decrypting password. Please check your master password.');
                }
            });

            copyBtn.addEventListener('click', () => {
                try {
                    navigator.clipboard.writeText(decrypt(entry.password));
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => copyBtn.textContent = 'Copy', 2000);
                } catch (error) {
                    alert('Error copying password.');
                }
            });

            deleteBtn.addEventListener('click', () => {
                if (confirm(`Delete password for ${entry.website}?`)) {
                    this.deletePassword(entry.id);
                }
            });

            ul.appendChild(li);
        });

        this.container.appendChild(ul);
    }
}
