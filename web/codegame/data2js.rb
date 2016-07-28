data = open('data.txt').read
File.open('jsdata.txt', ?w) { |f|
  f.write(data.split("\n@@\n").each_slice(2).to_a.inspect)
}