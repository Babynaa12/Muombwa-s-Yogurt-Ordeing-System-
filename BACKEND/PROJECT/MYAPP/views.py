from django.shortcuts import render
from .models import*
from .serializers import*
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# Create your views here.


#product
@api_view(["GET","POST"])
def get_and_post(request):
    if request.method=="GET":
        product = Products.objects.all()
        serializers=ProductsSerializers(product, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    elif request.method=="POST":
        serializers=ProductsSerializers(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET","PUT","DELETE"])
def api(request, id):
    try:
        product=Products.objects.get(id=id)
    except Products.DoesNotExist:
        return Response({"message": "ID not found"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ProductsSerializers(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method=='PUT':
        serializers=ProductsSerializers(product, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "DELETE":
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    



#user 
@api_view(["GET","POST"])
def get_and_post(request):
    if request.method=="GET":
        user = Products.objects.all()
        serializers=UsersSerializers(user, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    elif request.method=="POST":
        serializers=UsersSerializers(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET","PUT","DELETE"])
def api(request, id):
    try:
        user=Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response({"message": "ID not found"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = UsersSerializers(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method=='PUT':
        serializers=UsersSerializers(user, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "DELETE":
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#customer
@api_view(["GET","POST"])
def get_and_post(request):
    if request.method=="GET":
        customer = Customers.objects.all()
        serializers=CustomersSerializers(customer, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    elif request.method=="POST":
        serializers=CustomersSerializers(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET","PUT","DELETE"])
def api(request, id):
    try:
        customer=Customers.objects.get(id=id)
    except Customers.DoesNotExist:
        return Response({"message": "ID not found"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CustomersSerializers(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method=='PUT':
        serializers=CustomersSerializers(customer, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "DELETE":
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
#Sale
@api_view(["GET","POST"])
def get_and_post(request):
    if request.method=="GET":
        sale = Sales.objects.all()
        serializers=SalesSerializers(sale, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    elif request.method=="POST":
        serializers=SalesSerializers(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET","PUT","DELETE"])
def api(request, id):
    try:
        sale=Sales.objects.get(id=id)
    except Sales.DoesNotExist:
        return Response({"message": "ID not found"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = SalesSerializers(sale)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method=='PUT':
        serializers=SalesSerializers(sale, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "DELETE":
        sale.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
#Supplier
@api_view(["GET","POST"])
def get_and_post(request):
    if request.method=="GET":
        supplier = Supplier.objects.all()
        serializers=SuppliersSerializers(supplier, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    elif request.method=="POST":
        serializers=SuppliersSerializers(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET","PUT","DELETE"])
def api(request, id):
    try:
        supplier=Supplier.objects.get(id=id)
    except Supplier.DoesNotExist:
        return Response({"message": "ID not found"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = SuppliersSerializers(supplier)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method=='PUT':
        serializers=SuppliersSerializers(supplier, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "DELETE":
       supplier.delete()
       return Response(status=status.HTTP_204_NO_CONTENT)
    