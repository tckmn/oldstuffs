def ri x; return (rand*x).floor; end

print '> '
gets.chomp
(rand*10+15).floor.times do
puts [
%w[Hacking Controlling].sample + ' IP ' + (([0]*4).map{ri 255}.join '.'),
%w[Finding Calculating Deriving Analyzing].sample + ' ' + %w[hackable\ IPs formulas data].sample,
%w[Accessing Hacking\ into Searching\ for Analyzing].sample + ' ' + %w[databases IP\ addresses files].sample,
%w[Executing Activating].sample + ' ' + %w[algorithm function].sample + ' ' + (ri 10).to_s
].sample
sleep rand
end
puts 'Hacking successful!'