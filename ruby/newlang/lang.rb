program = IO.readlines('test.lng').join
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
stack = []
