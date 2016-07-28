n=gets
l=%w[zero one two three four five six seven eight nine]
if n.to_i
$><<l[n[-3].to_i]<<l[n[-2].to_i]
else
$><<'NaN'
end
