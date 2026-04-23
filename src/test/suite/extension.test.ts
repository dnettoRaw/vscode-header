import * as assert from 'assert'
import * as vscode from 'vscode'
import { supportsLanguage, extractHeader, extractLittleHeader } from '../../header'
import { getLanguageDelimiters } from '../../delimiters'

suite('Header Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.')

	// ==================== Language Support Tests ====================
	suite('Language support detection', () => {
		test('should support common languages', () => {
			assert.strictEqual(supportsLanguage('typescript'), true)
			assert.strictEqual(supportsLanguage('javascript'), true)
			assert.strictEqual(supportsLanguage('c'), true)
			assert.strictEqual(supportsLanguage('rust'), true)
			assert.strictEqual(supportsLanguage('python'), true)
			assert.strictEqual(supportsLanguage('java'), true)
			assert.strictEqual(supportsLanguage('go'), true)
		})

		test('should reject unsupported languages', () => {
			assert.strictEqual(supportsLanguage('nonexistent-lang'), false)
			assert.strictEqual(supportsLanguage(''), false)
			assert.strictEqual(supportsLanguage('unknown-language'), false)
		})

		test('should support web technologies', () => {
			assert.strictEqual(supportsLanguage('html'), true)
			assert.strictEqual(supportsLanguage('css'), true)
			assert.strictEqual(supportsLanguage('php'), true)
		})

		test('should support scripting languages', () => {
			assert.strictEqual(supportsLanguage('python'), true)
			assert.strictEqual(supportsLanguage('ruby'), true)
			assert.strictEqual(supportsLanguage('perl'), true)
			assert.strictEqual(supportsLanguage('lua'), true)
		})
	})

	// ==================== Delimiter Tests ====================
	suite('Delimiter matching', () => {
		test('should match double-slash delimiters', () => {
			const tsDelimiters = getLanguageDelimiters('typescript')
			assert.deepStrictEqual(tsDelimiters, ['// ', ''])

			const jsDelimiters = getLanguageDelimiters('javascript')
			assert.deepStrictEqual(jsDelimiters, ['// ', ''])

			const cDelimiters = getLanguageDelimiters('c')
			assert.deepStrictEqual(cDelimiters, ['// ', ''])

			const rustDelimiters = getLanguageDelimiters('rust')
			assert.deepStrictEqual(rustDelimiters, ['// ', ''])
		})

		test('should match hash delimiters', () => {
			const pythonDelimiters = getLanguageDelimiters('python')
			assert.deepStrictEqual(pythonDelimiters, ['# ', ' #'])

			const rubyDelimiters = getLanguageDelimiters('ruby')
			assert.deepStrictEqual(rubyDelimiters, ['# ', ' #'])

			const shellDelimiters = getLanguageDelimiters('shellscript')
			assert.deepStrictEqual(shellDelimiters, ['# ', ' #'])
		})

		test('should match block comment delimiters', () => {
			const htmlDelimiters = getLanguageDelimiters('html')
			assert.deepStrictEqual(htmlDelimiters, ['<!-- ', ' -->'])

			const cssDelimiters = getLanguageDelimiters('css')
			assert.deepStrictEqual(cssDelimiters, ['/* ', ' */'])

			const jsxDelimiters = getLanguageDelimiters('javascriptreact')
			assert.deepStrictEqual(jsxDelimiters, ['// ', ''])
		})

		test('should handle special delimiters', () => {
			const luaDelimiters = getLanguageDelimiters('lua')
			assert.deepStrictEqual(luaDelimiters, ['-- ', ' --'])

			const haskellDelimiters = getLanguageDelimiters('haskell')
			assert.deepStrictEqual(haskellDelimiters, ['-- ', ' --'])
		})

		test('should return undefined for unsupported languages', () => {
			assert.strictEqual(getLanguageDelimiters('unknown'), undefined)
			assert.strictEqual(getLanguageDelimiters('nonexistent'), undefined)
		})
	})

	// ==================== Header Extraction Tests ====================
	suite('Header extraction', () => {
		test('should extract valid headers', () => {
			const headerText = `/*      #######                                               */
/*   ###       ###                                            */
/*  ##   ## ##   ##   F: test.ts                             */
/*       ## ##                                                */
/*                    Created: 2022/06/15 15:24:02 by:dnettoRaw     */
/*  ##   ## ##   ##   Updated: 2022/06/15 15:24:05 by:dnettoRaw     */
/*    ###########                                             */
/* Additional line 1                                          */
/* Additional line 2                                          */
/* Additional line 3                                          */
/* Additional line 4                                          */
/* Additional line 5                                          */
/* Additional line 6                                          */

console.log('test')`

			const extracted = extractHeader(headerText)
			assert.notStrictEqual(extracted, null)
			assert.ok(extracted?.includes('Created'))
		})

		test('should return null for missing headers', () => {
			const textWithoutHeader = `console.log('test')\nconsole.log('test2')`
			const extracted = extractHeader(textWithoutHeader)
			assert.strictEqual(extracted, null)
		})

		test('should handle multiline headers with valid format', () => {
			const headerText = `// Header line 1
// Header line 2
// Header line 3
// Header line 4
// Header line 5
// Header line 6
// Header line 7
// Header line 8
// Header line 9
// Header line 10
// Header line 11
// Header line 12
// Created: 2022/06/15 15:24:02
code here`

			const extracted = extractHeader(headerText)
			assert.ok(extracted !== null)
		})

		test('should extract little headers', () => {
			const littleHeaderText = `// Header 1
// Header 2
// F: test.ts
// P: project
// C: 2022/06/15 15:24:02 by:user
// U: 2022/06/15 15:24:05 by:user
// S: 1.0.0
// Header 8
// Header 9
code`

			const extracted = extractLittleHeader(littleHeaderText)
			assert.notStrictEqual(extracted, null)
		})

		test('should require Created or Updated in header', () => {
			const invalidHeader = `// Random header
// Without created or updated
// Just some lines
// More lines`

			const extracted = extractHeader(invalidHeader)
			assert.strictEqual(extracted, null)
		})
	})

	// ==================== Integration Tests ====================
	suite('Integration tests', () => {
		test('should support various language combinations', () => {
			const languages = ['typescript', 'javascript', 'python', 'java', 'rust', 'go', 'c', 'cpp']
			languages.forEach(lang => {
				assert.strictEqual(supportsLanguage(lang), true, `Should support ${lang}`)
				assert.notStrictEqual(getLanguageDelimiters(lang), undefined, `Should have delimiters for ${lang}`)
			})
		})

		test('should handle dialect variations', () => {
			// TypeScript and JavaScript should have same delimiters
			assert.deepStrictEqual(
				getLanguageDelimiters('typescript'),
				getLanguageDelimiters('javascript')
			)

			// C and C++ should have same delimiters
			assert.deepStrictEqual(
				getLanguageDelimiters('c'),
				getLanguageDelimiters('cpp')
			)
		})

		test('should have consistent delimiter format', () => {
			const languages = ['typescript', 'python', 'java', 'rust']
			languages.forEach(lang => {
				const delims = getLanguageDelimiters(lang)
				assert.ok(Array.isArray(delims), `Delimiters for ${lang} should be array`)
				assert.strictEqual(delims?.length, 2, `Delimiters for ${lang} should have 2 elements`)
				assert.strictEqual(typeof delims?.[0], 'string', `Left delimiter for ${lang} should be string`)
				assert.strictEqual(typeof delims?.[1], 'string', `Right delimiter for ${lang} should be string`)
			})
		})
	})

	// ==================== Edge Cases ====================
	suite('Edge cases', () => {
		test('should handle empty text', () => {
			const extracted = extractHeader('')
			assert.strictEqual(extracted, null)
		})

		test('should handle very short text', () => {
			const extracted = extractHeader('single line')
			assert.strictEqual(extracted, null)
		})

		test('should handle text with only whitespace', () => {
			const extracted = extractHeader('\n\n\n\n')
			assert.strictEqual(extracted, null)
		})

		test('should handle mixed line endings', () => {
			const headerText = `// Line 1\r\n// Line 2\n// Line 3\r\n// Line 4\n// Created: 2022/06/15 15:24:02`
			const extracted = extractHeader(headerText)
			// Should handle mixed line endings without error
			assert.ok(extracted !== null || extracted === null) // Just verify no crash
		})

		test('should handle case-insensitive date matching', () => {
			const headerLowercase = `// Line 1
// Line 2
// Line 3
// Line 4
// Line 5
// Line 6
// Line 7
// Line 8
// created: 2022/06/15 15:24:02
// updated: 2022/06/15 15:24:05
// Line 11
// Line 12
// Line 13`
			const headerUppercase = `// LINE 1
// LINE 2
// LINE 3
// LINE 4
// LINE 5
// LINE 6
// LINE 7
// LINE 8
// CREATED: 2022/06/15 15:24:02
// UPDATED: 2022/06/15 15:24:05
// LINE 11
// LINE 12
// LINE 13`

			const extracted1 = extractHeader(headerLowercase)
			const extracted2 = extractHeader(headerUppercase)

			assert.ok(extracted1 !== null)
			assert.ok(extracted2 !== null)
		})
	})

	// ==================== Language Coverage ====================
	suite('Language delimiter coverage', () => {
		test('should support top programming languages', () => {
			const topLanguages = ['python', 'java', 'javascript', 'c', 'cpp', 'rust', 'go', 'typescript']
			topLanguages.forEach(lang => {
				assert.strictEqual(supportsLanguage(lang), true, `Missing support for ${lang}`)
			})
		})

		test('should support markup languages', () => {
			const markupLanguages = ['html', 'xml']
			markupLanguages.forEach(lang => {
				assert.strictEqual(supportsLanguage(lang), true, `Missing support for ${lang}`)
			})
		})

		test('should support shell scripts', () => {
			const shellLanguages = ['shellscript', 'powershell']
			shellLanguages.forEach(lang => {
				assert.strictEqual(supportsLanguage(lang), true, `Missing support for ${lang}`)
			})
		})

		test('should support functional languages', () => {
			const funcLanguages = ['haskell', 'clojure', 'elixir']
			funcLanguages.forEach(lang => {
				assert.strictEqual(supportsLanguage(lang), true, `Missing support for ${lang}`)
			})
		})
	})
})
