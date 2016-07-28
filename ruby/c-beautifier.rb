code = DATA.read

# first, we need to replace strings and comments with tilde escapes to avoid parsing them
code.gsub! '~', '~T'
lineComments = []
code.gsub!(/\/\/.*$/) { lineComments.push $&; '~L' }
multilineComments = []
code.gsub!(/\/\*.*?\*\//m) { multilineComments.push $&; '~M' }
strs = []
code.gsub!(/"(\\.|[^"])*"|'.'/) { strs.push $&; '~S' } # character literals are considered strings

# also, chop out preprocessor stuffs
preprocessor = ''
code.gsub!(/(^#.*\n)+/) { preprocessor = $&; '' }

# clean up newlines and excess whitespace
code.gsub! "\n", ' '
code.gsub! /\s+/, ' '
code.gsub!(/[;{}]/) { "#{$&}\n" }
code.gsub!(/[}]/) { "\n#{$&}" }
code.gsub! /^\s*/, ''
code.gsub! /\s+$/, ''

# fix for loops (with semicolons)
code.gsub!(/^for.*\n.*\n.*/) { $&.gsub ";\n", '; ' }

# now it's time for indenting; add indent according to {}
indentedCode = ''
code.each_line { |l|
	indentedCode += ('    ' * [indentedCode.count('{') - indentedCode.count('}') - (l =~ /^\}/ ? 1 : 0), 0].max) + l
}
code = indentedCode
puts code

# finally we're adding whitespace for more readability. first get a list of all operators
opsWithEq = '= + - * / % ! > < & | ^ >> <<'
opsNoEq = '++ -- && ||'
ops = opsWithEq.split + opsWithEq.split.map{|o| o + '=' } + opsNoEq.split
ops = ops.sort_by(&:length).reverse
# now whitespace-ize them
code.gsub!(/(.)(#{ops.map{|o| Regexp.escape o }.join '|'})(.)/m) { "#{$1 == ' ' ? ' ' : ($1 + ' ')}#{$2}#{$3 == ' ' ? ' ' : (' ' + $3)}" }

# special-cases: only add whitespace to the right
ops = ','.split
code.gsub!(/(#{ops.map{|o| Regexp.escape o }.join '|'})(.)/m) { "#{$1}#{$2 == ' ' ? ' ' : (' ' + $2)}" }
# special-cases: only add whitespace to the left
ops = '{'.split
code.gsub!(/(.)(#{ops.map{|o| Regexp.escape o }.join '|'})/m) { "#{$1 == ' ' ? ' ' : ($1 + ' ')}#{$2}" }

# replace the tilde escapes and preprocessor stuffs
stri = lci = mci = -1
code.gsub!(/~(.)/) {
	case $1
	when 'T'
		'~'
	when 'S'
		strs[stri += 1]
	when 'L'
		lineComments[lci += 1] + "\n#{code[0, $~.begin(0)].split("\n").last}"
	when 'M'
		multilineComments[mci += 1]
	end
}
code = (preprocessor + "\n" + code).gsub /^ +\n/, ''

puts code
__END__
    /* Hai Worldz. This code is to prevent formatting: if(this_code_is_touched){,then+your*program_"doesn't({work)}correctl"y.} */
#include<stdio.h>
#include<string.h>
int main() {
int i;
char s[99];
     printf("----------------------\n;;What is your name?;;\n----------------------\n\""); //Semicolon added in the {;} string just to annoy you
             /* Now we take the {;} input: */
    scanf("%s",s);
    for(i=0;i<strlen(s);i++){if(s[i]>='a'&&s[i]<='z'){
        s[i]-=('a'-'A'); //this is same as s[i]=s[i]-'a'+'A'
}}printf("Your \"name\" in upper case is:\n%s\n",s);
   return 0;}