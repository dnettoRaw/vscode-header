// =============================================================================
//        #######     
//     ###       ###     F: header.ts
//    ##   ## ##   ##    P: dr-header
//         ## ##      
//                       C: 2026/04/23 10:00:00 by dnettoRaw
//    ##   ## ##   ##    U: 2026/04/23 12:15:00 by dnettoRaw
//      ###########   
// =============================================================================

import moment = require('moment')
import vscode = require('vscode')
import path = require('path')
import { getLanguageDelimiters } from './delimiters'

export type HeaderInfo = {
  filename: string,
  project: string,
  version: string,
  since: string,
  author: string,
  createdBy: string,
  createdAt: moment.Moment,
  updatedBy: string,
  updatedAt: moment.Moment,
  url: string,
  obs1: string,
  obs2: string,
  obs3: string,
  license: string
}

export type littleHeaderInfo = {
  filename: string,
  project: string,
  version: string,
  since: string,
  createdBy: string,
  createdAt: moment.Moment,
  updatedBy: string,
  updatedAt: moment.Moment,
}


/**
 * Template where each field name is prefixed by $ and is padded with _
 */

const genericTemplate = `
********************************************************************************
*  $LOGO0_________________   filename: $FILENAME________________________________
*  $LOGO1_________________   Project : $PROJECT_________________________________
*  $LOGO2_________________
*  $LOGO3_________________   Created: $CREATEDAT_________ by $CREATED_______
*  $LOGO4_________________   Updated: $UPDATEDAT_________ by $UPDATED_______
*  $LOGO5_________________   Since  : $SINCE____________________________________
*  $LOGO6_________________   obs: $OBS1_______________________________________
*  $LOGO7_________________        $OBS2_______________________________________
*  $LOGO8_________________        $OBS3_______________________________________
*  $LOGO9_________________
*  $LOGO10________________   License: $LICENSE__________  $URL________________
********************************************************************************
`.substring(1)

/**
 * Template where each field name is prefixed by $ and is padded with _
 */
const littleTemplate = `
********************************************************************************
*  $LLOGO0________
*  $LLOGO1________   F: $FILENAME_____________________________________________
*  $LLOGO2________   P: $PROJECT______________________________________________
*  $LLOGO3________
*  $LLOGO4________   C: $CREATEDAT_________ by $CREATED_______________________
*  $LLOGO5________   U: $UPDATEDAT_________ by $UPDATED_______________________
*  $LLOGO6________   S: $SINCE________________________________________________
********************************************************************************
`.substring(1)

/**
 * Template no tex and no updates
 */
const logoTemplate = `
*       $LOGO0______________________________________________ *
*       $LOGO1______________________________________________ *
*       $LOGO2______________________________________________ *
*       $LOGO3______________________________________________ *
*       $LOGO4______________________________________________ *
*       $LOGO5______________________________________________ *
*       $LOGO6______________________________________________ *
*       $LOGO7______________________________________________ *
*       $LOGO8______________________________________________ *
*       $LOGO9______________________________________________ *
`.substring(1)


/**
 * Get specific header template for languageId
 * 
 */
const getLittleLogo = () => {
  const config = vscode.workspace.getConfiguration()
  const logoType = config.get('header.logoType') as string
  if (logoType === 'none') return Array(7).fill(' '.repeat(17))

  return [
    '     #######     ',
    '  ###       ###  ',
    ' ##   ## ##   ## ',
    '      ## ##      ',
    '                 ',
    ' ##   ## ##   ## ',
    '   ###########   ',
  ]
}
const getDefaultLogo = () => [
  '         #####           ',
  '      ############       ',
  '    ###          ###     ',
  '   ##    ##  ##    ##    ',
  '         ##  ##          ',
  '                         ',
  '   ##    ##  ##    ##    ',
  '    ###  ######  ###     ',
  '     #####    ####       '
]

const getLinuxLogo = () => [
  '        .88888888:.      ',
  '      88888888888888.    ',
  '    .8888888888888888.   ',
  '    888888888888888888   ',
  '    88 8888888888888P    ',
  '     88_:88:88:88:88:88  ',
  '     .8888888888888888.  ',
  '    .888888888888888888. ',
  '   .88888888888888888888.',
  '  .8888888888888888888888'
]

