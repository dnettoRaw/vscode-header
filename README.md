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
// //////////////////////////////////////////////////////////////////////////
//          #####              Untitled-1                                    
//       ############          By: dnettoRaw <contact@dnetto.dev>            
//     ###          ###     
//    ##    ##  ##    ##       Created: 2026/04/22 13:30:00 by dnettoRaw   
//          ##  ##             Updated: 2026/04/22 13:30:00 by dnettoRaw   
//                          
//    ##    ##  ##    ##       obs: Modern header management                 
//     ###  ######  ###                                                      
//      #####    ####                                                        
//                     
//                           License: MIT                 https://dnetto.dev
// //////////////////////////////////////////////////////////////////////////
```

### Little Header (Compact Version)
```javascript
// //////////////////////////////////////////////////////////////////////////
//      #######        F: index.ts                                           
//   ###       ###     P: my-project                                         
//  ##   ## ##   ##    C: 2026/04/22 13:30:00 by: dnettoRaw                  
//       ## ##         U: 2026/04/22 13:30:00 by: dnettoRaw                  
//                  
//  ##   ## ##   ## 
//    ###########   
// //////////////////////////////////////////////////////////////////////////
```

---

## 🛠️ How to Customize

### 1. Built-in Logos
You can quickly switch between built-in logos in your settings:
- `header.logoType`: `default`, `linux`, `vscode`, `max`, `none` (no ASCII art).

### 2. Custom ASCII Art
Paste your own ASCII art into `header.logo`.
> **Note**: For best results with the default template, use a logo around 30x11 characters.

### 3. Custom Templates
You can redefine the entire header structure using `header.template`.
**Example:**
```json
"header.template": "/* $FILENAME\n * Created by: $CREATED\n */"
```

### 4. Available Variables
| Variable | Description |
| :--- | :--- |
| `$FILENAME` | Name of the current file |
| `$PROJECT` | Project name from `package.json` |
| `$AUTHOR` | Full name and email (`Name <email>`) |
| `$CREATED` | Name of the creator (alias for `$CREATEDBY`) |
| `$UPDATED` | Name of the last updater (alias for `$UPDATEDBY`) |
| `$CREATEDAT`| Date of creation (`YYYY/MM/DD HH:mm:ss`) |
| `$UPDATEDAT`| Date of last update (`YYYY/MM/DD HH:mm:ss`) |
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
