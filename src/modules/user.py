import uuid

class User:
    def __init__(self, alias):
        self.id_ = uuid.uuid4()
        self.alias = alias
        self.active_session = False