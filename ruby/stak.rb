=begin

Stak

Everything is a function. Charsets are:
[a-z]
[A-Z]
[0-9].[0-9]
[\s] (space, tab, newline, carriage return, form feed)
`...` (string literal, can contain escaped ` as \` and escaped \ as \\)
\`...` (embedded Ruby, same rules as string literal)
!"#$%&'()*+,-./:;<=>?@[\]^_{|}~ (punctuation, p{Punct}, excluding `)
everything else (control characters, non-ASCII)

NOTES TO SELF:
if array element is ` then throw error: string literal delimiters don't match!

=end

program = IO.readlines('test.stk').join
tokens = program.split(/
(
  \\`(?:\\.|[^`])*` # embedded Ruby code
| `(?:\\.|[^`])*` # string literal
| [a-z]+ # lowercase
| [A-Z]+ # uppercase
| [0-9]+(?:\.[0-9]+)? # numbers
| \s+ # whitespace
| \p{Punct}+ # punctuation
)
/x).reject {|x| x.empty? || x =~ /\A\s+\z/}
puts tokens

$a = []
$i = 0

while $i < tokens.size do
  t = tokens[$i]
  case t
  # embedded Ruby
  when /^\\`(.*)`/m
    eval $1
  # string literal
  when /^`(.*)`/m
    $a.push $1
  # number literal
  when /^([0-9]+)/
    $a.push $1.to_i
  end
end