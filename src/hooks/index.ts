import { copyToClipboard } from "../utils"

export function useCopyCode() {
  const timeoutIdMap: Map<HTMLElement, ReturnType<typeof setTimeout>> = new Map();
  const listerner = (e: MouseEvent) => {
    const el = e.target as HTMLElement
    if (el.matches(".copy")) {
      const parent = el.parentElement
      const sibling = el.nextElementSibling as HTMLPreElement | null
      if (!parent || !sibling) {
        return
      }

      const text = sibling.innerText

      copyToClipboard(text.trim()).then(() => {
        el.classList.add("copied")
        clearTimeout(timeoutIdMap.get(el))
        const timeoutId = setTimeout(() => {
          el.classList.remove("copied")
          el.blur()
          timeoutIdMap.delete(el)
        }, 2000)
        timeoutIdMap.set(el, timeoutId)
      })
    }
  }
  return listerner
  // onMount(() => {
  //   window.addEventListener("click", listerner)
  // })
  // onCleanup(() => {
  //   window.removeEventListener("click", listerner)
  // })
}
