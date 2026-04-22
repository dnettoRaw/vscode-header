import * as assert from 'assert';
import * as vscode from 'vscode';
import { supportsLanguage } from '../../header';
import { getLanguageDelimiters } from '../../delimiters';

suite('Header Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Language support detection', () => {
		assert.strictEqual(supportsLanguage('typescript'), true);
		assert.strictEqual(supportsLanguage('javascript'), true);
		assert.strictEqual(supportsLanguage('c'), true);
		assert.strictEqual(supportsLanguage('nonexistent-lang'), false);
	});

	test('Delimiter matching', () => {
		// Modern languages now use open-ended // style
		const tsDelimiters = getLanguageDelimiters('typescript');
		assert.deepStrictEqual(tsDelimiters, ['// ', '']);

		const jsDelimiters = getLanguageDelimiters('javascript');
		assert.deepStrictEqual(jsDelimiters, ['// ', '']);

		const cDelimiters = getLanguageDelimiters('c');
		assert.deepStrictEqual(cDelimiters, ['// ', '']);

		// HTML still uses block comments
		const htmlDelimiters = getLanguageDelimiters('html');
		assert.deepStrictEqual(htmlDelimiters, ['<!-- ', ' -->']);
	});
});
