require 'zlib'

class RBPNG
  def initialize
    # PNG header
    @data = [137, 80, 78, 71, 13, 10, 26, 10].pack 'C*'
  end

  def chunk name, data = ''
    @data += [data.length].pack 'N'
    @data += name
    @data += data
    @data += [Zlib::crc32(name + data)].pack 'N'
  end

  def IHDR opts = {}
    opts = {bit_depth: 8, color_type: 6, compression: 0, filter: 0, interlace: 0}.merge opts
    raise 'IHDR - Missing width param' if !opts[:width]
    raise 'IHDR - Missing height param' if !opts[:height]

    self.chunk 'IHDR', %w[width height].map {|x| [opts[x.to_sym]].pack 'N'}.join +
                       %w[bit_depth color_type compression filter interlace].map {|x| [opts[x.to_sym]].pack 'C'}.join
  end

  def IDAT data
    self.chunk 'IDAT', Zlib.deflate(data)
  end

  def IEND
    self.chunk 'IEND'
  end

  def write filename
    IO.binwrite filename, @data
  end
end

class PNG
  def render
    RBPNG.new
  end
end

class Color
  attr_accessor :r, :g, :b, :a

  def initialize r = 0, g = 0, b = 0, a = 255
    if r.is_a? Array
      @r, @g, @b, @a = @r
      @a = 255 if !@a
    else
      @r = r
      @g = g
      @b = b
      @a = a
    end
  end

  def hex
    '%02X' * 4 % [@r, @g, @b, @a]
  end

  def rgbhex
    '%02X' * 3 % [@r, @g, @b]
  end
end

r = RBPNG.new
r.IHDR({width: 300, height: 300, color_type: 2})
#r.IDAT ['00000000FFFFFF00FFFFFF000000'].pack 'H*'
data = Array.new(300){ Array.new(300){ Color.new 0, rand(100) + 155, 0 } }
r.IDAT [data.map {|x| '00' + x.map(&:rgbhex).join }.join].pack 'H*'
r.IEND
r.write 'rpng.png'