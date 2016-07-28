Markdown = {
    italicsAndBold: function(txt) {
        return txt.replace(/(\*\*|__)([^]*?\S[\*_]*)\1/g, "<strong>$2</strong>")
                  .replace(/(\*|_)([^\*_]*?\S)\1/g, "<em>$2</em>")
    }, parse: function(txt) {
        txt = Markdown.italicsAndBold(txt)
        return txt
    }
}