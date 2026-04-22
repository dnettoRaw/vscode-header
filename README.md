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
//                #####     Untitled-1
//             ############ By: dnettoRaw <contact@dnetto.dev>
//           ###          ###
//          ##    ##  ##    ##  Created: 2026/04/22 13:30:00 by dnettoRaw
//                ##  ##        Updated: 2026/04/22 13:30:00 by dnettoRaw
//
//          ##    ##  ##    ##  obs: "Modern header management"
//           ###  ######  ###
//            #####    ####     License: MIT   https://dnetto.dev
// ////////////////////////////////////////////////////////////////////////////////
```

### Little Header (Compact Version)
```javascript
// ********************************************************************************
//   #######     F: index.ts
// ###     ###   P: my-project
// ##  ###  ##   C: 2026/04/22 13:30:00 by dnettoRaw
//     ###       U: 2026/04/22 13:30:00 by dnettoRaw
// ********************************************************************************
```

---

## 🚀 Usage

### Insert Full Header
- **macOS**: `⌘` + `⌥` + `H`
- **Linux / Windows**: `Ctrl` + `Alt` + `H`

### Insert Little Header
- **macOS**: `⌘` + `⌥` + `J`
- **Linux / Windows**: `Ctrl` + `Alt` + `J`

### Automation
- **Auto-Insert**: Headers are automatically added to new empty files (can be disabled in settings).
- **Auto-Update**: Headers are updated every time you save the file.

---

## ⚙️ Configuration

Customize the extension behavior in your `settings.json`:

| Setting | Type | Description |
| :--- | :--- | :--- |
| `header.username` | `string` | Your name (defaults to Git name) |
| `header.email` | `string` | Your email (defaults to Git email) |
| `header.url` | `string` | Your website or project URL |
| `header.autoInsert` | `boolean` | Enable/Disable auto-insertion on new files |
| `header.logoType` | `enum` | Built-in logos: `default`, `linux`, `vscode`, `max` |
| `header.logo` | `string` | Custom ASCII art (multi-line) |
| `header.template` | `string` | Custom full header structure |
| `header.littleTemplate`| `string` | Custom little header structure |

### Custom Template Variables
You can use these placeholders in your templates:
- `$FILENAME`, `$PROJECT`
- `$AUTHOR`, `$USER`, `$MAIL`
- `$CREATED`, `$UPDATED`
- `$LICENSE`, `$URL`
- `$LOGO0` to `$LOGO10` (for full header)
- `$LLOGO0` to `$LLOGO6` (for little header)

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">Made with ❤️ by <strong>dnettoRaw</strong></p>
