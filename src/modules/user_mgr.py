from modules.user import User


class UserManager:
    MAX_USERS = 2
    USERS = []

    @classmethod
    def add_user(cls, user):
        if len(cls.USERS) < cls.MAX_USERS:
            cls.USERS.append(user)
        else:
            raise RuntimeError(f'Max user limit reached: {cls.MAX_USERS} / {len(cls.USERS)}')

    @classmethod
    def remove_user(cls, user):
        cls.USERS.remove(user)

    @staticmethod
    def create_user(alias):
        return User(alias)