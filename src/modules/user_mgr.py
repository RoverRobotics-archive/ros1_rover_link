from errors.errors import UserAlreadyInQueueError


class UserMgr:
    MAX_USERS = 1
    USERS = []

    @classmethod
    def remove(cls, user):
        try:
            index = cls.USERS.index(user)
            cls.USERS.pop(index)
        except ValueError as e:
            print(e)

    @classmethod
    def get_active_users(cls):
        return cls.USERS[:cls.MAX_USERS]

    @classmethod
    def add(cls, user):
        if user in cls.USERS:
            raise UserAlreadyInQueueError('user already queued')
        else:
            cls.USERS.append(user)
