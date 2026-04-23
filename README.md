<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=dnettoRaw.dr-header">
    <img src="https://img.shields.io/visual-studio-marketplace/v/dnettoRaw.dr-header?style=for-the-badge&color=blue" alt="VS Code Marketplace">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=dnettoRaw.dr-header">
    <img src="https://img.shields.io/visual-studio-marketplace/d/dnettoRaw.dr-header?style=for-the-badge&color=green" alt="Downloads">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=dnettoRaw.dr-header">
    <img src="https://img.shields.io/visual-studio-marketplace/r/dnettoRaw.dr-header?style=for-the-badge&color=yellow" alt="Rating">
  </a>
  <br>
  <a href="https://github.com/dnettoRaw/vscode-header/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/dnettoRaw/vscode-header/ci.yml?style=for-the-badge" alt="CI">
  </a>
  <a href="https://github.com/dnettoRaw/vscode-header/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/dnettoRaw/vscode-header?style=for-the-badge" alt="License">
  </a>
</p>

<h1 align="center">
  <img src="https://raw.githubusercontent.com/dnettoRaw/vscode-header/master/img/logo.png" width="200">
  <br>VS Code Header
</h1>

<p align="center">
  <strong>Modern, premium, and fully customizable file headers for Visual Studio Code.</strong>
</p>

<p align="center">
  <a href="#-installation">Installation</a> •
  <a href="#-features">Features</a> •
  <a href="#-header-examples">Examples</a> •
  <a href="#️-configuration">Configuration</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-troubleshooting">Troubleshooting</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 📦 Installation

### Via VS Code Marketplace
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "dnettoRaw Header"
4. Click **Install**

### Via Command Line
```bash
code --install-extension dnettoRaw.dr-header
```

