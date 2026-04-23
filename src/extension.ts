// =============================================================================
//        #######     
//     ###       ###     F: extension.ts
//    ##   ## ##   ##    P: dr-header
//         ## ##      
//                       C: 2026/04/23 11:08:00 by dnettoRaw
//    ##   ## ##   ##    U: 2026/04/23 12:15:00 by dnettoRaw
//      ###########   
// =============================================================================

import { basename } from 'path'
import vscode = require('vscode')
import moment = require('moment')
import path = require('path')
import { execSync } from 'child_process'

import {
  TextEdit, TextDocument, Position, Range
} from 'vscode'

import {
  extractHeader, extractLittleHeader,
  getHeaderInfo, getLittleHeaderInfo,
  renderHeader, renderLittleHeader,
  HeaderInfo, littleHeaderInfo,
  supportsLanguage,
} from './header'

/**
 * Get user name from Git config
 */
const getGitUser = () => {
  try {
    return execSync('git config user.name').toString().trim()
  } catch (_) {
    return null
  }
}

/**
 * Get user email from Git config
 */
const getGitEmail = () => {
  try {
    return execSync('git config user.email').toString().trim()
  } catch (_) {
    return null
  }
}

/**
 * Helper to read a file from workspace root if it exists
 */
const getFileContentIfExists = (filename: string): string | null => {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    try {
      const rootPath = workspaceFolders[0].uri.fsPath;
      const fs = require('fs');
      // Case-insensitive search
      const files = fs.readdirSync(rootPath);
      const targetFile = files.find((f: any) => f.toLowerCase() === filename.toLowerCase());

      if (targetFile) {
        const filePath = path.join(rootPath, targetFile);
        const content = fs.readFileSync(filePath, 'utf8').trim();
        return content.length > 0 ? content : null;
      }
    } catch (_) { }
  }
  return null;
}

/**
 * Return current user from config, Git, or ENV by default
 */
const getCurrentUser = () =>
  vscode.workspace.getConfiguration().get('header.username') ||
  getFileContentIfExists('author') ||
  getGitUser() ||
  process.env['USER'] ||
  'marvin'

/**
 * Return current user mail from config, Git, or default value
 */
const getCurrentUserMail = () =>
  vscode.workspace.getConfiguration().get('header.email') || getGitEmail() || `${getCurrentUser()}@dnetto.dev`

/**
 * Return current license from config or detect from workspace
 */
const getCurrentLicense = () => {
  const configLicense = vscode.workspace.getConfiguration().get('header.license') as string
  if (configLicense) return configLicense

  const fileLicense = getFileContentIfExists('license')
  if (fileLicense) return fileLicense

  return 'NO LICENCE'
}

/**
 * Return current user from config or ENV by default
 */
const getCurrentUrl = () => {
  let url = vscode.workspace.getConfiguration().get('header.url') as string || process.env['URL'] || 'dnetto.dev'
  if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url
  }
  return url
}

/**
 * Return current project name found in package.json, or standalone by default
 */
const getCurrentProject = () => {
  // Try projectname file first
  const fileProject = getFileContentIfExists('projectname')
  if (fileProject) return fileProject

  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    try {
      const pkgPath = vscode.Uri.file(path.join(workspaceFolders[0].uri.fsPath, 'package.json'))
      const fs = require('fs')
      if (fs.existsSync(pkgPath.fsPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath.fsPath, 'utf8'))
        if (pkg.name) return pkg.name
      }
    } catch (_) { }
    return workspaceFolders[0].name;
  }
  return 'standalone';
}

/**
 * Return current version from version file or package.json
 */
const getCurrentVersion = () => {
  const fileVersion = getFileContentIfExists('version')
  if (fileVersion) return fileVersion

  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    try {
      const pkgPath = vscode.Uri.file(path.join(workspaceFolders[0].uri.fsPath, 'package.json'))
      const fs = require('fs')
      if (fs.existsSync(pkgPath.fsPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath.fsPath, 'utf8'))
        if (pkg.version) return pkg.version
      }
    } catch (_) { }
  }
  return '0.0.0';
}

/**
 * Convert between header types to preserve info during switch
 */
const convertLittleToNormal = (info: littleHeaderInfo): HeaderInfo => ({
  filename: info.filename,
  project: info.project,
  version: info.version,
  since: info.since,
  author: info.createdBy,
  createdBy: info.createdBy,
  createdAt: info.createdAt,
  updatedBy: info.updatedBy,
  updatedAt: info.updatedAt,
  url: '',
  obs1: ' ',
  obs2: ' ',
  obs3: ' ',
  license: 'MIT'
})

const convertNormalToLittle = (info: HeaderInfo): littleHeaderInfo => ({
  filename: info.filename,
  project: info.project,
  version: info.version,
  since: info.since,
  createdBy: info.createdBy,
  createdAt: info.createdAt,
  updatedBy: info.updatedBy,
  updatedAt: info.updatedAt,
})

