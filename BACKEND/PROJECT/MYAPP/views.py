from django.shortcuts import get_list_or_404
from .models import*
from rest_framework.permissions import IsAuthenticated
from .serializers import*
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.views import View
from django.http import JsonResponse
import json


# Create your views here.


# #product
# @api_view(["GET","POST"])
# def get_and_post(request):
#     if request.method=="GET":
#         product = Products.objects.all()
#         serializers=ProductsSerializers(product, many=True)
#         return Response(serializers.data, status=status.HTTP_200_OK)
#     elif request.method=="POST":
#         serializers=ProductsSerializers(data=request.data)
#         if serializers.is_valid():
#             serializers.save()
#             return Response(serializers.data, status = status.HTTP_201_CREATED)
#         else:
#             return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(["GET","PUT","DELETE"])
# def api(request, id):
#     try:
#         product=Products.objects.get(id=id)
#     except Products.DoesNotExist:
#         return Response({"message": "ID not found"}, status=status.HTTP_404_NOT_FOUND)
#     if request.method == 'GET':
#         serializer = ProductsSerializers(product)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     if request.method=='PUT':
#         serializers=ProductsSerializers(product, data=request.data)
#         if serializers.is_valid():
#             serializers.save()
#             return Response(serializers.data, status = status.HTTP_201_CREATED)
#         else:
#             return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     if request.method == "DELETE":
#         product.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    

class UsersViewSet(viewsets.ModelViewSet):
    queryset=Users.objects.all()
    serializer_class=UsersSerializers

class ProductsViewSet(viewsets.ModelViewSet):
    queryset=Products.objects.all()
    serializer_class=ProductsSerializers


class CustomersViewSet(viewsets.ModelViewSet):
    queryset=Customers.objects.all()
    serializer_class=CustomersSerializers

class SalesViewSet(viewsets.ModelViewSet):
    queryset=Sales.objects.all()
    serializer_class=SalesSerializers

class SupplierViewSet(viewsets.ModelViewSet):
    queryset=Suppliers.objects.all()
    serializer_class=SuppliersSerializers


    

@permission_classes([IsAuthenticated])
def generic_api(model_class, serializer_class):
    @api_view(['GET', 'POST', 'PUT','DELETE'])
    def api(request, id=None):
        #for GET
        if request.method == 'GET':
            if id:
                try:
                    instance=model_class.objects.get(id=id)
                    serializer= serializer_class(instance)
                    return Response(serializer.data)
                except model_class.DoesNotExist:
                    return Response({'message': 'object not found'},status=404)
            else:
                instances=model_class.objects.all()
                serializer=serializer_class(instances, many=True)
                return Response(serializer.data)
         #for Insert   
        elif request.method == 'POST':
            serializer=serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
        #for Update
        elif request.method == 'PUT':
            if id:
                try:
                    instance=model_class.objects.get(id=id)
                    serializer=serializer_class(instance, data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data)
                    return Response(serializer.errors, status=400)
                except model_class.DoesNotExist:
                    return JsonResponse({'message': 'object not found'},status=404)
            return Response({'message': 'id is required for update'}, status=400)
        # for Delete
        elif request.method == 'DELETE':
            if id:
                try:
                    instance = model_class.objects.get(id=id)
                    instance.delete()
                    return Response({'message': 'Deleted successfully'}, status=204)
                except model_class.DoesNotExist:
                    return JsonResponse({'message': 'Object not found'}, status=404)
            return Response({'message': 'ID is required for deletion'}, status=400)

        return JsonResponse({'message': 'Invalid method'}, status=405)

    return api

# API views for Student record system
manage_users = generic_api(Users, UsersSerializers)
manage_products = generic_api(Products, ProductsSerializers)
manage_customers = generic_api(Customers, CustomersSerializers)    
manage_sales= generic_api(Sales, SalesSerializers)    
manage_suppliers = generic_api(Suppliers, SuppliersSerializers)  



