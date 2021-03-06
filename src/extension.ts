// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import type MarkdownIt from 'markdown-it';
import imageCaptionPlugin from './lib/image-caption';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export const activate = () => ({
  extendMarkdownIt: (md: MarkdownIt) => md.use(imageCaptionPlugin),
});

// this method is called when your extension is deactivated
export function deactivate() {}
