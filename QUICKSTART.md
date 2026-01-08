# Password Manager - Quick Start Guide

## 🚀 Getting Started

### First Time Setup
1. Open a terminal in the project directory
2. Run: `npm start`
3. The app will launch and prompt you to create a **Master Password**
4. Choose a strong master password (minimum 8 characters) - **REMEMBER THIS!**
5. Your master password encrypts all stored passwords

### Running the App
```bash
npm start
```

## 🔐 Features

### 1. Master Password Authentication
- **First Launch**: Create a master password to secure your vault
- **Subsequent Launches**: Enter your master password to unlock
- **Lock Button**: Click "Lock" to lock the app without closing it

### 2. Password Generator
- Set desired password length (8-64 characters)
- Toggle options: Uppercase, Numbers, Symbols
- Click "Generate Password" to create a secure random password
- Copy generated password with one click

### 3. Add New Password
- Enter website/service name
- Enter username/email
- Enter password (or use generated one)
- See real-time password strength indicator
- Click "Add Password" to save (encrypted automatically)

### 4. Manage Passwords
- **Search**: Use the search bar to filter by website or username
- **Show/Hide**: Click "Show" to reveal a password, "Hide" to conceal it
- **Copy**: Click "Copy" to copy password to clipboard
- **Delete**: Click "Delete" to remove a password entry

### 5. Export/Import
- **Export**: Save all passwords to a JSON file (encrypted)
- **Import**: Load passwords from a previously exported file

## 🔒 Security Features

✅ **Master Password Protection**: All passwords encrypted with your master password
✅ **Strong Encryption**: AES encryption with PBKDF2 key derivation
✅ **Cryptographically Secure Random**: Uses crypto.getRandomValues() for password generation
✅ **Secure Electron Configuration**: Context isolation and no node integration in renderer
✅ **Local Storage Only**: All data stays on your computer

## ⚠️ Important Notes

- **Remember Your Master Password**: There is NO password recovery option
- **Backup Your Data**: Use Export to create backups regularly
- **Local Storage**: All data is stored locally in the app's localStorage
- **First Password**: When you first enter your master password, it will be set as THE master password

## 📝 Development Commands

```bash
npm start       # Build and run the app
npm run build   # Compile TypeScript
npm run dev     # Build and run with dev tools
```

## 🆘 Troubleshooting

**Problem**: "Master password not set" error
- **Solution**: The app needs to be unlocked first. Reload and enter your master password.

**Problem**: Can't decrypt existing passwords after changing master password
- **Solution**: Export your passwords before changing master password, or the old passwords won't be accessible.

**Problem**: App won't start
- **Solution**: Run `npm install` to ensure all dependencies are installed, then `npm start`

## 🎯 Best Practices

1. **Choose a Strong Master Password**: Use 12+ characters with mixed case, numbers, and symbols
2. **Regular Backups**: Export your passwords monthly to a secure location
3. **Use Generated Passwords**: Let the app create strong, unique passwords for each site
4. **Keep Master Password Safe**: Write it down and store in a secure physical location
5. **Don't Share Master Password**: Never share or email your master password

---

Enjoy your secure password manager! 🔐
