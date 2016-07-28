# name: codegolfer?

class Block
  attr_accessor :tokens

  def self.tokenize code
    code.scan(/
      [a-z]+          # lowercase variable
     |[A-Z]+          # uppercase varaible
     |`(?:\\.|[^`])*` # string
     |"(?:\\.|[^"])*" # regex
     |[0-9]+\.?[0-9]* # number
                      # blocks are hardcoded into parsing
     |.               # other
   /mx)
  end

  def initialize tokens
    if tokens.is_a? Array
      @tokens = tokens
    elsif tokens.is_a? String
      @tokens = Block.tokenize tokens
    else
      raise Exception.new 'Invalid argument to Block.initialize'
    end
  end

  def == x
    (x.is_a? Block) && (@tokens == x.tokens)
  end
  alias eql? ==

  def exec
    blockDepth = 0
    blockString = ''
    assignNext = false
    @tokens.each {|t|
      if blockDepth > 0
        case t[0]
        when ?{
          blockDepth += 1
        when ?}
          blockDepth -= 1
          if blockDepth == 0
            $stack.push Block.new(blockString)
          end
        end
        blockString += t
      elsif assignNext
        $vars[t.downcase.to_sym] = $stack.last
        assignNext = false
      else
        case t[0]
        when ?`
          $stack.push t[1...-1].gsub(/\\(.)/){$1}
        when ?"
          $stack.push Regexp.new(t[1...-1])
        when ?0..?9
          $stack.push Rational(t)
        when ?:
          assignNext = true
        when ?{
          blockString = ''
          blockDepth = 1
        else
          v = $vars[t.downcase.to_sym]
          case v
          when Proc
            v[]
          when Block
            v.exec
          else
            $stack.push v if v
          end
        end
      end
    }
  end

  def to_s
    @tokens.join
  end
end

EMPTY_BLOCK = Block.new []
def bool x
  # ahh... everything here looks so nice
  # but at the end the big EMPTY_BLOCK ruins everything :(
  [0, //, [], '', EMPTY_BLOCK].include?(x) ? 1.to_r : 0.to_r
end

def uneval x
  case x
  when Block
    "{#{x}}"
  when String
    "`#{x}`"
  when Rational
    "#{x.numerator} #{x.denominator}/"
  when Regexp
    "\"#{x.inspect[1..-1]}\""
  end
end

def str x
  case x
  when Block
    x.to_s
  when String
    x
  when Rational
    x.denominator == 1 ? x.to_i : x.to_f
  when Regexp
    x.inspect[1..-1]
  end
end

code = '100.1\''
$stack = []
$vars = {
  :! => -> { $stack.push bool($stack.pop) },
  # " is regex literal
  # TODO #
  :'$' => -> {
    x = $stack.pop
    case x
    when Array
      $stack.push x.sort
    when Block
      # TODO sort by mapping
    when Regexp
      # TODO ???
    when String
      $stack.push x.split('').sort.join
    when Rational
      $stack.push $stack[-x.to_i]
    end
  },
  # TODO %
  # TODO &
  :'\'' => -> { $stack.push uneval($stack.pop) },
  :'(' => -> {
    x = $stack.pop
    case x
    when Array
      first = x.shift
      $stack.push x
      $stack.push first
    when Block
      # TODO ???
    when Regexp
      # TODO ???
    when String
      chars = x.split ''
      firstChar = chars.shift
      $stack.push chars.join
      $stack.push firstChar
    when Rational
      $stack.push x - 1
    end
  },
  :')' => -> {
    x = $stack.pop
    case x
    when Array
      last = x.pop
      $stack.push x
      $stack.push last
    when Block
      # TODO ???
    when Regexp
      # TODO ???
    when String
      chars = x.split ''
      lastChar = chars.pop
      $stack.push chars.join
      $stack.push lastChar
    when Rational
      $stack.push x + 1
    end
  },
  :* => -> {
    b, a = $stack.pop, $stack.pop
    if [a, b].any? {|x| x.is_a? Array}
      # TODO repeat for rational, join for string/array, fold for block, ??? for regex
    elsif [a, b].any? {|x| x.is_a? Block}
      # TODO repeat for rational, fold for string, ??? for block/regex
    elsif [a, b].any? {|x| x.is_a? Regexp}
      # TODO repeat for rational, join for string/regex
    elsif [a, b].any? {|x| x.is_a? String}
      # TODO repeat for rational, join for string
    elsif [a, b].any? {|x| x.is_a? Rational}
      $stack.push a * b
    end
  },
  :+ => -> {
    b, a = $stack.pop, $stack.pop
    if [a, b].any? {|x| x.is_a? Array}
      # TODO concat
    elsif [a, b].any? {|x| x.is_a? Block}
      atkn = a.tokens || Block.tokenize(uneval(a))
      btkn = b.tokens || Block.tokenize(uneval(b))
      $stack.push Block.new(atkn) + Block.new(btkn)
    elsif [a, b].any? {|x| x.is_a? Regexp}
      $stack.push Regexp.new(str(a) + str(b))
    elsif [a, b].any? {|x| x.is_a? String}
      $stack.push "#{str a}#{str b}"
    elsif [a, b].any? {|x| x.is_a? Rational}
      $stack.push a + b
    end
  },
  :',' => -> {
    x = $stack.pop
    case x
    when Array
      $stack.push x.size
    when Block
      # TODO select
    when Regexp
      # TODO ???
    when String
      $stack.push x.size
    when Rational
      $stack.push((x.to_i > 0 ? [*0...x.to_i] : [*x.to_i...0]).map {|n| Rational(n)})
    end
  },
  # -
  :'.' => -> { $stack.push $stack.last },
  # /
  # number literals
  # : is special-cased as assignment while parsing
  :';' => -> { $stack.pop },
  # <
  # =
  # >
  # ?
  :'@' => -> { $stack.push $stack.pop(3).rotate },
  # uppercase letters - variable names
  :'[' => -> {  },
  :'\\' => -> { $stack[-1], $stack[-2] = $stack[-2], $stack[-1] },
  # ]
  # ^
  # _
  # ` is string literal
  # lowercase letters - variable names
  # { is special-cased as block literal while parsing
  # |
  # } is speical-cased as block literal while parsing
  :~ => -> {
    x = $stack.pop
    $stack.push case x
    when Array
      # TODO dump elements
    when Block
      x.exec
    when String
      Block.new(x).exec
    when Rational
      -x
    when Regexp
      # TODO regex match
      x
    end
  },
}

program = Block.new code
program.exec
puts $stack