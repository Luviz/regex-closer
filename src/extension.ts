import * as vscode from "vscode";
import { closeEditorPatternByLabel, closeEditorPatternByURI } from "./commands";

const extensionName = "regex-closer";

export function activate(context: vscode.ExtensionContext) {
  let history: string[] = context.globalState.get("inputHistory", []);

  const disposables = [
    vscode.commands.registerCommand(
      `${extensionName}.closeEditorPattern.uri`,
      closeEditorPatternByURI
    ),
    vscode.commands.registerCommand(
      `${extensionName}.closeEditorPattern.label`,
      closeEditorPatternByLabel
    ),
  ];

  disposables.forEach((disposable) => context.subscriptions.push(disposable));
}

// This method is called when your extension is deactivated
export function deactivate() {}