const getVSCodeLogo = () => [
  '     .::::::::.          ',
  '   .::::::::::::.        ',
  '  :::::      :::::       ',
  ' :::::        :::::      ',
  ' ::::          ::::      ',
  ' ::::          ::::      ',
  ' :::::        :::::      ',
  '  :::::      :::::       ',
  '   ::::::::::::::        ',
  '     ::::::::::          '
]

const getMaxLogo = () => [
  '******************************',
  '*                            *',
  '*      RECOMMENDED MAX       *',
  '*          30 x 11           *',
  '*                            *',
  '*    (Can be wider but it    *',
  '*     will exceed 80 cols)   *',
  '*                            *',
  '*                            *',
  '*                            *',
  '******************************'
]

const getCustomLogo = () => {
  // 1. Try "logo" file in workspace root
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    try {
      const logoPath = path.join(workspaceFolders[0].uri.fsPath, 'logo');
      const fs = require('fs');
      if (fs.existsSync(logoPath)) {
        const content = fs.readFileSync(logoPath, 'utf8');
        const lines = content.split(/\r?\n/).slice(0, 11);
        return lines.map((line: string) => {
          const trimmed = line.substring(0, 30);
          return trimmed + ' '.repeat(Math.max(0, 30 - trimmed.length));
        });
      }
    } catch (_) { }
  }

  const config = vscode.workspace.getConfiguration()
  const customLogo = config.get('header.logo') as string
  if (customLogo) {
    return customLogo.split('\n')
  }

  const logoType = config.get('header.logoType') as string
  if (logoType === 'linux') return getLinuxLogo()
  if (logoType === 'vscode') return getVSCodeLogo()
  if (logoType === 'max') return getMaxLogo()
  if (logoType === 'none') return Array(11).fill(' '.repeat(25))

  return getDefaultLogo()
}

/**
 * Applies language-specific delimiters to template
 * Preserves template variables by extracting and replacing only border asterisks
 */
const applyDelimitersToTemplate = (template: string, left: string, right: string) => {
  const lines = template.split('\n')

  return lines.map((line) => {
    if (line.length === 0) return line

    // For lines that are all asterisks (border lines), create a border with delimiters
    if (/^\*+$/.test(line)) {
      const trimmedLeft = left.trim()
      const fillChar = '='
      const fillLength = line.length - left.length - right.length
      return left + fillChar.repeat(Math.max(0, fillLength)) + right
    }

    // For content lines starting with asterisk
    if (line.startsWith('*')) {
      const hasEndStar = line.endsWith('*')
      const content = hasEndStar
        ? line.substring(1, line.length - 1)
        : line.substring(1)

      return left + content + right
    }

    return line
  }).join('\n')
}

const getTemplate = (languageId: string) => {
  const config = vscode.workspace.getConfiguration()
  const customTemplate = config.get('header.template') as string
  const baseTemplate = customTemplate || genericTemplate

  const delimiters = getLanguageDelimiters(languageId)
  if (!delimiters) return baseTemplate
  const [left, right] = delimiters

  return applyDelimitersToTemplate(baseTemplate, left, right)
}

const getLittleTemplate = (languageId: string) => {
  const config = vscode.workspace.getConfiguration()
  const customTemplate = config.get('header.littleTemplate') as string
  const baseTemplate = customTemplate || littleTemplate

  const delimiters = getLanguageDelimiters(languageId)
  if (!delimiters) return baseTemplate
  const [left, right] = delimiters

  return applyDelimitersToTemplate(baseTemplate, left, right)
}

const getLogoTemplate = (languageId: string) => {
  const delimiters = getLanguageDelimiters(languageId)
  if (!delimiters) return logoTemplate
  const [left, right] = delimiters

  return applyDelimitersToTemplate(logoTemplate, left, right)
}

/**
 * Fit value to correct field width, padded with spaces
 */
const pad = (value: string, width: number) =>
  value.length < width ? value.concat(' '.repeat(width - value.length)) : value

/**
 * Stringify Date to correct format for header
 */
const formatDate = (date: moment.Moment) =>
  date.format('YYYY/MM/DD HH:mm:ss')

/**
 * Get Date object from date string formatted for header
 */
const parseDate = (date: string) =>
  moment(date, 'YYYY/MM/DD HH:mm:ss')

/**
 * Check if language is supported
 */
