<h1 align="center"><img
  src="https://raw.githubusercontent.com/dnettoRaw/vscode-header/master/img/logo.png" 
  width=200></h1>
# Header for VSCode

This extension provides the header integration in VS Code.

```bash
# **************************************************************************** #
#                                                                             */
#    vscode-header                                            #####           */
#                                                          ############       */
#    By: dnettoRaw <hello@dnettoraw.dev>                 ###          ###     */
#                                                       ##    ##  ##    ##    */
#    obs: "even if you don't believe them,                    ##  ##          */
#          they believe you."                                                 */
#                        -A demon told me               ##    ##  ##   ##     */
#                                                        ###  ######  ###     */
#    Created: 2022/03/20 21:21:42 by dnettoRaw            #####    ####       */
#    Updated: 2022/05/19 21:21:42 by dnettoRaw                                */
#                                                     dnetto.dev              */
# **************************************************************************** #
```

### soon little version for deps files
```bash
#       #######
#    ###       ###
#   ##   ## ##   ##  F: vscode-header.js
#        ## ##       P: vscode-header
#                    C: 2022/03/20 21:21:42 by dnettoRaw
#   ##   ## ##   ##  U: 2022/05/19 21:21:42 by dnettoRaw
#     ###########
```
|||
|-|-|
|F| file name|
|P| project name|
|C| created at|
|U| updated at|

## Usage

### Insert a header
 - **macOS** : <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>H</kbd>
 - **Linux** / **Windows** : <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>H</kbd>.

### Insert a little header
 - **macOS** : <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>j</kbd>
 - **Linux** / **Windows** : <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>j</kbd>.

Header is automatically updated on save.


## Configuration

Default values for **username** and **email** are imported from environment variables.

To override these values, specify these properties in *User Settings* :

```ts
{
  "header.username": string,
  "header.email": string,
  "header.url" : string
}
```

# todo
 - [x] file name
 - [x] creator name
 - [x] modifier name
 - [x] creation date
 - [x] modifcation date
 - [x] observation 
   - [ ] observation show dialog in insert header
 - [x] web site 
   - [ ] auto add https
   - [ ] fix for very long sites url
 - [x] workflow publish relase
 - [x] little version of header
 - [ ] custon logo by user
 - [ ] versiion with only logo
 
## Issues

In case of a bug, or missing feature, please create a [Github Pull Request](https://github.com/dnettoRaw/vscode-header/pulls).

## License

MIT

## credits 
[kube](https://github.com/kube)
