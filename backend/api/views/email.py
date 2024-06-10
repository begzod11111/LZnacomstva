from djoser.email import ActivationEmail


class CustomActivationEmail(ActivationEmail):
	template_name = "custom_activation_email.html"
