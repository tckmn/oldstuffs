var evalWorker
function safeEval(x) {
  evalWorker.postMessage(x)
}
function postMessage(txt) {
  X144.value = txt // set text of textbox to message
  X366() // submit message
}

function initWorker(supressReviveMsg) {
  var evalWorkerBlob = new Blob(['onmessage=function(e){try{postMessage(eval(e.data))}catch(err){postMessage("An error occured!")}}'], {type: 'application/javascript'})
  evalWorker = new Worker(URL.createObjectURL(evalWorkerBlob))

  evalWorker.onmessage = function(e) { postMessage(String.fromCharCode(8203) + e.data) }
  if (!supressReviveMsg) postMessage('Chatbot revived!')
}

initWorker(true)

var blacklist = ['Chatbot'], mods = ['OddLlama'], prefix = '>>', cmds = {
  revive: function() {
    initWorker()
  }, test: function() {
    postMessage('test command...')
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
  }
}
;(new (window.MutationObserver || window.WebKitMutationObserver) (function() {
  var c = X184.children,
      data = c[c.length - 1].innerText.split(':')

  var username = data[0], cmd = data.slice(1).join(':')
  if (!cmd) return
  cmd = cmd.trim().replace(new RegExp(String.fromCharCode(8203), 'g'), '')
  if ((blacklist.indexOf(username) < 0) && (cmd.indexOf(prefix) === 0)) {
    cmd = cmd.replace(prefix, '')
    var tokens = cmd.trim().split(' ')
    var foundCmd = cmds[tokens[0].trim().toLowerCase()]
    if (foundCmd) foundCmd(tokens.slice(1), username)
    else {
      console.log(cmd)
      safeEval(cmd)
    }
  }
})).observe(X184, {childList: true})