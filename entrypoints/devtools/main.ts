async function injectAndExecuteCode<T>(code: string) {
  return new Promise<T>((resolve, reject) => {
    // TODO: not working with Safari
    browser.devtools.inspectedWindow.eval(code, (result, exceptionInfo) => {
      if (exceptionInfo) {
        reject(exceptionInfo)
      } else {
        resolve(result as T)
      }
    })
  })
}

browser.devtools.panels.elements.createSidebarPane(
  'CSS Selector',
  function (sidebar) {
    async function updateElementProperties() {
      const code = await (
        await fetch(browser.runtime.getURL('/inject.js'))
      ).text()
      // console.log('Injecting code', code)
      const css = await injectAndExecuteCode<string | undefined>(code)
      console.log('Received CSS Selector', css)
      sidebar.setObject({
        css: css ?? 'No element selected',
      })
    }
    updateElementProperties()
    browser.devtools.panels.elements.onSelectionChanged.addListener(
      updateElementProperties,
    )
  },
)