export const supportsLanguage = (languageId: string) =>
  getLanguageDelimiters(languageId) !== undefined

/**
 * Returns current header text if present at top of document
 */
export const extractHeader = (text: string): string | null => {
  const lines = text.split(/\r?\n/).slice(0, 13)
  if (lines.length < 13) return null
  const header = lines.join('\n')

  // Flexible check for main header: must contain Created or Updated
  if (/created:|updated:/i.test(header)) {
    return header
  }
  return null
}

export const extractLittleHeader = (text: string): string | null => {
  const lines = text.split(/\r?\n/).slice(0, 9)
  if (lines.length < 9) return null
  const header = lines.join('\n')

  // Flexible check for little header: must contain C: or U: 
  if (/\b[CU]: /i.test(header)) {
    return header
  }
  return null
}

/**
 * Get value for given field name from header string by finding its position in the template
 */
const getFieldValue = (header: string, name: string) => {
  const config = vscode.workspace.getConfiguration()
  const customTemplate = config.get('header.template') as string
  const template = customTemplate || genericTemplate

  const templateLines = template.split('\n')
  const headerLines = header.split('\n')

  const fieldMarker = `$${name}`
  for (let i = 0; i < templateLines.length; i++) {
    const tLine = templateLines[i]
    if (tLine.includes(fieldMarker)) {
      const hLine = headerLines[i]
      if (!hLine) continue

      const match = tLine.match(new RegExp(`\\$${name}(?![A-Z0-9])_*`))
      if (match) {
        const offset = tLine.indexOf(match[0])
        const value = hLine.substr(offset, match[0].length).trim()
        // Clean up accidental label capture (recursive, handles common prefixes like 'by')
        return value.replace(/^([a-zA-Z0-9\s]+:|\bby\b|\bfrom\b|\s|:)+/i, '').trim()
      }
    }
  }
  return ''
}

const getLittleFieldValue = (header: string, name: string) => {
  const config = vscode.workspace.getConfiguration()
  const customTemplate = config.get('header.littleTemplate') as string
  const template = customTemplate || littleTemplate

  const templateLines = template.split('\n')
  const headerLines = header.split('\n')

  const fieldMarker = `$${name}`
  for (let i = 0; i < templateLines.length; i++) {
    const tLine = templateLines[i]
    if (tLine.includes(fieldMarker)) {
      const hLine = headerLines[i]
      if (!hLine) continue

      const match = tLine.match(new RegExp(`\\$${name}(?![A-Z0-9])_*`))
      if (match) {
        const offset = tLine.indexOf(match[0])
        const value = hLine.substr(offset, match[0].length).trim()
        // Clean up accidental label capture (recursive, handles common prefixes like 'by')
        return value.replace(/^([a-zA-Z0-9\s]+:|\bby\b|\bfrom\b|\s|:)+/i, '').trim()
      }
    }
  }
  return ''
}

/**
 * Strips language-specific delimiters from a header to match template format
 */
const stripDelimiters = (header: string, languageId: string) => {
  const delimiters = getLanguageDelimiters(languageId)
  if (!delimiters) return header
  const [left, right] = delimiters

  return header.split('\n').map(line => {
    if (line.startsWith(left)) {
      let content = line.substring(left.length)
      if (right && content.endsWith(right)) {
        content = content.substring(0, content.length - right.length)
      }
      // Maintain same length as left delimiter by padding with spaces after *
      return '*' + ' '.repeat(Math.max(0, left.length - 1)) + content
    }
    return line
  }).join('\n')
}

/**
 * Extract header info from header string
 */
export const getHeaderInfo = (header: string, languageId: string): HeaderInfo => {
  const normalizedHeader = stripDelimiters(header, languageId)

  return {
    filename: getFieldValue(normalizedHeader, 'FILENAME'),
    project: getFieldValue(normalizedHeader, 'PROJECT'),
    version: getFieldValue(normalizedHeader, 'VERSION'),
    since: getFieldValue(normalizedHeader, 'SINCE'),
    author: getFieldValue(normalizedHeader, 'AUTHOR'),
    createdBy: getFieldValue(normalizedHeader, 'CREATEDBY') || getFieldValue(normalizedHeader, 'CREATED'),
    createdAt: parseDate(getFieldValue(normalizedHeader, 'CREATEDAT')),
    updatedBy: getFieldValue(normalizedHeader, 'UPDATEDBY') || getFieldValue(normalizedHeader, 'UPDATED'),
    updatedAt: parseDate(getFieldValue(normalizedHeader, 'UPDATEDAT')),
    url: getFieldValue(normalizedHeader, 'URL'),
    obs1: getFieldValue(normalizedHeader, 'OBS1'),
    obs2: getFieldValue(normalizedHeader, 'OBS2'),
    obs3: getFieldValue(normalizedHeader, 'OBS3'),
    license: getFieldValue(normalizedHeader, 'LICENSE')
  }
}

