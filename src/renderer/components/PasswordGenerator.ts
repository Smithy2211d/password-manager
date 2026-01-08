import { generatePassword as utilGeneratePassword } from '../../utils/passwordGenerator';

export class PasswordGenerator {
    private container: HTMLElement;

    constructor() {
        this.container = this.createContainer();
    }

    private createContainer(): HTMLElement {
        const div = document.createElement('div');
        div.className = 'password-generator';
        div.innerHTML = `
            <h2>Password Generator</h2>
            <input type="number" id="length" min="8" max="64" value="16" />
            <label for="length">Password Length</label><br>
            <label><input type="checkbox" id="includeUppercase" checked> Include Uppercase</label><br>
            <label><input type="checkbox" id="includeNumbers" checked> Include Numbers</label><br>
            <label><input type="checkbox" id="includeSymbols" checked> Include Symbols</label><br>
            <button id="generateBtn">Generate Password</button>
            <div id="generatedPassword" style="margin-top: 10px; font-family: monospace; font-size: 18px;"></div>
        `;

        const generateBtn = div.querySelector('#generateBtn') as HTMLButtonElement;
        generateBtn.addEventListener('click', () => this.generate());

        return div;
    }

    private generate(): void {
        const length = parseInt((document.getElementById('length') as HTMLInputElement).value);
        const includeUppercase = (document.getElementById('includeUppercase') as HTMLInputElement).checked;
        const includeNumbers = (document.getElementById('includeNumbers') as HTMLInputElement).checked;
        const includeSymbols = (document.getElementById('includeSymbols') as HTMLInputElement).checked;

        const password = utilGeneratePassword(length, includeUppercase, includeNumbers, includeSymbols);
        const displayDiv = document.getElementById('generatedPassword') as HTMLDivElement;
        displayDiv.innerHTML = `
            <strong>${password}</strong>
            <button id="copyGeneratedBtn" style="margin-left: 10px;">Copy</button>
        `;

        const copyBtn = document.getElementById('copyGeneratedBtn') as HTMLButtonElement;
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(password);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => copyBtn.textContent = 'Copy', 2000);
        });
    }

    public render(container: HTMLElement): void {
        container.appendChild(this.container);
    }
}
