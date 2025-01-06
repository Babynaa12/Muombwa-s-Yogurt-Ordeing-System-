from rest_framework import serializers
from.models import *


class UsersSerializers(serializers.ModelSerializer):
    class Meta:
        model=Users
        fields='__all__'

class ProductsSerializers(serializers.ModelSerializer):
    class Meta:
        model=Products
        fields='__all__'


class CustomersSerializers(serializers.ModelSerializer):
    class Meta:
        model=Customers
        fields='__all__'


class SalesSerializers(serializers.ModelSerializer):
    class Meta:
        model=Sales
        fields='__all__'


class SuppliersSerializers(serializers.ModelSerializer):
    class Meta:
        model=Suppliers
        fields='__all__'
