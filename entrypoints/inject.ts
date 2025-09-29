import { finder } from '@medv/finder'

function getSelectedElement() {
  // $0 is the currently selected element in the Elements panel.
  // @ts-expect-error
  const element: Element | null = $0
  return element
}

export default defineUnlistedScript(() => {
  const selected = getSelectedElement()
  if (!selected) {
    // console.log('No element selected')
    return
  }
  const css = finder(selected)
  // console.log('Updating CSS Selector sidebar', css)
  return css
})
