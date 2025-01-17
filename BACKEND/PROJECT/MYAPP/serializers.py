from rest_framework import serializers
from.models import *


# class UsersSerializers(serializers.ModelSerializer):
#     class Meta:
#         model=User
#         fields='__all__'

class ProductsSerializers(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'


class CustomersSerializers(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields='__all__'


class SalesSerializers(serializers.ModelSerializer):
    class Meta:
        model=Sale
        fields='__all__'


class DeliverySerializers(serializers.ModelSerializer):
    class Meta:
        model=DeliveryPerson
        fields='__all__'

class OrdersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class PaymentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'