# #user 
# @api_view(["GET","POST"])
# def get_and_post(request):
#     if request.method=="GET":
#         user = Products.objects.all()
#         serializers=UsersSerializers(user, many=True)
#         return Response(serializers.data, status=status.HTTP_200_OK)
#     elif request.method=="POST":
#         serializers=UsersSerializers(data=request.data)
#         if serializers.is_valid():
#             serializers.save()
#             return Response(serializers.data, status = status.HTTP_201_CREATED)
#         else:
#             return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(["GET","PUT","DELETE"])
# def api(request, id):
#     try:
#         user=Users.objects.get(id=id)
#     except Users.DoesNotExist:
#         return Response({"message": "ID not found"}, status=status.HTTP_404_NOT_FOUND)
#     if request.method == 'GET':
#         serializer = UsersSerializers(user)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     if request.method=='PUT':
#         serializers=UsersSerializers(user, data=request.data)
#         if serializers.is_valid():
#             serializers.save()
#             return Response(serializers.data, status = status.HTTP_201_CREATED)
#         else:
#             return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     if request.method == "DELETE":
#         user.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# #customer
# @api_view(["GET","POST"])
# def get_and_post(request):
#     if request.method=="GET":
#         customer = Customers.objects.all()
#         serializers=CustomersSerializers(customer, many=True)
#         return Response(serializers.data, status=status.HTTP_200_OK)
#     elif request.method=="POST":
#         serializers=CustomersSerializers(data=request.data)
#         if serializers.is_valid():
#             serializers.save()
#             return Response(serializers.data, status = status.HTTP_201_CREATED)
#         else:
#             return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(["GET","PUT","DELETE"])
# def api(request, id):
#     try:
#         customer=Customers.objects.get(id=id)
#     except Customers.DoesNotExist:
#         return Response({"message": "ID not found"}, status=status.HTTP_404_NOT_FOUND)
#     if request.method == 'GET':
#         serializer = CustomersSerializers(customer)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     if request.method=='PUT':
#         serializers=CustomersSerializers(customer, data=request.data)
#         if serializers.is_valid():
#             serializers.save()
#             return Response(serializers.data, status = status.HTTP_201_CREATED)
#         else:
#             return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     if request.method == "DELETE":
#         customer.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
# #Sale
# @api_view(["GET","POST"])
# def get_and_post(request):
#     if request.method=="GET":
#         sale = Sales.objects.all()
#         serializers=SalesSerializers(sale, many=True)
#         return Response(serializers.data, status=status.HTTP_200_OK)
#     elif request.method=="POST":
#         serializers=SalesSerializers(data=request.data)
#         if serializers.is_valid():
#             serializers.save()
#             return Response(serializers.data, status = status.HTTP_201_CREATED)
#         else:
#             return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(["GET","PUT","DELETE"])
# def api(request, id):
#     try:
#         sale=Sales.objects.get(id=id)
#     except Sales.DoesNotExist:
#         return Response({"message": "ID not found"}, status=status.HTTP_404_NOT_FOUND)
#     if request.method == 'GET':
#         serializer = SalesSerializers(sale)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     if request.method=='PUT':
#         serializers=SalesSerializers(sale, data=request.data)
#         if serializers.is_valid():
#             serializers.save()
#             return Response(serializers.data, status = status.HTTP_201_CREATED)
#         else:
#             return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     if request.method == "DELETE":
#         sale.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    
# #Supplier
# @api_view(["GET","POST"])
# def get_and_post(request):
#     if request.method=="GET":
#         supplier = Supplier.objects.all()
#         serializers=SuppliersSerializers(supplier, many=True)
#         return Response(serializers.data, status=status.HTTP_200_OK)
#     elif request.method=="POST":
#         serializers=SuppliersSerializers(data=request.data)
#         if serializers.is_valid():
#             serializers.save()
#             return Response(serializers.data, status = status.HTTP_201_CREATED)
#         else:
#             return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(["GET","PUT","DELETE"])
# def api(request, id):
#     try:
#         supplier=Supplier.objects.get(id=id)
#     except Supplier.DoesNotExist:
#         return Response({"message": "ID not found"}, status=status.HTTP_404_NOT_FOUND)
#     if request.method == 'GET':
#         serializer = SuppliersSerializers(supplier)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     if request.method=='PUT':
#         serializers=SuppliersSerializers(supplier, data=request.data)
#         if serializers.is_valid():
#             serializers.save()
#             return Response(serializers.data, status = status.HTTP_201_CREATED)
#         else:
#             return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     if request.method == "DELETE":
#        supplier.delete()
#        return Response(status=status.HTTP_204_NO_CONTENT)
    