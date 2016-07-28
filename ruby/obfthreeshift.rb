$s='';class Module;def const_missing c

# MAGIC:
$s+="#{c}".split("#{$;}").map{|x|x.ord-8**2}.reduce(:"#{43.chr}").chr;end;end

              # My commentary ;)

ZZZY          # ?
YAYYY         # Oookay; you seem excited
Yaz           # Typo?
Yay           # Better
JEEEEEEF      # You misspelled Jeff's name
LAZZZY        # Yes, you are very lazy
Yax           # Another typo...
LLAMA         # Definitely not completely random at all...
EEEEEEEEEEEEE # Ouch my ears
IIIII         # Ouch stop
ASDFASDFASDF  # I SAID STOP BANGING ON THE KEYBOARD
YUMMY         # ... you eat keyboards?
IIIII         # Stop!
YUMMYY        # Why are you eating your keyboard
LLAMA         # That doesn't make sense :(
VV            # :(
LLAMA         # Could you stop saying that?!
CODEGOLF      # Yay, one of my favorite SE sites! :D
VW            # I don't drive
ASDFASDFASDF  # Why do you keep banging on your keyboard?!?!
EEEEEEEEEEEEE # No
VVV           # Stop
HELLOo        # ...it's a little late for a greeting, isn't it?
DOGS          # ...
OOOOOo        # No, you're not a ghost.
HELLOOOO      # Just a *bit* late.
NNNNNNN       # Huh?
LLAMA         # I said to stop.

print eval$s

#gets.tr'A-Za-z','C-ZABc-zab'