/**
 * Update HeaderInfo with last update author and date, and update filename
 * Returns a fresh new HeaderInfo if none was passed
 */
const newHeaderInfo = (document: TextDocument, headerInfo?: HeaderInfo) => {
  const user = getCurrentUser()
  const mail = getCurrentUserMail()
  const _url = getCurrentUrl()
  const _license = getCurrentLicense() as string

  const isInfoValid = headerInfo && headerInfo.createdAt.isValid()
  const project = getCurrentProject()
  const version = getCurrentVersion()

  return Object.assign({},
    {
      createdAt: moment(),
      createdBy: user,
      author: `${user} <${mail}>`,
      project: project,
      version: version,
      since: version,
      obs1: ' ',
      obs2: ' ',
      obs3: ' ',
      license: _license
    },
    isInfoValid ? headerInfo : {},
    {
      filename: basename(document.fileName),
      updatedBy: user,
      updatedAt: moment(),
      url: _url
    }
  )
}

const newLittleHeaderInfo = (document: TextDocument, headerInfo?: littleHeaderInfo) => {
  const user = getCurrentUser();
  const _project = getCurrentProject();
  const _version = getCurrentVersion();

  const isInfoValid = headerInfo && headerInfo.createdAt.isValid()

  return Object.assign({},
    {
      createdAt: moment(),
      createdBy: user,
      version: _version,
      since: _version,
    },
    isInfoValid ? headerInfo : {},
    {
      filename: basename(document.fileName),
      project: _project,
      updatedBy: user,
      updatedAt: moment(),
    }
  )
}

/**
 * `insertHeader` Command Handler
 */
const insertHeaderHandler = async () => {
  const { activeTextEditor } = vscode.window
  if (!activeTextEditor) return
  const { document } = activeTextEditor

  if (supportsLanguage(document.languageId)) {
    const currentHeader = extractHeader(document.getText())
    const currentLHeader = extractLittleHeader(document.getText())

    const obs1 = await vscode.window.showInputBox({ prompt: 'Observation 1 (optional)' }) || ' '
    const obs2 = await vscode.window.showInputBox({ prompt: 'Observation 2 (optional)' }) || ' '
    const obs3 = await vscode.window.showInputBox({ prompt: 'Observation 3 (optional)' }) || ' '

    activeTextEditor.edit(editor => {
      if (currentHeader || currentLHeader) {
        const info = currentHeader
          ? getHeaderInfo(currentHeader, document.languageId)
          : convertLittleToNormal(getLittleHeaderInfo(currentLHeader!, document.languageId))

        info.obs1 = obs1
        info.obs2 = obs2
        info.obs3 = obs3
        editor.replace(
          new Range(0, 0, currentHeader ? 13 : 9, 0),
          renderHeader(
            document.languageId,
            newHeaderInfo(document, info)
          )
        )
      } else {
        const info = newHeaderInfo(document)
        info.obs1 = obs1
        info.obs2 = obs2
        info.obs3 = obs3
        editor.insert(
          new Position(0, 0),
          renderHeader(
            document.languageId,
            info
          )
        )
      }
    })
  } else {
    vscode.window.showInformationMessage(
      `No header support for language ${document.languageId}`
    )
  }
}
const insertLittleHeaderHandler = () => {
  const { activeTextEditor } = vscode.window
  if (!activeTextEditor) return
  const { document } = activeTextEditor

  if (supportsLanguage(document.languageId))
    activeTextEditor.edit(editor => {
      const currentHeader = extractHeader(document.getText())
      const currentLHeader = extractLittleHeader(document.getText())

      if (currentHeader || currentLHeader) {
        const info = currentLHeader
          ? getLittleHeaderInfo(currentLHeader, document.languageId)
          : convertNormalToLittle(getHeaderInfo(currentHeader!, document.languageId))

        editor.replace(
          new Range(0, 0, currentHeader ? 13 : 9, 0),
          renderLittleHeader(
            document.languageId,
            newLittleHeaderInfo(document, info)
          )
        )
      } else
        editor.insert(
          new Position(0, 0),
          renderLittleHeader(
            document.languageId,
            newLittleHeaderInfo(document)
          )
        )
    })
  else
    vscode.window.showInformationMessage(
      `No header support for language ${document.languageId}`
    )
}

const insertOnlyLogoHeaderHandler = () => {
  const { activeTextEditor } = vscode.window
  if (!activeTextEditor) return
  const { document } = activeTextEditor

  if (supportsLanguage(document.languageId))
    activeTextEditor.edit(editor => {
      editor.insert(
        new Position(0, 0),
        renderHeader(
          document.languageId,
          newHeaderInfo(document),
          true // logoOnly flag
        )
      )
    })
  else
    vscode.window.showInformationMessage(
      `No header support for language ${document.languageId}`
    )
}

