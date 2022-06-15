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
 * Return current project name found in package.json, or standalone by default
 */
 const getCurrentProject = () => {
  // let t = vscode.workspace.findFiles('package.json','**∕**',1)
  return ' '
  //  .get('header.url') || 'standalone'
 }


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
const insertLittleHeaderHandler = () => {
  const { activeTextEditor } = vscode.window
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

// const insertOnlyLogoHeaderHandler = () => {
//   const { activeTextEditor } = vscode.window
//   const { document } = activeTextEditor

//   if (supportsLanguage(document.languageId))
//     activeTextEditor.edit(editor => {
//       const currentHeader = extracteLogoHeader(document.getText())

//       if (currentHeader)
//         editor.replace(
//           new Range(0, 0, 9, 0),
//           renderLittleHeader(
//             document.languageId,
//             newLittleHeaderInfo(document, getLittleHeaderInfo(currentHeader))
//           )
//         )
//       else
//         editor.insert(
//           new Position(0, 0),
//           renderLittleHeader(
//             document.languageId,
//             newLittleHeaderInfo(document)
//           )
//         )
//     })
//   else
//     vscode.window.showInformationMessage(
//       `No header support for language ${document.languageId}`
//     )
// }

/**
 * Start watcher for document save to update current header
 */
const startUpdateOnSaveWatcher = (subscriptions: vscode.Disposable[]) =>
  vscode.workspace.onWillSaveTextDocument(event => {
    const document = event.document
    const currentHeader = extractHeader(document.getText())
    const currentLHeader = extractLittleHeader(document.getText())

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
          ] :[]? 
        supportsLanguage(document.languageId) && currentLHeader ?
          [
            TextEdit.replace(
              new Range(0, 0, 8, 0),
              renderLittleHeader(
                document.languageId,
                newLittleHeaderInfo(document, getLittleHeaderInfo(currentLHeader))
              )
            )
          ]
          :[]:[]// No TextEdit to apply
      )
    )
  },
    null, subscriptions
  )


export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands
    .registerTextEditorCommand('header.insertHeader', insertHeaderHandler)
  const littleHeader = vscode.commands
    .registerTextEditorCommand('header.insertLittleHeader', insertLittleHeaderHandler)
  // const onlylogo = vscode.commands
    // .registerTextEditorCommand('header.insertOnlyLogoleHeader', insertOnlyLogoHeaderHandler)

  context.subscriptions.push(disposable,littleHeader)
  startUpdateOnSaveWatcher(context.subscriptions)
}