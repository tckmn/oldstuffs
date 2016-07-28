string = 'this is \\\\ a test'
puts(string.gsub(/\\(.)/){$1})