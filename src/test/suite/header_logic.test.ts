import * as assert from 'assert'
import { renderHeader, renderLittleHeader, HeaderInfo, littleHeaderInfo } from '../../header'
import moment = require('moment')

suite('Header Logic Unit Tests', () => {
    const dummyInfo: HeaderInfo = {
        filename: 'test.ts',
        project: 'test-project',
        version: '1.0.0',
        since: '1.0.0',
        author: 'Test Author <test@example.com>',
        createdBy: 'Test Author',
        createdAt: moment('2026-04-23T10:00:00Z'),
        updatedBy: 'Test Author',
        updatedAt: moment('2026-04-23T10:00:00Z'),
        url: 'example.com',
        obs1: 'test observation',
        obs2: ' ',
        obs3: ' ',
        license: 'MIT'
    }

    const dummyLittleInfo: littleHeaderInfo = {
        filename: 'test.ts',
        project: 'test-project',
        version: '1.0.0',
        since: '1.0.0',
        createdBy: 'Test Author',
        createdAt: moment('2026-04-23T10:00:00Z'),
        updatedBy: 'Test Author',
        updatedAt: moment('2026-04-23T10:00:00Z'),
    }

    test('should render normal header with equals border', () => {
        const rendered = renderHeader('typescript', dummyInfo)
        // Check if border contains equals signs
        assert.ok(rendered.includes('============================================================================='))
        assert.ok(rendered.includes('filename: test.ts'))
        assert.ok(rendered.includes('Project : test-project'))
        assert.ok(rendered.includes('Since  : 1.0.0'))
    })

    test('should render little header with equals border', () => {
        const rendered = renderLittleHeader('typescript', dummyLittleInfo)
        assert.ok(rendered.includes('============================================================================='))
        assert.ok(rendered.includes('F: test.ts'))
        assert.ok(rendered.includes('P: test-project'))
        assert.ok(rendered.includes('S: 1.0.0'))
    })

    test('should apply delimiters correctly to borders', () => {
        const renderedPython = renderHeader('python', dummyInfo)
        // Python uses # delimiters: ['# ', ' #']
        // Template is 80 chars, so border is '# ' + '='*76 + ' #'
        assert.ok(renderedPython.startsWith('# ' + '='.repeat(76) + ' #'))
    })
})
