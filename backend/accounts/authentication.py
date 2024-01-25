from .models import Account


class EmailAuthBackend:

    def authenticate(self, request, email=None, password=None):
        try:
            user = Account.objects.get(email=email)
            if user.check_password(password):
                return user
            return None
        except (Account.DoesNotExist, Account.MultipleObjectsReturned):
            return None

    def get_user(self, user_id):
        try:
            return Account.objects.get(pk=user_id)
        except Account.DoesNotExist:
            return None
