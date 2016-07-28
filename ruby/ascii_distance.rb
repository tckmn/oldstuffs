def o
    Measurer.new 0
end
alias oo o

class Measurer
    attr_accessor :val, :bangs
    def initialize val, bangs = 0
        @val = val
        @bangs = bangs
    end

    # 1D
    def -@
        Measurer.new @val + 1, @bangs
    end
    def - x
        Measurer.new @val + x.val + 1, @bangs
    end

    # 2D
    def !@
        Measurer.new @val, @bangs + 1
    end

    def to_s
        (@val * (@bangs == 0 ? 1 : @bangs / 2)).to_s
    end
end

# 1D
puts oo      # 0
puts o-o     # 1
puts o--o    # 2
puts o---o   # 3
puts o----o  # 4
puts o-----o # 5

# 2D

puts((o---o
      !   !
      !   !
      !   !
      !   !
      !   !
      o---o)) # 15

puts((o------o
      !      !
      !      !
      !      !
      o------o)) # 18