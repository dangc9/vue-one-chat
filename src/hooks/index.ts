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
}

export function autoTextarea(textarea: HTMLTextAreaElement) {
  textarea.addEventListener('input', changeHeight);
  textarea.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) { // Enter键
      event.preventDefault();
      if (event.shiftKey) { // 同时按下Shift键
        var cursorPos = this.selectionStart;
        var textBefore = this.value.substring(0, cursorPos);
        var textAfter = this.value.substring(cursorPos, this.value.length);
        this.value = textBefore + "\n" + textAfter;
        this.selectionEnd = cursorPos + 1;
        changeHeight()
      }
    }
  });
  function changeHeight() {
    let scrollHeight = textarea.scrollHeight;
    if(scrollHeight !== 24) {
      textarea.style.height = 'auto';
      scrollHeight = textarea.scrollHeight;
    }
    textarea.style.height = scrollHeight  + 'px';
  }
}
