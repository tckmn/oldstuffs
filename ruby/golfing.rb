=begin template

  --  --  ------
  --  --    --
  ------    --
  --  --    --
  --  --  ------

=end

begin #code


  h=  'h  '.chop
  i=  h+    ''
  i+='i'    #!
  f=  h+    i;
  s=  f;  puts s


rescue Exception => e
  puts e
  puts e.backtrace
end

gets