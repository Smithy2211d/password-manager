# Password Manager

A secure, desktop password manager built with Electron and TypeScript. Store and manage your passwords safely with strong encryption.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Electron](https://img.shields.io/badge/Electron-28.0.0-47848F?logo=electron)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-3178C6?logo=typescript)

---

## Features

- Master password protection
- AES encryption with PBKDF2 key derivation
- Password generator (cryptographically secure)
- Password strength indicator
- Search, export, and import passwords
- Tabbed interface for Generator, Add, and View
- Show/hide and copy to clipboard
- 100% local storage (no external servers)

## Security

- Master password authentication (SHA-256)
- AES-256 encryption for all stored passwords
- PBKDF2 key derivation (1000 iterations)
- Cryptographically secure random number generation
- Lock feature to secure app without closing

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
```bash
git clone https://github.com/yourusername/password-manager.git
cd password-manager
npm install
npm start
```

## Building

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
```

### Create Executable
```bash
npm run dist:win    # Windows
npm run dist        # All platforms
```
The executable will be in the `release` folder.

## Usage

### First Time Setup
1. Launch the application
2. Create a strong master password (min. 8 characters)
3. **Remember this password** – it cannot be recovered!

### Managing Passwords
- Generator Tab: Create secure random passwords
- Add Password Tab: Save new passwords with website/username
- View Passwords Tab: Search, view, copy, and delete stored passwords

### Backup & Restore
- Export: Save all passwords to a JSON file
- Import: Restore from a backup file

## Project Structure

```
password-manager/
├── src/
│   ├── main.ts                    # Electron main process
│   ├── preload.ts                 # Preload script
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   ├── utils/
│   │   ├── encryption.ts          # AES encryption logic
│   │   └── passwordGenerator.ts   # Password generation
│   └── renderer/
│       ├── index.html             # Main HTML
│       ├── index.ts               # Renderer entry point
│       ├── components/
│       │   ├── MasterPassword.ts  # Authentication
│       │   ├── PasswordList.ts    # Password display
│       │   ├── AddPasswordForm.ts # Add password form
│       │   └── PasswordGenerator.ts # Generator component
│       └── styles/
│           └── main.css           # Application styles
├── dist/                          # Compiled JavaScript
├── release/                       # Built executables
├── package.json
├── tsconfig.json
└── README.md
```

## Configuration

Edit `src/utils/encryption.ts` to adjust:
- PBKDF2 iterations (default: 1000)
- Salt value

Edit `src/utils/passwordGenerator.ts` to modify:
- Default password length
- Character sets
- Strength calculation

## Security Notes

- Store your master password securely – it cannot be recovered if lost
- Data location (Windows): `%AppData%\password-manager\`
- Export backups regularly to prevent data loss
- For portability, copy the entire app folder to USB

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License – see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- Encryption via [CryptoJS](https://cryptojs.gitbook.io/)
- TypeScript for type safety

## Support

If you encounter issues:
1. Check [QUICKSTART.md](QUICKSTART.md) for troubleshooting
2. Open an issue on GitHub
3. Review [BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md) for build help

---

**Disclaimer:** This is a personal password manager. While it uses strong encryption, use at your own risk. For enterprise use, consider professional solutions.
