str = " OOOOOO  OOOOOO  OOOOOO  OOOOOOO      OOOOOO   OOOOOO  OO      OOOOOOO
OO      OO    OO OO   OO OO          OO       OO    OO OO      OO
OO      OO    OO OO   OO OOOOO       OO   OOO OO    OO OO      OOOOO
OO      OO    OO OO   OO OO          OO    OO OO    OO OO      OO
 OOOOOO  OOOOOO  OOOOOO  OOOOOOO      OOOOOO   OOOOOO  OOOOOOO OO"
n = 3

str.split("\n").each {|s|
  n.times do
    s.chars.each {|c|
      print c * n
    }
    puts
  end
}