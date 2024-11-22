/* eslint-disable no-console */
export default (context, inject) => {
  let skrollTo = null
  skrollTo = (target, root, smAndDown, xfactor, timeOut) => {
    // console.log(root)
    // console.log(target)
    xfactor = xfactor || -50
    const top = target.offsetTop || target.offsetHeight
    const doScroll = function () {
      root.scrollTo({
        top: top + xfactor + (smAndDown ? 56 : 65),
        left: 0,
        behavior: 'smooth'
      })
    }
    // root must be an element
    // target must be a number -/+
    if (root) {
      if (timeOut) {
        setTimeout(() => {
          doScroll()
        }, timeOut)
      } else {
        doScroll()
      }
    }
  }
  inject('skrollTo', skrollTo)
  return skrollTo
}
