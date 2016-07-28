/^(\d+)?d(\d+)(\+\d+)?$/.match gets
abort'Invalid input'if !$~||$1==?0||!$2||$2==?0
p eval(([0]*($1||1).to_i).map{rand($2.to_i)+1}*?+)+($3||0).to_i