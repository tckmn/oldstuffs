=begin
require 'mechanize'

site, email, password = gets.split

agent = Mechanize.new
agent.agent.http.verify_mode = OpenSSL::SSL::VERIFY_NONE

login_form = agent.get('http://openid.stackexchange.com/account/login').forms.first
login_form.email = email
login_form.password = password
agent.submit login_form, login_form.buttons.first
puts 'logged in with SE openid'

site_login_form = agent.get(site + '/users/login').forms.find {|form| form.action == '/users/authenticate' }
site_login_form.openid_identifier = 'http://openid.stackexchange.com/'
agent.submit site_login_form, site_login_form.buttons.last
puts 'logged in to site'

loop {
	page = agent.get(site + '/questions')
	10.times do page = page.links.find{|link| link.href =~ /^\/questions\/\d/ }.click; end
	puts 'visited questions'
	sleep 60 * 60 * 24
}
=end

require'mechanize'
s,*e=gets.split
a,o=Mechanize.new,'http://openid.stackexchange.com/'
a.agent.http.verify_mode=OpenSSL::SSL::VERIFY_NONE
l=a.get(o+'account/login').forms[0]
l.email,l.password=e
a.submit l,l.buttons[0]
g=a.get(s+'/users/login').forms.find{|f|f.action=='/users/authenticate'}
g.openid_identifier=o
a.submit g,g.buttons[-1]
loop{p=a.get s+'/questions'
10.times{p=p.links.find{|i|i.href=~/^\/questions\/\d/}.click}
puts'visited'
sleep 86400}