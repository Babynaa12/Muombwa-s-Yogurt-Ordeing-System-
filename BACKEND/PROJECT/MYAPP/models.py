from django.db import models

# Create your models here.

class Users(models.Model):
    ROLE_CHOICES=[
        ('Admin','Admin'),
        ('User','User'),
    ]
    username=models.CharField(max_length=100,unique=True)
    password=models.CharField(max_length=255)
    role=models.CharField(max_length=10,choices=ROLE_CHOICES)
    email=models.EmailField(blank=True,null=True)

    def __str__(self):
        return self.username
    
class Products(models.Model):
    productName=models.CharField(max_length=40)
    Category=models.CharField(max_length=50)
    price=models.DecimalField(max_digits=10, decimal_places=2)
    quantint=models.IntegerField()

    def __str__(self):
        return self.productName
    
class Customers(models.Model):
    customerName=models.CharField(max_length=30)
    customerNumber=models.CharField(max_length=10,blank=True,null=True)
    customerAddress=models.TextField(blank=True,null=True)
    def __str__(self):
        return self.customerName

class Sales(models.Model):
    product=models.ForeignKey(Products,on_delete=models.CASCADE)
    customer=models.ForeignKey(Customers,on_delete=models.CASCADE)
    user=models.ForeignKey(Users,on_delete=models.CASCADE)
    totalPrice=models.DecimalField(max_digits=10,decimal_places=2)
    saleDate=models.DateField()

    def __str__(self):
        return f"Sale{self.id}-{self.product.productName}"
class Suppliers(models.Model):
    supplierName=models.CharField(max_length=30)
    supplierNumber=models.CharField(max_length=10,blank=True,null=True)
    supplierAddress=models.TextField(blank=True,null=True)
    supplierEmail=models.EmailField(blank=True,null=True)
    supplierProduct=models.TextField()
    def __str__(self):
        return self.supplierName
    


        

