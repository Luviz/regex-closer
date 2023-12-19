import * as vscode from "vscode";

const extensionName = "regex-closer";

export function activate(context: vscode.ExtensionContext) {
  const closeEditorPattern = vscode.commands.registerCommand(
    `${extensionName}.closeEditorPattern`,
    (args) => {
      console.log("args>>", args);
      vscode.window
        .showInputBox({
          placeHolder: "Add some regex",
        })
        .then(async (pattern) => {
          if (!pattern) return;

          const re = RegExp(pattern);

          const tabs = vscode.window.tabGroups.all
            .map((group) => group.tabs)
            .flat();

          const tabsMatch: boolean[] = tabs.map((tab) => {
            if (typeof tab.input != "object" || !tab.input) return false;
            const input = tab.input as vscode.TabInputText;
            return "uri" in input ? re.test(input.uri.toString()) : false;
          });

          const promises = tabsMatch.map((close, ix) => {
            return close
              ? new Promise<boolean>((r) =>
                  vscode.window.tabGroups.close(tabs[ix]).then(r)
                )
              : Promise.resolve(false);
          });
          Promise.all(promises);
        });
    }
  );

  context.subscriptions.push(closeEditorPattern);
}

// This method is called when your extension is deactivated
export function deactivate() {}
