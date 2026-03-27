<<<<<<< HEAD
# 🔐 Password Manager
=======
# Password Manager
>>>>>>> ae81cb2 (Initial commit: working password manager, cleaned docs, fixed build)

A secure, desktop password manager application built with Electron and TypeScript. Store and manage your passwords safely with military-grade encryption.

![Password Manager](https://img.shields.io/badge/version-1.0.0-blue)
![Electron](https://img.shields.io/badge/Electron-28.0.0-47848F?logo=electron)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-3178C6?logo=typescript)

<<<<<<< HEAD
## ✨ Features

- 🔒 **Master Password Protection** - Secure all passwords with one master password
- 🔐 **Strong Encryption** - AES encryption with PBKDF2 key derivation
- 🎲 **Password Generator** - Create cryptographically secure random passwords
- 📊 **Strength Indicator** - Real-time password strength analysis
- 🔍 **Search Functionality** - Quickly find stored passwords
- 📤 **Export/Import** - Backup and restore your password vault
- 🎨 **Tabbed Interface** - Clean separation between Generator, Add, and View
- 🔓 **Show/Hide Passwords** - Toggle visibility with one click
- 📋 **Copy to Clipboard** - Quick password copying
- 💾 **Local Storage** - All data stays on your computer

## 🛡️ Security Features

- ✅ Master password authentication with SHA-256 hashing
- ✅ AES-256 encryption for all stored passwords
- ✅ PBKDF2 key derivation (1000 iterations)
- ✅ Cryptographically secure random number generation
- ✅ No external servers - 100% local storage
- ✅ Lock feature to secure app without closing

## 🚀 Quick Start
=======
## Features

- **Master Password Protection** - Secure all passwords with one master password
- **Strong Encryption** - AES encryption with PBKDF2 key derivation
- **Password Generator** - Create cryptographically secure random passwords
- **Strength Indicator** - Real-time password strength analysis
- **Search Functionality** - Quickly find stored passwords
- **Export/Import** - Backup and restore your password vault
- **Tabbed Interface** - Clean separation between Generator, Add, and View
- **Show/Hide Passwords** - Toggle visibility with one click
- **Copy to Clipboard** - Quick password copying
- **Local Storage** - All data stays on your computer

## Security Features

- Master password authentication with SHA-256 hashing
- AES-256 encryption for all stored passwords
- PBKDF2 key derivation (1000 iterations)
- Cryptographically secure random number generation
- No external servers - 100% local storage
- Lock feature to secure app without closing

## Quick Start
>>>>>>> ae81cb2 (Initial commit: working password manager, cleaned docs, fixed build)

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/password-manager.git
cd password-manager
```

2. Install dependencies:
```bash
npm install
```

3. Run the application:
```bash
npm start
```

<<<<<<< HEAD
## 📦 Building
=======
## Building
>>>>>>> ae81cb2 (Initial commit: working password manager, cleaned docs, fixed build)

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Create Executable
```bash
npm run dist:win    # Windows
npm run dist        # All platforms
```

The executable will be in the `release` folder.

<<<<<<< HEAD
## 🎯 Usage
=======
## Usage
>>>>>>> ae81cb2 (Initial commit: working password manager, cleaned docs, fixed build)

### First Time Setup
1. Launch the application
2. Create a strong master password (min. 8 characters)
3. **Remember this password** - it cannot be recovered!

### Managing Passwords
- **Generator Tab**: Create secure random passwords
- **Add Password Tab**: Save new passwords with website/username
- **View Passwords Tab**: Search, view, copy, and delete stored passwords

### Backup & Restore
- Click **Export** to save all passwords to a JSON file
- Click **Import** to restore from a backup file
- Regular backups recommended!

<<<<<<< HEAD
## 📁 Project Structure
=======
## Project Structure
>>>>>>> ae81cb2 (Initial commit: working password manager, cleaned docs, fixed build)

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

<<<<<<< HEAD
## 🔧 Configuration
=======
## Configuration
>>>>>>> ae81cb2 (Initial commit: working password manager, cleaned docs, fixed build)

Edit `src/utils/encryption.ts` to adjust:
- PBKDF2 iterations (default: 1000)
- Salt value

Edit `src/utils/passwordGenerator.ts` to modify:
- Default password length
- Character sets
- Strength calculation

<<<<<<< HEAD
## ⚠️ Security Notes
=======
## Security Notes
>>>>>>> ae81cb2 (Initial commit: working password manager, cleaned docs, fixed build)

- **Master Password**: Store securely - cannot be recovered if lost
- **Data Location**: Windows: `%AppData%\password-manager\`
- **Backups**: Export regularly to prevent data loss
- **Portability**: Copy entire app folder to USB for portable use

<<<<<<< HEAD
## 🤝 Contributing
=======
## Contributing
>>>>>>> ae81cb2 (Initial commit: working password manager, cleaned docs, fixed build)

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<<<<<<< HEAD
## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Thomas Smith**

## 🙏 Acknowledgments
=======
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Thomas Smith**

## Acknowledgments
>>>>>>> ae81cb2 (Initial commit: working password manager, cleaned docs, fixed build)

- Built with [Electron](https://www.electronjs.org/)
- Encryption via [CryptoJS](https://cryptojs.gitbook.io/)
- TypeScript for type safety

<<<<<<< HEAD
## 📞 Support
=======
## Support
>>>>>>> ae81cb2 (Initial commit: working password manager, cleaned docs, fixed build)

If you encounter issues:
1. Check [QUICKSTART.md](QUICKSTART.md) for troubleshooting
2. Open an issue on GitHub
3. Review [BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md) for build help

---

<<<<<<< HEAD
**⚠️ Disclaimer**: This is a personal password manager. While it uses strong encryption, use at your own risk. For enterprise use, consider professional solutions.
=======
**Disclaimer**: This is a personal password manager. While it uses strong encryption, use at your own risk. For enterprise use, consider professional solutions.
>>>>>>> ae81cb2 (Initial commit: working password manager, cleaned docs, fixed build)
