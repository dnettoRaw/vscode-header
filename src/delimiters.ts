import vscode = require('vscode')

/*      #######                                               */
/*   ###       ###                                            */
/*  ##   ## ##   ##   F: delimiters.ts                        */
/*       ## ##                                                */
/*                    C: 2022/06/15 15:23:41 by:dnettoRaw     */
/*  ##   ## ##   ##   U: 2022/06/15 15:23:43 by:dnettoRaw     */
/*    ###########                                             */


const hashes = ['# ', ' #']
const slashes = ['/* ', ' */']
const doubleSlashes = ['// ', ' //']
const semicolons = [';; ', ' ;;']
const parens = ['(* ', ' *)']
const dashes = ['-- ', ' --']
const percents = ['%% ', ' %%']
const xmlStyle = ['<!-- ', ' -->']

export const languageDemiliters: { [lang: string]: string[] | undefined } = {
  'c': doubleSlashes,
  'coffeescript': hashes,
  'cpp': doubleSlashes,
  'css': slashes,
  'dockerfile': hashes,
  'fsharp': parens,
  'go': doubleSlashes,
  'groovy': doubleSlashes,
  'haskell': dashes,
  'ini': semicolons,
  'jade': slashes,
  'java': doubleSlashes,
  'javascript': doubleSlashes,
  'javascriptreact': doubleSlashes,
  'latex': percents,
  'less': doubleSlashes,
  'lua': dashes,
  'makefile': hashes,
  'objective-c': doubleSlashes,
  'ocaml': parens,
  'perl': hashes,
  'perl6': hashes,
  'php': doubleSlashes,
  'plaintext': hashes,
  'powershell': hashes,
  'python': hashes,
  'r': hashes,
  'ruby': hashes,
  'rust': doubleSlashes,
  'scss': doubleSlashes,
  'shellscript': hashes,
  'sql': hashes,
  'swift': doubleSlashes,
  'typescript': doubleSlashes,
  'typescriptreact': doubleSlashes,
  'xsl': xmlStyle,
  'yaml': hashes,
  'markdown': xmlStyle,
  'html': xmlStyle,
  'xml': xmlStyle,
  'vue': xmlStyle,
  'svelte': xmlStyle,
  'terraform': hashes,
  'elixir': hashes,
  'erlang': percents,
  'clojure': semicolons
}

/**
 * Get language delimiters, including custom ones from configuration
 */
export const getLanguageDelimiters = (languageId: string): string[] | undefined => {
  const customDelimiters = vscode.workspace.getConfiguration().get('header.customDelimiters') as { [lang: string]: string[] }
  return (customDelimiters && customDelimiters[languageId]) || languageDemiliters[languageId]
}
