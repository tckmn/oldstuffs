// ==UserScript==
// @name       SEQuickComment
// @namespace  http://keyboardfire.com/
// @version    1.0
// @description  Quick SE comments for quick SE people.
// @match      http://*stackoverflow.com*
// @match      http://*serverfault.com*
// @match      http://*superuser.com*
// @match      http://*askubuntu.com*
// @match      http://*stackapps.com*
// @match      http://*mathoverflow.net*
// @match      http://*stackexchange.com*
// @copyright  MIT License, http://opensource.org/licenses/MIT
// ==/UserScript==

$('#content').on('keyup', 'textarea[name="comment"]', function(e) {
    if (!/^\//.test(this.value)) return
    var cmd = this.value.slice(1)
    var sitename = window.location.hostname.split('.')[0]

    switch(sitename) {
    case 'codegolf':
        switch(cmd) {
        // my common moderator comments
        case 'nuke':
        case 'purge':
        case 'nuking':
        case 'purging':
            this.value = "I am purging all comments here in a bit, since they're mostly obsolete. Please move all important information to the post."
            break
        case 'nuked':
        case 'purged':
            this.value = "Obsolete comments purged. Please notify me if any information was lost, so I can undelete comments with said information."
            break
        case 'noise':
        case 'argue':
        case 'argument':
            this.value = "The comments here have degraded into noise. Please refrain from extended discussion in the comments; if necessary, you may use [chat](http://chat.stackexchange.com/rooms/240/the-nineteenth-byte) instead. All comments have been purged."
            break
        }
    }
})