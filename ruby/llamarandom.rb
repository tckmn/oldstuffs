class LRand
  def rand
    @seed = (@seed * 0x5DEECE66D + 0xB) & ((1 << 48) - 1)
    @seed >>> (48 - bits)
  end
  def initialize seed
    @seed = (seed ^ 0x5DEECE66D) & ((1 << 48) - 1)
  end
end

r = LRand.new 319
puts r.rand