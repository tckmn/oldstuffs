require 'mechanize'

class StackExchange
	def initialize sitename, email, password
		agent = Mechanize.new
		agent.agent.http.verify_mode = OpenSSL::SSL::VERIFY_NONE

		login_form = agent.get('https://openid.stackexchange.com/account/login').forms.first
		login_form.email = email
		login_form.password = password
		agent.submit login_form, login_form.buttons.first
		
		site_login_form = $agent.get('https://' + sitename + '/users/login').forms.last
		site_login_form.openid_identifier = 'https://openid.stackexchange.com/'
		agent.submit site_login_form, site_login_form.buttons.last
	end
end