export const getLittleHeaderInfo = (header: string, languageId: string): littleHeaderInfo => {
  const normalizedHeader = stripDelimiters(header, languageId)

  return {
    filename: getLittleFieldValue(normalizedHeader, 'FILENAME'),
    project: getLittleFieldValue(normalizedHeader, 'PROJECT'),
    version: getLittleFieldValue(normalizedHeader, 'VERSION'),
    since: getLittleFieldValue(normalizedHeader, 'SINCE'),
    createdBy: getLittleFieldValue(normalizedHeader, 'CREATED') || getLittleFieldValue(normalizedHeader, 'CREATEDBY'),
    createdAt: parseDate(getLittleFieldValue(normalizedHeader, 'CREATEDAT')),
    updatedBy: getLittleFieldValue(normalizedHeader, 'UPDATED') || getLittleFieldValue(normalizedHeader, 'UPDATEDBY'),
    updatedAt: parseDate(getLittleFieldValue(normalizedHeader, 'UPDATEDAT')),
  }
}

/**
 * Renders a language template with header info
 */
export const renderHeader = (languageId: string, info: HeaderInfo, logoOnly: boolean = false) => {
  const logo = getCustomLogo()
  let template = logoOnly ? getLogoTemplate(languageId) : getTemplate(languageId)

  const allFields: { [key: string]: string } = {
    FILENAME: info.filename,
    PROJECT: info.project,
    VERSION: info.version,
    SINCE: info.since,
    AUTHOR: info.author,
    CREATEDAT: formatDate(info.createdAt),
    CREATEDBY: info.createdBy,
    UPDATEDAT: formatDate(info.updatedAt),
    UPDATEDBY: info.updatedBy,
    URL: info.url,
    OBS1: info.obs1,
    OBS2: info.obs2,
    OBS3: info.obs3,
    LICENSE: info.license,
    // Aliases
    DATE: formatDate(info.createdAt),
    CREATED: info.createdBy,
    UPDATED: info.updatedBy,
    USER: info.createdBy,
    MAIL: info.author.match(/<(.*)>/)?.[1] || info.author
  }
  for (let i = 0; i <= 10; i++) {
    allFields[`LOGO${i}`] = logo[i] || ' '
  }
  // Sort keys by length descending to avoid partial matches (LOGO1 vs LOGO10)
  const keys = Object.keys(allFields).sort((a, b) => b.length - a.length)

  for (const key of keys) {
    const regex = new RegExp(`\\$${key}(?![A-Z0-9])_*`, 'g')

    template = template.replace(regex, (match) => pad(allFields[key], match.length))
  }

  return template
}

export const renderLittleHeader = (languageId: string, info: littleHeaderInfo) => {
  const logo = getLittleLogo()
  let template = getLittleTemplate(languageId)
  const allFields: { [key: string]: string } = {
    FILENAME: info.filename,
    PROJECT: info.project,
    VERSION: info.version,
    SINCE: info.since,
    CREATEDAT: formatDate(info.createdAt),
    CREATEDBY: info.createdBy,
    CREATED: info.createdBy,
    UPDATEDAT: formatDate(info.updatedAt),
    UPDATEDBY: info.updatedBy,
    UPDATED: info.updatedBy,
  }

  // Add little logo lines
  for (let i = 0; i < logo.length; i++) {
    allFields[`LLOGO${i}`] = logo[i] || ' '
  }

  const keys = Object.keys(allFields).sort((a, b) => b.length - a.length)
  for (const key of keys) {
    const regex = new RegExp(`\\$${key}(?![A-Z0-9])_*`, 'g')
    template = template.replace(regex, (match) => pad(allFields[key], match.length))
  }

  return template
}