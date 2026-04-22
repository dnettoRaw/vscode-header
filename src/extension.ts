/*      #######                                               */
/*   ###       ###                                            */
/*  ##   ## ##   ##   F: extension.ts                         */
/*       ## ##                                                */
/*                    C: 2022/06/15 15:24:02 by:dnettoRaw     */
/*  ##   ## ##   ##   U: 2022/06/15 15:24:05 by:dnettoRaw     */
/*    ###########                                             */


import { basename } from 'path'
import vscode = require('vscode')
import moment = require('moment')
import { execSync } from 'child_process'

import {
  ExtensionContext, TextEdit, TextEditorEdit, TextDocument, Position, Range
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
  } catch (e) {
    return null
  }
}

/**
 * Get user email from Git config
 */
const getGitEmail = () => {
  try {
    return execSync('git config user.email').toString().trim()
  } catch (e) {
    return null
  }
}

/**
 * Return current user from config, Git, or ENV by default
 */
const getCurrentUser = () =>
  vscode.workspace.getConfiguration().get('header.username') || getGitUser() || process.env['USER'] || 'marvin'

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

  // Try to find a LICENSE file in the workspace
  const workspaceFolders = vscode.workspace.workspaceFolders
  if (workspaceFolders && workspaceFolders.length > 0) {
    try {
      const licensePath = vscode.Uri.joinPath(workspaceFolders[0].uri, 'LICENSE')
      // This is a bit hacky since we can't easily read file existence synchronously in VSCode API
      // But we can try to use fs.existsSync if it's a local path
      const fs = require('fs')
      if (fs.existsSync(licensePath.fsPath)) {
        return 'LICENSE' // Just indicate there's a file
      }
    } catch (e) { }
  }

  return 'MIT'
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
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    try {
      const pkgPath = vscode.Uri.joinPath(workspaceFolders[0].uri, 'package.json')
      const fs = require('fs')
      if (fs.existsSync(pkgPath.fsPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath.fsPath, 'utf8'))
        if (pkg.name) return pkg.name
      }
    } catch (e) { }
    return workspaceFolders[0].name;
  }
  return 'standalone';
}


/**
 * Update HeaderInfo with last update author and date, and update filename
 * Returns a fresh new HeaderInfo if none was passed
 */
const newHeaderInfo = (document: TextDocument, headerInfo?: HeaderInfo) => {
  const user = getCurrentUser()
  const mail = getCurrentUserMail()
  const _url = getCurrentUrl()
  const _license = getCurrentLicense() as string

  return Object.assign({},
    // This will be overwritten if headerInfo is not null
    {
      createdAt: moment(),
      createdBy: user,
      obs1: ' ',
      obs2: ' ',
      obs3: ' ',
      license: _license
    },
    headerInfo,
    {
      filename: basename(document.fileName),
      author: `${user} <${mail}>`,
      updatedBy: user,
      updatedAt: moment(),
      url: _url
    }
  )
}

const newLittleHeaderInfo = (document: TextDocument, headerInfo?: littleHeaderInfo) => {
  const user = getCurrentUser();
  const _project = getCurrentProject();

  return Object.assign({},
    // This will be overwritten if headerInfo is not null
    {
      createdAt: moment(),
      createdBy: user,
    },
    headerInfo,
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
    const obs1 = await vscode.window.showInputBox({ prompt: 'Observation 1 (optional)' }) || ' '
    const obs2 = await vscode.window.showInputBox({ prompt: 'Observation 2 (optional)' }) || ' '
    const obs3 = await vscode.window.showInputBox({ prompt: 'Observation 3 (optional)' }) || ' '

    activeTextEditor.edit(editor => {
      const currentHeader = extractHeader(document.getText())

      if (currentHeader) {
        const info = getHeaderInfo(currentHeader)
        info.obs1 = obs1
        info.obs2 = obs2
        info.obs3 = obs3
        editor.replace(
          new Range(0, 0, 15, 0),
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
      const currentHeader = extractLittleHeader(document.getText())

      if (currentHeader)
        editor.replace(
          new Range(0, 0, 9, 0),
          renderLittleHeader(
            document.languageId,
            newLittleHeaderInfo(document, getLittleHeaderInfo(currentHeader))
          )
        )
      else
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
            new Range(0, 0, 15, 0),
            renderHeader(
              document.languageId,
              newHeaderInfo(document, getHeaderInfo(currentHeader))
            )
          )
        } else if (currentLHeader) {
          editBuilder.replace(
            new Range(0, 0, 8, 0),
            renderLittleHeader(
              document.languageId,
              newLittleHeaderInfo(document, getLittleHeaderInfo(currentLHeader))
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
    const document = event.document
    if (!supportsLanguage(document.languageId)) return

    const currentHeader = extractHeader(document.getText())
    const currentLHeader = extractLittleHeader(document.getText())

    if (currentHeader) {
      event.waitUntil(
        Promise.resolve([
          TextEdit.replace(
            new Range(0, 0, 15, 0),
            renderHeader(
              document.languageId,
              newHeaderInfo(document, getHeaderInfo(currentHeader))
            )
          )
        ])
      )
    } else if (currentLHeader) {
      event.waitUntil(
        Promise.resolve([
          TextEdit.replace(
            new Range(0, 0, 8, 0),
            renderLittleHeader(
              document.languageId,
              newLittleHeaderInfo(document, getLittleHeaderInfo(currentLHeader))
            )
          )
        ])
      )
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