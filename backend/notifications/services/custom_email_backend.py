import smtplib
from django.core.mail.backends.smtp import EmailBackend
import ssl

class CustomEmailBackend(EmailBackend):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.ssl_context = ssl.create_default_context()
        self.ssl_context.check_hostname = False
        self.ssl_context.verify_mode = ssl.CERT_NONE

    def send_messages(self, email_messages):
        with smtplib.SMTP(self.host, self.port) as server:
            server.starttls(context=self.ssl_context)
            server.login(self.username, self.password)
            return super().send_messages(email_messages)
