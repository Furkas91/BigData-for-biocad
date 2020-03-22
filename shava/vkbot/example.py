import vk_api.vk_api
from vk_api.bot_longpoll import VkBotLongPoll
from vk_api.bot_longpoll import VkBotEventType
import requests
from pprint import pprint
from vk_api.utils import get_random_id
import threading

from django.conf import settings
import django
settings.configure(DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'biocad',
        'USER': 'postgres',
        'PASSWORD': 'qwerty',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
})
django.setup()
from api.models import Measure, Ustavki, Log, Error
import time

id = 0

api_token = "a50bd84cbf5f11115065b2216289ed575ba0dfc68d417ea5d79e946e2a3a5a9bd65a6936a670ae494ea9a"
group_id = 193241126


class Server:

    def __init__(self, api_token, group_id, server_name: str = "Empty"):
        # Даем серверу имя
        self.server_name = server_name
        self.lock = threading.Lock()
        self.participants_id = list()
        self.get_participants_id()
        # Для Long Poll
        self.vk = vk_api.VkApi(token=api_token)

        # Для использования Long Poll API
        self.long_poll = VkBotLongPoll(self.vk, group_id)

        # Для вызова методов vk_api
        self.vk_api = self.vk.get_api()

    def send_msg(self, send_id, message):
        """
        Отправка сообщения через метод messages.send
        :param send_id: vk id пользователя, который получит сообщение
        :param message: содержимое отправляемого письма
        :return: None
        """
        self.vk_api.messages.send(peer_id=send_id,
                                  message=message,
                                  random_id=get_random_id())

    def add_participant(self, participant_id: int, ):
        with open("participants.txt", "w", newline="\n") as f:
            f.write(str(participant_id))
            self.participants_id.append(participant_id)

    def get_participants_id(self):
        with open("participants.txt", "r", newline="\n") as reader:
            for line in reader:
                self.participants_id.append(int(line))

    def test(self):
        # Посылаем сообщение пользователю с указанным ID
        self.send_msg(27209699, "ХЕХЕ")

    def send_messages_to_users(self, user_ids, message, random_id):
        with self.lock:
            self.vk_api.messages.send(user_ids=user_ids, message=message,
                                      random_id=random_id)


    def start(self):
        thread1 = threading.Thread(target=Server.message_reaction, args=(self,))
        thread2 = threading.Thread(target=Server.send_file_state, args=(self,))
        thread1.start()
        # thread1.join()
        thread2.start()
        thread1.join()

    def message_reaction(self):
        while True:
            for event in self.long_poll.listen():
                pprint(event)
                try:
                    if event.type == VkBotEventType.MESSAGE_NEW:
                        text: str = event.message["text"]
                        peer_id = event.object["message"]["peer_id"]
                        if text.replace(" ", "").split("!")[-1] == "add":
                            self.send_messages_to_users([peer_id],
                                                        "Теперь вы будете получать сообщения об обновлении файла",
                                                        get_random_id())
                            self.add_participant(event.object["from_id"])
                except requests.exceptions.ReadTimeout:
                    continue

    def send_file_state(self):
        #res = ""
        global id

        while True:
            """if изменение файла есть:
                res = получить строку об изменении"""
            log = Log.objects.latest('Time')
            if log.id != id:
                id = log.id
                res = log.Error
                self.send_messages_to_users(user_ids=self.participants_id, message=res, random_id=get_random_id())
            # res = "Blabla"
            # self.send_messages_to_users(user_ids=self.participants_id, message=res, random_id=get_random_id())


if __name__ == '__main__':
    server1 = Server(api_token, group_id,
                     "server1")
    # vk_api_token - API токен, который мы ранее создали
    # 172998024 - id сообщества-бота
    # "server1" - имя сервера
    server1.start()
