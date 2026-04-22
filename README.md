<h1 align="center">
  <img src="https://raw.githubusercontent.com/dnettoRaw/vscode-header/master/img/logo.png" width="200">
  <br>VS Code Header
</h1>

<p align="center">
  <strong>Modern, premium, and fully customizable file headers for Visual Studio Code.</strong>
</p>

---

## ✨ Features

- **Modern Design**: Premium "open-ended" header style for modern languages (`//`).
- **Dynamic ASCII Art**: Built-in logos (Linux, VS Code) and support for custom ASCII art.
- **Smart Fields**: Automatic detection of filename, project name (from `package.json`), Git user, and timestamps.
- **Auto-Injection**: Automatically inserts headers into new files (configurable).
- **On-Save Updates**: Keeps your "Updated" timestamp and user perfectly in sync.
- **Fully Customizable**: Define your own templates and logo layouts.

---

## 🎨 Header Examples

### Standard Header (New Open-Ended Style)
```javascript
// ////////////////////////////////////////////////////////////////////////////////
//  #####                     Untitled-1
//  ############              By: dnettoRaw <contact@dnetto.dev>
//  ###          ###
//  ##    ##  ##    ##        Created: 2026/04/22 13:30:00 by dnettoRaw
//        ##  ##              Updated: 2026/04/22 13:30:00 by dnettoRaw
//
//  ##    ##  ##    ##        obs: "Modern header management"
//  ###  ######  ###
//  #####    ####             License: MIT   https://dnetto.dev
// ////////////////////////////////////////////////////////////////////////////////
```

### Little Header (Compact Version)
```javascript
// ********************************************************************************
//  #####                     F: index.ts
//  ############              P: my-project
//  ###          ###          C: 2026/04/22 13:30:00 by dnettoRaw
//  ##    ##  ##    ##        U: 2026/04/22 13:30:00 by dnettoRaw
//        ##  ##
//
//  ##    ##  ##    ##
// ********************************************************************************
```

---

## 🛠️ How to Customize

### 1. Change the Logo
You can choose a built-in logo or provide your own:
- Go to `Settings` > Search for `header.logoType`.
- Options: `default`, `linux`, `vscode`, `max`.
- To use your own art, paste it into `header.logo` (use `\n` for new lines).

### 2. Create a Custom Template
If you want to change the whole layout, use `header.template`:
```json
"header.template": "/* $FILENAME\n * Autor: $USER\n * Criado em: $CREATED\n */"
```

### 3. Available Variables
| Variable | Description |
| :--- | :--- |
| `$FILENAME` | Name of the current file |
| `$PROJECT` | Project name from `package.json` |
| `$AUTHOR` | Full name and email |
| `$USER` | Just the username |
| `$MAIL` | Just the email address |
| `$CREATED` | Date of creation |
| `$UPDATED` | Date of last update |
| `$LICENSE` | Current license type |
| `$URL` | Project or personal URL |
| `$LOGO0`..`$LOGO10` | Lines of the full logo |
| `$LLOGO0`..`$LLOGO6` | Lines of the little logo |

---

## 🚀 Usage

### Commands
- **Insert Full Header**: `⌘` + `⌥` + `H` (macOS) or `Ctrl` + `Alt` + `H` (Windows/Linux)
- **Insert Little Header**: `⌘` + `⌥` + `J` (macOS) or `Ctrl` + `Alt` + `J` (Windows/Linux)

---

## 📜 License
Distributed under the **MIT License**. See `LICENSE` for more information.

<p align="center">Made with ❤️ by <strong>dnettoRaw</strong></p>
