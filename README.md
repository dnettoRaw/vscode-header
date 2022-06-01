<img
  src="https://raw.githubusercontent.com/dnettoRaw/vscode-header/master/dnettoRaw.png" 
  width=128>

# 42 Header for VSCode

This extension provides the header integration in VS Code.

```bash
# **************************************************************************** #
#                                                                              #
#                                                             #####            #
#    vscode-header                                         ############        #
#                                                        ###          ###      #
#    By: dnettoRaw <hello@dnettoraw.dev>                ##    ##  ##    ##     #
#                                                             ##  ##           #
#    desc:                                                    ##  ##           #
#                                                                              #
#                                                       ##    ##  ##   ##      #
#    Created: 2013/11/18 13:37:42 by dnettoRaw           ###  ######  ###      #
#    Updated: 2016/09/18 13:11:04 by dnettoRaw            #####   #####        #
#                                                                              #
# **************************************************************************** #
```

## Install

Launch Quick Open with <kbd>⌘</kbd>+<kbd>P</kbd> and enter
```
ext install header
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
  "header.email": string
}
```


## Issues

In case of a bug, or missing feature, please create a [Github Pull Request](https://github.com/dnettoRaw/vscode-header/pulls).

## License

MIT