<img
  src="https://raw.githubusercontent.com/dnettoRaw/vscode-header/master/dnettoRaw.png" 
  width=128>

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
#    Created: 2013/11/18 13:37:42 by dnettoRaw            #####    ####       */
#    Updated: 2016/09/18 13:11:04 by dnettoRaw                                */
#                                                     dnetto.dev              */
# **************************************************************************** #
```

## Usage

### Insert a header
 - **macOS** : <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>H</kbd>
 - **Linux** / **Windows** : <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>H</kbd>.

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
 - [ ] custon logo by user
 - [x] observation 
   - [ ] observation show dialog in insert header
 - [x] web site 
   - [ ] auto add https
   - [ ] fix for very long sites url
 - [x] workflow publish relase

## Issues

In case of a bug, or missing feature, please create a [Github Pull Request](https://github.com/dnettoRaw/vscode-header/pulls).

## License

MIT

## credits 
[kube](https://github.com/kube)
