window.doc = document
doc.el = doc.createElement
window.prop = function(obj, k, v) {
    if (v !== undefined) obj[k] = v
    else if (typeof k === "string") return obj[k]
    else for (var x in k) if (k.hasOwnProperty(x)) obj[x] = k[x]
    return obj
}
window.$ = function(selector) {
    return Sizzle(selector)
}
prop(Node.prototype, {
    text: function(t) {
        if (t) {
            if (this.textContent !== undefined) this.textContent = t
            else this.innerText = t
        } else return this.textContent || this.innerText
        return this
    }, $: function(selector) {
        return Sizzle(selector, this)
    }, add: function(el) {
        this.appendChild(el)
        return this
    }, addTo: function(el) {
        el.appendChild(this)
        return this
    }, remove: function() {
        this.parentNode.removeChild(this)
        return this
    }, prop: function(k, v) {
        if (v !== undefined) this[k] = v
        else if (typeof k === "string") return this[k]
        else for (var x in k) if (k.hasOwnProperty(x)) this[x] = k[x]
        return this
    }
})
prop(Element.prototype, {
    attr: function(k, v) {
        if (v !== undefined) this.setAttribute(k, v)
        else if (typeof k === "string") return this.getAttribute(k)
        else for (var x in k) if (k.hasOwnProperty(x)) this.setAttribute(x, k[x])
        return this
    }, removeAttr: function(x) {
        this.removeAttribute(x)
        return this
    }, addClass: function(name) {
        if (this.className) this.className += ' ' + name
        else this.className = name
        return this
    }, removeClass: function(name) {
        var classes = this.className.split(/\s+/),
            index = classes.indexOf(name)
        if (index !== -1) classes.splice(index, 1)
        this.className = classes.join(' ')
        return this
    }, hasClass: function(name) {
        var classes = this.className.split(/\s+/)
        return classes.indexOf(name) !== -1
    }
})
prop(HTMLElement.prototype, {
    css: function(k, v) {
        if (v !== undefined) this.style.setProperty(k, v)
        else if (typeof k === "string") return this.style.setProperty(k)
        else for (var x in k) if (k.hasOwnProperty(x)) this.style.setProperty(x, k[x])
        return this
    }
})
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(what, i) {
        i = i || 0
        while (i < this.length) {
            if (this[i] === what) return i
            i++
        }
        return -1
    }
}