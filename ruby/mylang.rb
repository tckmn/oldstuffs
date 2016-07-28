=begin

Stack-based, except there are multiple stacks
"switchstack" operator
Functions can be called with anonymous stacks

Charsets are:
[a-z]
[A-Z]
[0-9]
[\s]
{everything else}

Okay, so how to program.

123: push a number.
"foo": push a string. use \" to escape "
[100, "foo", ...]: push array
TODO switchstack
foo: call function. must be all lowercase OR allcaps. underscores are allowed.
TODO call function with anon stack
(foo ... ): define function
TODO if, while, for, etc.

=end

@stacks = {'s' => []}
@activeStack = @stacks['s']

@funcs = {}

def parse(program)
  puts "prog: #{program}"
  puts "begin: #{@funcs}"
  while true
    case program
    # number literal
    when /^([0-9]+)/
      puts $1
      @activeStack.push $1.to_i
      puts @funcs
    # string literal
    when /^"(.*?)(?<!\\)"/
      @activeStack.push $1
    # array literal
    when /^\[(.*?)\]/
      puts $1
    # whitespace
    when /^\s+/
      # no-op
    # function call
    when /^([a-z_]+|[A-Z_]+)/
      parse(@funcs[$1.downcase])
    # function definition
    when /^\(([a-z_]+|[A-Z_]+)(.*?)\)/
      @funcs[$1.downcase] = $2
    # switchstack
    when /^\$([a-z_]+)|$([A-Z_]+)/
      puts $1
    else
      # raise SyntaxError, "Syntax error at character #{programLength - program.length}"
      raise Exception, 'Generic error'
    end
    puts @funcs
    program.sub!($~[0], '')
    puts @funcs
    if program.length == 0
      # puts 'Program was interpreted successfully (took %.4f seconds)' % (Time.new - startTime)
      break
    end
  end
  puts "end: #{@funcs}"
end

parse(IO.readlines('mylang.mlg').join)