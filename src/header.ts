/*      #######                                               */
/*   ###       ###                                            */
/*  ##   ## ##   ##   F: header.ts                            */
/*       ## ##                                                */
/*                    C: 2022/06/15 15:23:17 by:dnettoRaw     */
/*  ##   ## ##   ##   U: 2022/06/15 15:23:34 by:dnettoRaw     */
/*    ###########                                             */


import moment = require('moment')
import { languageDemiliters } from './delimiters'

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
  obs3: string
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
*                                                                              *
*   $FILENAME__________________________________               #####            *
*                                                          ############        *
*   By: $AUTHOR________________________________          ###          ###      *
*                                                       ##    ##  ##    ##     *
*   obs: $OBS1_________________________________               ##  ##           *
*        $OBS2_________________________________                                *
*        $OBS3_________________________________         ##    ##  ##   ##      *
*                                                        ###  ######  ###      *
*   Created: $CREATEDAT_________ by $CREATEDBY_           #####    ####        *
*   Updated: $UPDATEDAT_________ by $UPDATEDBY_                                *
*                                                     $URL____________________ *
********************************************************************************

`.substring(1)

/**
 * Template where each field name is prefixed by $ and is padded with _
 */
const littleTemplate=`
*       #######                                                *
*    ###       ###                                             *
*   ##   ## ##   ##   F: $FILENAME___________________________  *
*        ## ##        $PROJECT_______________________________  *
*                     C: $CREATEDAT_________ by:$CREATEDBY___  *
*   ##   ## ##   ##   U: $UPDATEDAT_________ by:$UPDATEDBY___  *
*     ###########                                              *

`.substring(1)

/**
 * Template no tex and no updates
 */
const logoTemplate=`
*       #######      *
*    ###       ###   *
*   ##   ## ##   ##  *
*        ## ##       *
*                    *
*   ##   ## ##   ##  *
*     ###########    *

`.substring(1)


/**
 * Get specific header template for languageId
 */
const getTemplate = (languageId: string) => {
  const [left, right] = languageDemiliters[languageId]
  const width = left.length

  // Replace all delimiters with ones for current language
  return genericTemplate
    .replace(new RegExp(`^(.{${width}})(.*)(.{${width}})$`, 'gm'),
    left + '$2' + right)
}
const getLittleTemplate = (languageId: string) => {
  const [left, right] = languageDemiliters[languageId]
  const width = left.length

  // Replace all delimiters with ones for current language
  return littleTemplate
    .replace(new RegExp(`^(.{${width}})(.*)(.{${width}})$`, 'gm'),
    left + '$2' + right) //pad(' ',right.length))
}

/**
 * Fit value to correct field width, padded with spaces
 */
const pad = (value: string, width: number) =>
  value.concat(' '.repeat(width)).substr(0, width)

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
  languageId in languageDemiliters

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
 * Regex to match field in template
 * Returns [ global match, offset, field ]
 */
const fieldRegex = (name: string) =>
  new RegExp(`^((?:.*\\\n)*.*)(\\\$${name}_*)`, '')

/**
 * Get value for given field name from header string
 */
const getFieldValue = (header: string, name: string) => {
  const [_, offset, field] = genericTemplate.match(fieldRegex(name))

  return header.substr(offset.length, field.length)
}
const getLittleFieldValue = (header: string, name: string) => {
  const [_, offset, field] = littleTemplate.match(fieldRegex(name))

  return header.substr(offset.length, field.length)
}

/**
 * Set field value in header string
 */
const setFieldValue = (header: string, name: string, value: string) => {
  const [_, offset, field] = genericTemplate.match(fieldRegex(name))

  return header.substr(0, offset.length)
    .concat(pad(value, field.length))
    .concat(header.substr(offset.length + field.length))
}
const setLittleFieldValue = (header: string, name: string, value: string) => {
  const [_, offset, field] = littleTemplate.match(fieldRegex(name))

  return header.substr(0, offset.length)
    .concat(pad(value, field.length))
    .concat(header.substr(offset.length + field.length))
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
  obs3: getFieldValue(header, 'OBS3')  
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
export const renderHeader = (languageId: string, info: HeaderInfo) => [
  { name: 'FILENAME', value: info.filename },
  { name: 'AUTHOR', value: info.author },
  { name: 'CREATEDAT', value: formatDate(info.createdAt) },
  { name: 'CREATEDBY', value: info.createdBy },
  { name: 'UPDATEDAT', value: formatDate(info.updatedAt) },
  { name: 'UPDATEDBY', value: info.updatedBy },
  { name: 'URL', value: info.url },
  { name: 'OBS1', value: info.obs1},  
  { name: 'OBS2', value: info.obs2},
  { name: 'OBS3', value: info.obs3}  
].reduce((header, field) =>
  setFieldValue(header, field.name, field.value),
  getTemplate(languageId))

export const renderLittleHeader = (languageId: string, info: littleHeaderInfo) => [
  { name: 'FILENAME', value: info.filename },
  { name: 'PROJECT', value : info.project },
  { name: 'CREATEDAT', value: formatDate(info.createdAt) },
  { name: 'CREATEDBY', value: info.createdBy },
  { name: 'UPDATEDAT', value: formatDate(info.updatedAt) },
  { name: 'UPDATEDBY', value: info.updatedBy },
].reduce((header, field) =>
  setLittleFieldValue(header, field.name, field.value),
  getLittleTemplate(languageId))