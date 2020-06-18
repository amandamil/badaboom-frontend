export default function(name, bubbles = false, cancelable = true) {
  if (!process.browser) return

  const event = document.createEvent('Event')
  event.initEvent(name, bubbles, cancelable)
  return event
}
