import * as vscode from "vscode";

export const closeEditorPatternByURI = () => {
  vscode.window
    .showInputBox({
      placeHolder: "Write regex pattern to match URI",
    })
    .then(findAndCloseTabs);
};
export const closeEditorPatternByLabel = () => {
  vscode.window
    .showInputBox({
      placeHolder: "Write regex pattern to match Label",
    })
    .then((p) => findAndCloseTabs(p, false));
};

async function findAndCloseTabs(pattern?: string, byUri = true) {
  if (!pattern) return;
  const re = RegExp(pattern);

  const mask: (tab: vscode.Tab) => boolean = byUri
    ? (t) => maskByUri(t, re)
    : (t) => maskByLabel(t, re);

  const tabs = vscode.window.tabGroups.all.map((group) => group.tabs).flat();

  const tabsMatch: boolean[] = tabs.map(mask);

  await closeTabs(tabsMatch, tabs);
}

function maskByLabel(tab: vscode.Tab, regEx: RegExp) {
  return regEx.test(tab.label);
}

function maskByUri(tab: vscode.Tab, regEx: RegExp) {
  if (typeof tab.input != "object" || !tab.input) return false;
  const input = tab.input as vscode.TabInputText;
  return "uri" in input ? regEx.test(input.uri.toString()) : false;
}

async function closeTabs(tabsMatch: boolean[], tabs: vscode.Tab[]) {
  const promises = tabsMatch.map((close, ix) => {
    return close
      ? new Promise<boolean>((r) =>
          vscode.window.tabGroups.close(tabs[ix]).then(r)
        )
      : Promise.resolve(false);
  });
  return Promise.all(promises);
}
