#!/usr/bin/python3
"""
 Test cities access from a state
"""
from models import storage
from models.user import User
from models.collar import Collar
from models.pet import Pet

"""
 Objects creations
"""
user_1 = User(nickname="bryan", password="12345",
              email="1482@holbertonschool.com")
user_1.save()

pet_1 = Pet(user_id=user_1.id, name="Napa", race="labrador")
pet_1.save()

pet_2 = Pet(user_id=user_1.id, name="Napa", race="labrador")
pet_2.save()

collar_1 = Collar(user_id=user_1.id, pet_id=pet_1.id)
collar_1.save()
"""
 Verification
"""
print("Creacion de objetos exitosa")
