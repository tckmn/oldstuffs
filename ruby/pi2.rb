require'bigdecimal';e=BigDecimal.new '2';i=2;g=gets.chomp.to_i;while i < g do
e+=BigDecimal.new(1)/BigDecimal.new((1..i).reduce(:*));i += 1;end;puts e;gets