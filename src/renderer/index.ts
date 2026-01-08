import { PasswordList } from './components/PasswordList';
import { AddPasswordForm } from './components/AddPasswordForm';
import { PasswordGenerator } from './components/PasswordGenerator';
import { MasterPassword } from './components/MasterPassword';

const masterPassword = new MasterPassword();

function initializeApp() {
    const listContainer = document.getElementById('password-list-container') as HTMLElement;
    const formContainer = document.getElementById('add-password-container') as HTMLElement;
    const generatorContainer = document.getElementById('generator-container') as HTMLElement;
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;

    const passwordList = new PasswordList(listContainer);
    passwordList.render();

    const addPasswordForm = new AddPasswordForm((entry) => {
        passwordList.addPassword(entry);
        // Switch to view tab after adding
        switchTab('view');
    });
    addPasswordForm.render(formContainer);

    const passwordGenerator = new PasswordGenerator();
    passwordGenerator.render(generatorContainer);

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            if (tabName) switchTab(tabName);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = (e.target as HTMLInputElement).value;
            passwordList.search(query);
        });
    }

    // Export functionality
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            passwordList.exportPasswords();
        });
    }

    // Import functionality
    const importBtn = document.getElementById('importBtn');
    if (importBtn) {
        importBtn.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        try {
                            const data = JSON.parse(event.target?.result as string);
                            passwordList.importPasswords(data);
                            switchTab('view');
                        } catch (error) {
                            alert('Invalid file format');
                        }
                    };
                    reader.readAsText(file);
                }
            };
            input.click();
        });
    }

    // Lock functionality
    const lockBtn = document.getElementById('lockBtn');
    if (lockBtn) {
        lockBtn.addEventListener('click', () => {
            masterPassword.logout();
            location.reload();
        });
    }
}

function switchTab(tabName: string) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const selectedContent = document.getElementById(`${tabName}-tab`);
    
    if (selectedBtn) selectedBtn.classList.add('active');
    if (selectedContent) selectedContent.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    masterPassword.showAuthDialog(() => {
        initializeApp();
    });
});
