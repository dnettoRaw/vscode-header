// //////////////////////////////////////////////////////////////////////////
//      #######        F: header.ts                                          
//   ###       ###     P: dr-header                                          
//  ##   ## ##   ##    C: Invalid date        by: 22/06/15 15:23:17 by:dnettoRaw
//       ## ##         U: 2026/04/22 17:26:57 by: dnettoRaw                  
//                  
//  ##   ## ##   ## 
//    ###########   
// //////////////////////////////////////////////////////////////////////////

import moment = require('moment')
import vscode = require('vscode')
import { getLanguageDelimiters } from './delimiters'

export type HeaderInfo = {
  filename: string,
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
*  $LOGO0_________________   $FILENAME________________________________________
*  $LOGO1_________________   By: $AUTHOR______________________________________
*  $LOGO2_________________
*  $LOGO3_________________   Created: $CREATEDAT_________ by $CREATED_______
*  $LOGO4_________________   Updated: $UPDATEDAT_________ by $UPDATED_______
*  $LOGO5_________________
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
*  $LLOGO0________   F: $FILENAME_____________________________________________
*  $LLOGO1________   P: $PROJECT______________________________________________
*  $LLOGO2________   C: $CREATEDAT_________ by: $CREATEDBY____________________
*  $LLOGO3________   U: $UPDATEDAT_________ by: $UPDATEDBY____________________
*  $LLOGO4________
*  $LLOGO5________
*  $LLOGO6________
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
    if (!line.includes('*')) return line
    
    // For lines that are all asterisks (border lines), create a border with delimiters
    if (/^\*+$/.test(line)) {
      const fillChar = left.charAt(0)
      const fillLength = Math.max(1, 40 - (left.length + right.length) / 2)
      return left + fillChar.repeat(Math.floor(fillLength)) + right
    }
    
    // For content lines with asterisks, extract content between borders and preserve it
    if (line.startsWith('*') && line.endsWith('*')) {
      const content = line.substring(1, line.length - 1)
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
  const headerRegex = `^(.{80}(\r\n|\n)){13}`
  const match = text.match(headerRegex)

  return match ? match[0].split('\r\n').join('\n') : null
}
export const extractLittleHeader = (text: string): string | null => {
  const headerRegex = `^(.{64}(\r\n|\n)){7}`
  const match = text.match(headerRegex)

  return match ? match[0].split('\r\n').join('\n') : null
}

/**
 * Get value for given field name from header string by finding its position in the template
 */
const getFieldValue = (header: string, name: string) => {
  const config = vscode.workspace.getConfiguration()
  const customTemplate = config.get('header.template') as string
  const template = customTemplate || genericTemplate

  const match = template.match(new RegExp(`\\$${name}(?![0-9])_*`))
  if (!match) return ''

  const offset = template.indexOf(match[0])
  return header.substr(offset, match[0].length).trim()
}

const getLittleFieldValue = (header: string, name: string) => {
  const config = vscode.workspace.getConfiguration()
  const customTemplate = config.get('header.littleTemplate') as string
  const template = customTemplate || littleTemplate

  const match = template.match(new RegExp(`\\$${name}(?![0-9])_*`))
  if (!match) return ''
  const offset = template.indexOf(match[0])
  return header.substr(offset, match[0].length).trim()
}

/**
 * Extract header info from header string
 */
export const getHeaderInfo = (header: string): HeaderInfo => ({
  filename: getFieldValue(header, 'FILENAME'),
  author: getFieldValue(header, 'AUTHOR'),
  createdBy: getFieldValue(header, 'CREATEDBY'),
  createdAt: parseDate(getFieldValue(header, 'CREATEDAT')),
  updatedBy: getFieldValue(header, 'UPDATEDBY'),
  updatedAt: parseDate(getFieldValue(header, 'UPDATEDAT')),
  url: getFieldValue(header, 'URL'),
  obs1: getFieldValue(header, 'OBS1'),
  obs2: getFieldValue(header, 'OBS2'),
  obs3: getFieldValue(header, 'OBS3'),
  license: getFieldValue(header, 'LICENSE')
})

export const getLittleHeaderInfo = (header: string): littleHeaderInfo => ({
  filename: getLittleFieldValue(header, 'FILENAME'),
  project: getLittleFieldValue(header, 'PROJECT'),
  createdBy: getLittleFieldValue(header, 'CREATEDBY'),
  createdAt: parseDate(getLittleFieldValue(header, 'CREATEDAT')),
  updatedBy: getLittleFieldValue(header, 'UPDATEDBY'),
  updatedAt: parseDate(getLittleFieldValue(header, 'UPDATEDAT')),
})

/**
 * Renders a language template with header info
 */
export const renderHeader = (languageId: string, info: HeaderInfo, logoOnly: boolean = false) => {
  const logo = getCustomLogo()
  let template = logoOnly ? getLogoTemplate(languageId) : getTemplate(languageId)

  const allFields: { [key: string]: string } = {
    FILENAME: info.filename,
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
    CREATEDAT: formatDate(info.createdAt),
    CREATEDBY: info.createdBy,
    UPDATEDAT: formatDate(info.updatedAt),
    UPDATEDBY: info.updatedBy,
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