fname = ARGV[0]

raw = File.open(fname, &:read)



File.open(fname, 'w') { |f|
  f.write raw
}