### Manual Installation
1. Download the `.vsix` file from [GitHub Releases](https://github.com/dnettoRaw/vscode-header/releases)
2. In VS Code: `Extensions` → `...` → `Install from VSIX`
3. Select the downloaded file

---

## ✨ Features

- **🎨 Modern Design**: Premium "open-ended" header style for modern languages (`//`)
- **🔄 Dynamic ASCII Art**: Built-in logos (Linux, VS Code, Default) and custom ASCII art support
- **🧠 Smart Fields**: Automatic detection of filename, project name, version, Git user, and timestamps
- **⚡ Surgical Updates**: Updates only necessary lines on save, preserving your ASCII art
- **📁 File-based Configuration**: Override settings with local files (`author`, `projectname`, `version`, `logo`)
- **🤖 Auto-Injection**: Automatically inserts headers into new files (configurable)
- **🎯 Fully Customizable**: Define your own templates, logos, and layouts
- **🌍 Multi-Language Support**: 40+ supported languages with proper comment syntax
- **🔧 Flexible Delimiters**: Custom delimiters for unsupported languages

---

## 🎨 Header Examples

### Standard Header (Full Version)
```javascript
////////////////////////////////////////////////////////////////////////////////
//            #####              filename: main.rs
//         ############          Project : my-awesome-app
//       ###          ###
//      ##    ##  ##    ##       Created: 2026/04/23 02:00:00 by dnettoRaw
//            ##  ##             Updated: 2026/04/23 02:30:00 by dnettoRaw
//                               Since  : 1.0.0
//
//      ##    ##  ##    ##       obs: Premium header management
//       ###  ######  ###
//        #####    ####
//
//                             License: MIT                 https://dnetto.dev
////////////////////////////////////////////////////////////////////////////////
```

### Little Header (Compact Version)
```javascript
////////////////////////////////////////////////////////////////////////////////
//        #######
//     ###       ###     F: index.ts
//    ##   ## ##   ##    P: my-project
//         ## ##
//                       C: 2026/04/23 02:00:00 by dnettoRaw
//    ##   ## ##   ##    U: 2026/04/23 02:30:00 by dnettoRaw
//      ###########      S: 1.0.0
////////////////////////////////////////////////////////////////////////////////
```

### Logo-Only Header
```python
#       #####
#    ############
#   ###          ###
#  ##    ##  ##    ##
#        ##  ##
#
#  ##    ##  ##    ##
#   ###  ######  ###
#    #####    ####
```

### Different Languages

#### Python
```python
# /////////////////////////////////////////////////////////////////////////////
#            #####              filename: app.py
#         ############          Project : django-app
#       ###          ###
#      ##    ##  ##    ##       Created: 2026/04/23 02:00:00 by dnettoRaw
#            ##  ##             Updated: 2026/04/23 02:30:00 by dnettoRaw
#                               Since  : 1.0.0
#
#      ##    ##  ##    ##       obs: Django REST API
#       ###  ######  ###
#        #####    ####
#
#                             License: MIT                 https://dnetto.dev
# /////////////////////////////////////////////////////////////////////////////
```

#### Java
```java
////////////////////////////////////////////////////////////////////////////////
//            #####              filename: Main.java
//         ############          Project : spring-boot-app
//       ###          ###
//      ##    ##  ##    ##       Created: 2026/04/23 02:00:00 by dnettoRaw
//            ##  ##             Updated: 2026/04/23 02:30:00 by dnettoRaw
//                               Since  : 1.0.0
//
//      ##    ##  ##    ##       obs: Spring Boot Application
//       ###  ######  ###
//        #####    ####
//
//                             License: MIT                 https://dnetto.dev
////////////////////////////////////////////////////////////////////////////////
```

#### HTML
```html
<!-- ///////////////////////////////////////////////////////////////////////////// -->
<!--            #####              filename: index.html                           -->
<!--         ############          Project : react-app                            -->
<!--       ###          ###                                                       -->
<!--      ##    ##  ##    ##       Created: 2026/04/23 02:00:00 by dnettoRaw     -->
<!--            ##  ##             Updated: 2026/04/23 02:30:00 by dnettoRaw     -->
<!--                               Since  : 1.0.0                                 -->
<!--                                                                             -->
<!--      ##    ##  ##    ##       obs: React Single Page Application            -->
<!--       ###  ######  ###                                                       -->
<!--        #####    ####                                                         -->
<!--                                                                             -->
<!--                             License: MIT                 https://dnetto.dev -->
<!-- ///////////////////////////////////////////////////////////////////////////// -->
```

---

## ⚙️ Configuration

### Global Settings (VS Code Settings)

#### Basic Configuration
```json
{
  "header.username": "Your Name",
  "header.email": "your.email@example.com",
  "header.url": "https://your-website.com",
  "header.license": "MIT"
}
```

#### Logo Configuration
```json
{
  "header.logoType": "default",
  "header.logo": "   CUSTOM ASCII ART\n  YOUR BRAND HERE\n     LOGO TEXT"
}
```

#### Advanced Configuration
```json
{
  "header.autoInsert": true,
  "header.customDelimiters": {
    "customlang": ["/* ", " */"]
  },
  "header.template": "/* $FILENAME - $PROJECT\n * Created: $CREATEDAT by $CREATED\n */",
  "header.littleTemplate": "// $FILENAME - $CREATEDAT"
}
```

### File-based Configuration (Workspace Root)

Create these files in your project root for automatic detection:

#### `author` (plain text)
```
John Doe
```

#### `projectname` (plain text)
```
My Awesome Project
```

#### `version` (plain text)
```
2.1.0
```

#### `license` (plain text)
```
MIT
```

#### `logo` (ASCII art, max 30 cols × 11 lines)
```
   _____
  /     \
 |  LOGO |
  \_____/
     |
    / \
```

### Custom Templates

#### Minimal Template
```json
{
  "header.template": "/* $FILENAME - $CREATEDAT by $CREATED */"
}
```

#### Corporate Template
```json
{
  "header.template": "/*\n * Copyright (c) 2024 Company Name\n * $FILENAME\n * Created: $CREATEDAT by $CREATED\n * Updated: $UPDATEDAT by $UPDATED\n */"
}
```

#### Academic Template
```json
{
  "header.template": "/*\n * $PROJECT v$VERSION\n * $FILENAME\n * Author: $AUTHOR\n * Created: $CREATEDAT\n * License: $LICENSE\n */"
}
```

### Available Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `$FILENAME` | Current file name | `main.ts` |
| `$PROJECT` | Project name | `my-app` |
| `$VERSION` | Current version | `1.2.3` |
| `$SINCE` | Creation version | `1.0.0` |
| `$AUTHOR` | Full author (Name <email>) | `John Doe <john@example.com>` |
| `$CREATED` | Creator name | `John Doe` |
| `$UPDATED` | Last updater name | `Jane Smith` |
| `$CREATEDAT` | Creation date | `2026/04/23 14:30:00` |
| `$UPDATEDAT` | Last update date | `2026/04/23 15:45:00` |
| `$LICENSE` | License type | `MIT` |
| `$URL` | Project URL | `https://github.com/user/repo` |
| `$OBS1-3` | Observation fields | Custom notes |
| `$LOGO0-10` | Full logo lines | ASCII art lines |
| `$LLOGO0-6` | Little logo lines | Compact ASCII art |

---

## 🚀 Usage

### Keyboard Shortcuts
- **Insert Full Header**: `Ctrl+Alt+H` (Windows/Linux) or `Cmd+Option+H` (macOS)
- **Insert Little Header**: `Ctrl+Alt+J` (Windows/Linux) or `Cmd+Option+J` (macOS)
- **Insert Logo Only**: `Ctrl+Alt+L` (Windows/Linux) or `Cmd+Option+L` (macOS)

### Command Palette
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
2. Type "header" to see available commands:
   - `Header: Insert header`
   - `Header: Insert little header`
   - `Header: Insert only logo header`
   - `Header: Update all headers`

### Auto-Update on Save
The extension automatically updates headers when you save files:
- Updates the `Updated:` timestamp
- Updates the filename (if changed)
- Preserves creation info and ASCII art

### Batch Update
To update all headers in your workspace:
1. Open Command Palette (`Ctrl+Shift+P`)
2. Run `Header: Update all headers`

---

## 🌍 Supported Languages

The extension supports 40+ languages with proper comment syntax:

### Programming Languages
- **Web**: JavaScript, TypeScript, CoffeeScript, HTML, CSS, SCSS, Vue, Svelte
- **Backend**: Python, Java, C, C++, C#, Go, Rust, PHP, Ruby, Swift
- **Functional**: Haskell, Clojure, Elixir, Erlang, F#, OCaml
- **Systems**: Objective-C, Lua, Perl, R, Shell scripts
- **Data**: SQL, YAML, Terraform, Dockerfile

### Markup & Config
- **Markup**: HTML, XML, Markdown, Jade, LaTeX
- **Config**: INI, JSON, TOML, Makefile

### Custom Languages
For unsupported languages, define custom delimiters:
```json
{
  "header.customDelimiters": {
    "mylang": ["# ", " #"],
    "blocklang": ["/* ", " */"]
  }
}
```

---

## 🔧 Advanced Configuration

### Git Integration
The extension automatically detects:
- Author name from `git config user.name`
- Email from `git config user.email`
- Falls back to system username if Git not configured

### Package.json Integration
Automatically reads:
- `name` → Project name
- `version` → Current version
- `author` → Author information

### Environment Variables
```bash
export USER="Your Name"
export URL="https://your-site.com"
```

### Priority Order
Configuration values are resolved in this order:
1. File-based (workspace root files)
2. VS Code settings
3. Git configuration
4. Environment variables
5. System defaults

---

## 🐛 Troubleshooting

### Headers Not Inserting
**Problem**: Headers aren't being inserted in new files.

**Solutions**:
1. Check if the language is supported: `Extensions` → `dnettoRaw Header` → `Supported Languages`
2. Enable auto-insert: `"header.autoInsert": true`
3. Verify file isn't excluded in VS Code settings

### Wrong Author/Email
**Problem**: Wrong author name or email in headers.

**Solutions**:
1. Set in VS Code settings: `"header.username"` and `"header.email"`
2. Create `author` file in workspace root
3. Configure Git: `git config user.name "Your Name"`

### Logo Not Displaying
**Problem**: Custom logo isn't showing.

**Solutions**:
1. Check logo file exists in workspace root
2. Ensure logo is max 30 columns × 11 lines
3. Verify `header.logoType` is set correctly

### Template Variables Not Working
**Problem**: Template variables show as literal text.

**Solutions**:
1. Check variable names (case-sensitive)
2. Ensure required files exist (e.g., `version` for `$VERSION`)
3. Restart VS Code after configuration changes

### Performance Issues
**Problem**: Extension slows down VS Code.

**Solutions**:
1. Disable auto-update: `"header.autoInsert": false`
2. Use simpler templates
3. Exclude large files/folders in VS Code settings

---

## ❓ FAQ

**Q: Can I use this with existing projects?**
A: Yes! The extension works with any project. Existing headers will be updated surgically.

**Q: Does it support my favorite language?**
A: Check the supported languages list. For unsupported languages, use custom delimiters.

**Q: Can I disable the ASCII art?**
A: Yes, set `"header.logoType": "none"` to remove ASCII art entirely.

**Q: How do I change the date format?**
A: The date format is fixed as `YYYY/MM/DD HH:mm:ss` for consistency.

**Q: Can I use this in CI/CD pipelines?**
A: Yes, but headers are inserted interactively. For automated header insertion, consider other tools.

**Q: Does it work with remote workspaces?**
A: Yes, all features work with remote development (WSL, SSH, Codespaces).

**Q: Can I use it with large codebases?**
A: Yes, the extension is optimized for performance. Auto-updates only trigger on save and are very fast.

**Q: What happens to existing headers?**
A: Existing headers are updated surgically - only timestamps and filenames change, preserving your custom content.

---

## ⚡ Performance & Compatibility

### System Requirements
- **VS Code**: 1.40.0 or later
- **Node.js**: 12.0.0 or later (for development)
- **Memory**: Minimal impact (< 10MB additional RAM)

### Performance Tips
- Use simpler templates for better performance
- Disable auto-insert for large projects if needed
- The extension only activates on supported file types

### Compatibility
- ✅ Windows, macOS, Linux
- ✅ VS Code, VS Code Insiders
- ✅ Remote development (WSL, SSH, Codespaces)
- ✅ All supported languages work identically across platforms

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
```bash
git clone https://github.com/dnettoRaw/vscode-header.git
cd vscode-header
npm install
npm run compile
```

### Running Tests
```bash
npm test          # Run all tests
npm run lint      # Check code quality
npm run compile   # Build the extension
```

### Testing Locally
1. Open in VS Code: `Extensions` → `...` → `Install from VSIX`
2. Select `vscode-header-*.vsix` from the project root

### Code Structure
```
src/
├── extension.ts    # Main extension logic
├── header.ts       # Header generation and parsing
├── delimiters.ts   # Language delimiter definitions
└── test/           # Test suite
```

### Guidelines
- Follow TypeScript best practices
- Add tests for new features
- Update documentation
- Use conventional commits

---

## 📈 Changelog

### v0.3.4 (Current)
- Enhanced test coverage (26 test cases)
- Improved linting and code quality
- Fixed header parsing edge cases
- Better error handling

### v0.3.3
- Added custom delimiter support
- Improved logo rendering
- Enhanced file-based configuration

### v0.3.2
- Added little header support
- Improved auto-update functionality
- Better language detection

### v0.3.1
- Initial public release
- Basic header insertion
- Git integration
- ASCII art support

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

<p align="center">
  Made with ❤️ by <strong>dnettoRaw</strong><br>
  <a href="https://github.com/dnettoRaw/vscode-header">GitHub</a> •
  <a href="https://marketplace.visualstudio.com/items?itemName=dnettoRaw.dr-header">VS Code Marketplace</a> •
  <a href="https://dnetto.dev">Website</a>
</p>
