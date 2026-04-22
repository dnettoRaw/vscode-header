
const moment = require('moment');
const m = require('module');

// Mock vscode
const originalLoader = m._load;
m._load = function (request, parent, isMain) {
    if (request === 'vscode') {
        return {
            workspace: {
                getConfiguration: () => ({
                    get: (key) => ''
                })
            }
        };
    }
    return originalLoader(request, parent, isMain);
};

const { renderHeader } = require('../out/src/header');

const info = {
    filename: 'Untitled-1',
    author: 'dnettoRaw <contact@dnetto.dev>',
    createdBy: 'dnettoRaw',
    createdAt: moment('2026-04-22 13:30:00'),
    updatedBy: 'dnettoRaw',
    updatedAt: moment('2026-04-22 13:30:00'),
    url: 'https://dnetto.dev',
    obs1: 'Modern header management',
    obs2: '',
    obs3: '',
    license: 'MIT'
};

const header = renderHeader('typescript', info);
console.log(header);
