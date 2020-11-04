#!/usr/bin/python3
"""
 Test object creactions in database
"""
from models import storage
from models.user import User
from models.collar import Collar
from models.pet import Pet
from datetime import date
from models.picture import Picture

"""
 Objects creations
 User needs a nickname and auth_id to be created
 Pet needs a name and birthday to be created
"""


user_1 = User(nickname="bryan",
              email="1482@holbertonschool.com",
              auth_id="a0t14527", password="1234")
user_1.save()

pet_1 = Pet(user_id=user_1.id, name="Napa",
            race="labrador", birthday=date(2020, 9, 26),
            color="Yellow", specie="Perro", description="Cute new born")
pet_1.save()

pet_2 = Pet(user_id=user_1.id, name="firulais",
            race="labrador", birthday=date(2020, 10, 16))
pet_2.save()

collar_1 = Collar(user_id=user_1.id, pet_id=pet_1.id, numero_ref="1")
collar_1.save()

picture = Picture(pet_id=pet_1.id, name="firstpicture.jpg")
picture.save()


"""
 Verification
"""
print("Creacion de objetos exitosa")
