=begin
procedure gnomeSort(a[])
    pos := 1
    while pos < length(a)
        if (a[pos] >= a[pos-1])
            pos := pos + 1
        else
            swap a[pos] and a[pos-1]
            if (pos > 1)
                pos := pos - 1
            end if
        end if
    end while
end procedure
=end

a=gets.scan /\w+/
p=1
while a[p]
a[p]>a[p-1]?p+=2:(a[p],a[p-1]=a[p-1],a[p])
p-=1if p>1
end
$><<a*?,