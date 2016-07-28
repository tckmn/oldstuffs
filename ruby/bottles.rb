c=->{"#{n} bottle#{'s'if$n>1} of beer on the wall"}
(n=99).times{puts"#{c[]}, #{c[][0..-13]}.
#{n<2?"Go to the store and buy some more":"Take one down and pass it around"}, #{n=(n-2)%99+1;c}.

"}