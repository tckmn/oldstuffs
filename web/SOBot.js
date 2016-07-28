var evalWorker
function safeEval(x) {
  evalWorker.postMessage(x)
}
function postMessage(txt) {
  $('#input').val(txt)
  $('#sayit-button').click()
}

function initWorker(supressReviveMsg) {
  var evalWorkerBlob = new Blob(['onmessage=function(e){try{postMessage(eval(e.data))}catch(err){postMessage("An error occured!")}}'], {type: 'application/javascript'})
  evalWorker = new Worker(URL.createObjectURL(evalWorkerBlob))

  evalWorker.onmessage = function(e) { postMessage('Result: ' + e.data) }
  if (!supressReviveMsg) postMessage('Chatbot revived!')
}

initWorker(true)

var blacklist = [], mods = ['Doorknob'], prefix = '>>', cmds = {
  revive: function() {
    initWorker()
  }, ban: function(toBan, caller) {
    toBan = toBan.join(' ')
    if (mods.indexOf(caller) < 0) {
      postMessage('You are not a mod, and are not authorized to execute that command!')
    } else {
      if (blacklist.indexOf(toBan) >= 0) {
        postMessage(toBan + ' is already banned!')
      } else {
        blacklist.push(toBan)
        postMessage('Banned ' + toBan + ' from executing chatbot commands.')
      }
    }
  }, unban: function(toUnban, caller) {
    toUnban = toUnban.join(' ')
    if (mods.indexOf(caller) < 0) {
      postMessage('You are not a mod, and are not authorized to execute that command!')
    } else {
      if (blacklist.indexOf(toUnban) < 0) {
        postMessage(toUnban + ' is not banned!')
      } else {
        blacklist.splice(blacklist.indexOf(toUnban), 1)
        postMessage('Unbanned ' + toUnban + ' from executing chatbot commands.')
      }
    }
  }, banlist: function() {
    postMessage('Banned users: ' + blacklist)
  }, listcommands: function() {
    postMessage('List of commands: ' + Object.keys(cmds))
  }, die: function(_, caller) {
    if (mods.indexOf(caller) < 0) {
      postMessage('You are not a mod, and are not authorized to execute that command!')
    } else {
      safeEval('while(1);') // freeze him!
      postMessage('Ok, I\'m dead! Type \''+ prefix +'revive\' to revive me.')
    }
  }, prefix: function(newPrefix, caller) {
    if (newPrefix === '') {
      postMessage('The current prefix is ' + prefix)
    } else {
      if (mods.indexOf(caller) < 0) {
        postMessage('You are not a mod, and are not authorized to execute that command!')
      } else {
        prefix = newPrefix
        postMessage('Prefix changed to ' + prefix)
      }
    }
  }
}
;(new (window.MutationObserver || window.WebKitMutationObserver) (function(e) {
  var node, message, username
  if (e[0].addedNodes && (node = e[0].addedNodes[0]) && (message = e[0].addedNodes[0].innerText)) {
    if (/\buser-container\b/.test(node.className)) {
      try {
        message = $('.content', node)[0].innerText
      } catch(e) {
        // TODO find out why first message by person running bot doesn't work
        // for now let's just hack it together
        var matched = message.match(/\n(.*)\n(.*)/)
        username = matched[1]
        message = matched[2]
      }
    } else {
      node = node.parentNode.parentNode
    }
    try { username =  $('.username', node)[0].innerText } catch(e) {} // same bug as above
    if (!message) return
    message = message.trim()
    if ((blacklist.indexOf(username) < 0) && (message.indexOf(prefix) === 0)) {
      message = message.replace(prefix, '')
      var tokens = message.trim().split(' ')
      var foundCmd = cmds[tokens[0].trim().toLowerCase()]
      if (foundCmd) foundCmd(tokens.slice(1), username)
      else safeEval(message)
    }
  }
})).observe($('#chat')[0], {childList: true, subtree: true})