const updateAllHeadersHandler = async () => {
  const files = await vscode.workspace.findFiles('**/*', '**/node_modules/**')
  let count = 0

  for (const file of files) {
    const document = await vscode.workspace.openTextDocument(file)
    if (!supportsLanguage(document.languageId)) continue

    const currentHeader = extractHeader(document.getText())
    const currentLHeader = extractLittleHeader(document.getText())

    if (currentHeader || currentLHeader) {
      const editor = await vscode.window.showTextDocument(document)
      await editor.edit(editBuilder => {
        if (currentHeader) {
          editBuilder.replace(
            new Range(0, 0, 13, 0),
            renderHeader(
              document.languageId,
              newHeaderInfo(document, getHeaderInfo(currentHeader, document.languageId))
            )
          )
        } else if (currentLHeader) {
          editBuilder.replace(
            new Range(0, 0, 9, 0),
            renderLittleHeader(
              document.languageId,
              newLittleHeaderInfo(document, getLittleHeaderInfo(currentLHeader, document.languageId))
            )
          )
        }
      })
      count++
    }
  }
  vscode.window.showInformationMessage(`Updated ${count} headers in the workspace.`)
}

/**
 * Start watcher for document save to update current header
 */
const startUpdateOnSaveWatcher = (subscriptions: vscode.Disposable[]) =>
  vscode.workspace.onWillSaveTextDocument(event => {
    const { document } = event
    if (!supportsLanguage(document.languageId)) return

    const currentHeader = extractHeader(document.getText())
    const currentLHeader = extractLittleHeader(document.getText())

    if (currentHeader || currentLHeader) {
      const languageId = document.languageId
      const info = currentHeader
        ? getHeaderInfo(currentHeader, languageId)
        : convertLittleToNormal(getLittleHeaderInfo(currentLHeader!, languageId))

      // Update modification info
      info.updatedAt = moment()
      info.updatedBy = getCurrentUser()
      info.filename = basename(document.fileName)

      const renderedHeader = currentHeader
        ? renderHeader(languageId, info)
        : renderLittleHeader(languageId, newLittleHeaderInfo(document, getLittleHeaderInfo(currentLHeader!, languageId)))

      const headerText = currentHeader || currentLHeader!
      const headerLines = headerText.split('\n')
      const newLines = renderedHeader.split('\n')

      const edits: TextEdit[] = []

      // Find and update only the lines that contain "Updated" or "U:"
      // and also the filename line if it changed
      for (let i = 0; i < Math.min(headerLines.length, newLines.length); i++) {
        const isUpdateLine = headerLines[i].toLowerCase().includes('updated:') ||
          headerLines[i].includes('U: ')
        const isFilenameLine = headerLines[i].toLowerCase().includes('filename:') ||
          headerLines[i].includes('F: ')

        if ((isUpdateLine || isFilenameLine) && headerLines[i] !== newLines[i]) {
          edits.push(TextEdit.replace(
            new Range(i, 0, i, headerLines[i].length),
            newLines[i]
          ))
        }
      }

      if (edits.length > 0) {
        event.waitUntil(Promise.resolve(edits))
      }
    }
  },
    null, subscriptions
  )


/**
 * Create a status bar item for quick access
 */
const createStatusBarItem = (subscriptions: vscode.Disposable[]) => {
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
  statusBarItem.command = 'header.insertHeader'
  statusBarItem.text = '$(file-code) Header'
  statusBarItem.tooltip = 'Insert VS Code Header'
  statusBarItem.show()
  subscriptions.push(statusBarItem)
}

/**
 * Automatically insert header when a new file is created
 */
const startAutoInsertWatcher = (subscriptions: vscode.Disposable[]) => {
  vscode.workspace.onDidOpenTextDocument(document => {
    const config = vscode.workspace.getConfiguration()
    if (!config.get('header.autoInsert')) return

    if (document.lineCount === 1 && document.getText() === '' && supportsLanguage(document.languageId)) {
      const editor = vscode.window.activeTextEditor
      if (editor && editor.document === document) {
        editor.edit(editBuilder => {
          editBuilder.insert(new Position(0, 0), renderHeader(document.languageId, newHeaderInfo(document)))
        })
      }
    }
  }, null, subscriptions)
}

export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands
    .registerTextEditorCommand('header.insertHeader', insertHeaderHandler)
  const littleHeader = vscode.commands
    .registerTextEditorCommand('header.insertLittleHeader', insertLittleHeaderHandler)
  const onlylogo = vscode.commands
    .registerTextEditorCommand('header.insertOnlyLogoleHeader', insertOnlyLogoHeaderHandler)
  const updateAll = vscode.commands
    .registerCommand('header.updateAllHeaders', updateAllHeadersHandler)

  context.subscriptions.push(disposable, littleHeader, onlylogo, updateAll)
  startUpdateOnSaveWatcher(context.subscriptions)
  createStatusBarItem(context.subscriptions)
  startAutoInsertWatcher(context.subscriptions)
}