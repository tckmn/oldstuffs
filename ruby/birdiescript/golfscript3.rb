class OstrichBlock
  attr_accessor :tokens

  @@OstrichMethods = {
    :~ => ->this{ this.exec }
  }
  def OstrichMethods; @@OstrichMethods; end
  def Ostrichto_s; @tokens.join; end
  def Ostrichto_b; @tokens != []; end

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
      # convert to array of tokens first
      @tokens = OstrichBlock.tokenize tokens
    else
      # TODO: use a better kind of exception (BlockException?)
      raise Exception.new 'Invalid argument to Block.initialize'
    end
  end

  def == x
    (x.is_a? OstrichBlock) && (@tokens == x.tokens)
  end
  alias eql? ==

  def exec
    blockDepth = 0 # for nesting blocks
    blockString = '' # a string of the current block
    assignNext = false # set to true when a : is found
    @tokens.each {|t|
      if blockDepth > 0
        # we're in a block
        case t[0]
        when ?{
          # nested block started
          blockDepth += 1
        when ?}
          # block was closed. check to see if any nested left, if not, push final block.
          blockDepth -= 1
          if blockDepth == 0
            $stack.push OstrichBlock.new(blockString)
          end
        end
        blockString += t
      elsif assignNext
        $vars[t.downcase.to_sym] = $stack.last
        assignNext = false
      else
        case t[0]
        when ?` # string
          $stack.push OstrichString.new t[1...-1].gsub(/\\(.)/){$1}
        when ?" # regex
          $stack.push OstrichRegex.new(t[1...-1])
        when ?0..?9 # number
          $stack.push OstrichNumber.new(t)
        when ?: # assignment
          assignNext = true
        when ?{ # block
          blockString = ''
          blockDepth = 1
        else # push variable or execute block/regex
          sym = t.downcase.to_sym
          v = $vars[sym]
          case v
          when Proc
            # function hardcoded as Ruby
            v[]
          when OstrichBlock
            v.exec
          when OstrichRegex
            # TODO: regex match
          when NilClass
            # not a global, search locals
            o = $stack.last
            # make sure the thing exists
            if o
              m = o.OstrichMethods[sym]
              # exec if local is found (do nothing if not found)
              if m
                $stack.pop
                m[o]
              end
            end
          else
            $stack.push v # it's a number, string, etc.
          end
        end
      end
    }
  end

  def to_s; @tokens.join; end
end

class OstrichNumber < BasicObject # cannot inherit from Rational, hacky 'method_missing' used instead
  @@OstrichMethods = {
    :~ => ->this{ $stack.push(-this) }
  }
  def OstrichMethods; @@OstrichMethods; end
  def Ostrichto_s; @rational.to_f.to_s; end # TODO integer output for integers
  def Ostrichto_b; @rational != 0; end

  def initialize *vals
    @rational = Rational(*vals)
  end

  # hackiness to act like a Rational
  def method_missing(name, *args, &block)
    @rational.send(name, *args, &block)
  end
end

class OstrichString < String
  @@OstrichMethods = {
    :~ => ->this{ OstrichBlock.new(this).exec }
  }
  def OstrichMethods; @@OstrichMethods; end
  def Ostrichto_s; self; end
  def Ostrichto_b; self != ''; end
end

class OstrichArray < Array
  @@OstrichMethods = {
    :~ => ->this{ $stack.concat this }
  }
  def OstrichMethods; @@OstrichMethods; end
  def Ostrichto_s; self.map(&:Ostrichto_s).join ''; end # TODO flags for different separators i.e. space
  def Ostrichto_b; self != []; end
end

class OstrichRegex < Regexp
  @@OstrichMethods = {
    :~ => ->this{  } # TODO regex match
  }
  def OstrichMethods; @@OstrichMethods; end
  def Ostrichto_s; self.inspect[1...-1]; end
  def Ostrichto_b; self != //; end
end

opts = ARGV.shift ARGV.size - 1 # TODO error on no file arg given
code = ARGF.read # TODO interactive mode
$stack = []
$vars = {
  :! => ->{ $stack.push !$stack.pop.Ostrichto_b },
  p: ->{ puts $stack.last.Ostrichto_s }
}

program = OstrichBlock.new code
program.exec
p $stack # temporary debugging, TODO better output