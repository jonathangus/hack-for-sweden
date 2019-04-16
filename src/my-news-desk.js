export const init = () => {
  var DOMAIN = 'https://www.mynewsdesk.com/se/hack-for-sweden'

  var createIframe = function() {
    var path = ''
    var iframe = document.createElement('iframe')
    iframe.id = 'mnd-iframe'
    iframe.width = '100%'
    iframe.frameBorder = 0
    iframe.setAttribute('allowTransparency', 'true')
    iframe.setAttribute('scrolling', 'no')
    iframe.src = [DOMAIN, path].join('')

    document.getElementById('press').appendChild(iframe)
    return
    var script = document.getElementById('mnd-script')
    script.parentNode.insertBefore(iframe, script.nextSibling)
  }

  var updateHeight = function(height) {
    document.getElementById('mnd-iframe').height = height
  }

  var setHash = function(path) {
    window.location.hash = path
  }

  var setScrollPosition = function(top) {
    document.body.scrollTop = top
  }

  var eventer, messageEvent

  if (window.addEventListener) {
    eventer = window['addEventListener']
    messageEvent = 'message'
  } else {
    eventer = window['attachEvent']
    messageEvent = 'onmessage'
  }

  eventer(
    messageEvent,
    function(e) {
      var data = null,
        origin = e.origin.substring(e.origin.indexOf(':') + 1)

      if (origin !== DOMAIN) {
        return
      }

      try {
        data = JSON.parse(e.data)
      } catch (err) {
        data = e.data
      }
      console.log(data)
      switch (data.action) {
        case 'updateHeight':
          updateHeight(data.bodyHeight)
          break
        case 'setHash':
          // setHash(data.path)
          break
        case 'setScrollPosition':
          setScrollPosition(data.top)
          break
        default:
          return
      }
    },
    false
  )

  createIframe()
}
