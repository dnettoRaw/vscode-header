import { basename } from 'path'
import vscode = require('vscode')
import moment = require('moment')

import {
  ExtensionContext, TextEdit, TextEditorEdit, TextDocument, Position, Range
} from 'vscode'

import {
  extractHeader, getHeaderInfo, renderHeader,
  supportsLanguage, HeaderInfo
} from './header'

/**
 * Return current user from config or ENV by default
 */
const getCurrentUser = () =>
  vscode.workspace.getConfiguration()
    .get('header.username') || process.env['USER'] || 'marvin'

/**
 * Return current user mail from config or default value
 */
const getCurrentUserMail = () =>
  vscode.workspace.getConfiguration()
    .get('header.email') || `${getCurrentUser()}@dnetto.dev`

/**
 * Return current user from config or ENV by default
 */
const getCurrentUrl = () =>
vscode.workspace.getConfiguration()
  .get('header.url') || process.env['URL'] || 'dnetto.dev'



/**
 * Update HeaderInfo with last update author and date, and update filename
 * Returns a fresh new HeaderInfo if none was passed
 */
const newHeaderInfo = (document: TextDocument, headerInfo?: HeaderInfo) => {
  const user = getCurrentUser()
  const mail = getCurrentUserMail()
  const _url = getCurrentUrl()

  return Object.assign({},
    // This will be overwritten if headerInfo is not null
    {
      createdAt: moment(),
      createdBy: user,
      obs1: ' ',
      obs2: ' ',
      obs3: ' '
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

/**
 * `insertHeader` Command Handler
 */
const insertHeaderHandler = () => {
  const { activeTextEditor } = vscode.window
  const { document } = activeTextEditor

  if (supportsLanguage(document.languageId))
    activeTextEditor.edit(editor => {
      const currentHeader = extractHeader(document.getText())

      if (currentHeader)
        editor.replace(
          new Range(0, 0, 15, 0),
          renderHeader(
            document.languageId,
            newHeaderInfo(document, getHeaderInfo(currentHeader))
          )
        )
      else
        editor.insert(
          new Position(0, 0),
          renderHeader(
            document.languageId,
            newHeaderInfo(document)
          )
        )
    })
  else
    vscode.window.showInformationMessage(
      `No header support for language ${document.languageId}`
    )
}

/**
 * Start watcher for document save to update current header
 */
const startUpdateOnSaveWatcher = (subscriptions: vscode.Disposable[]) =>
  vscode.workspace.onWillSaveTextDocument(event => {
    const document = event.document
    const currentHeader = extractHeader(document.getText())

    event.waitUntil(
      Promise.resolve(
        supportsLanguage(document.languageId) && currentHeader ?
          [
            TextEdit.replace(
              new Range(0, 0, 15, 0),
              renderHeader(
                document.languageId,
                newHeaderInfo(document, getHeaderInfo(currentHeader))
              )
            )
          ]
          : [] // No TextEdit to apply
      )
    )
  },
    null, subscriptions
  )


export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands
    .registerTextEditorCommand('header.insertHeader', insertHeaderHandler)

  context.subscriptions.push(disposable)
  startUpdateOnSaveWatcher(context.subscriptions)
}
