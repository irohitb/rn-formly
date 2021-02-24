
function debounce(func: (...args: any[]) => any, timeout: number): (...args: any[]) => void {
    let timer: any
    return (...args: any[]) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func(...args)
      }, timeout)
    }
  }
  
  export default debounce