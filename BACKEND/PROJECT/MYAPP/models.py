from django.db import models

# Create your models here.

# class User(models.Model):
#     ROLE_CHOICES=[
#         ('Admin','Admin'),
#         ('User','User'),
#     ]
#     username=models.CharField(max_length=100,unique=True)
#     password=models.CharField(max_length=255)
#     role=models.CharField(max_length=10,choices=ROLE_CHOICES)
#     email=models.EmailField(blank=True,null=True)

    # def __str__(self):
    #     return self.username
    
class Order(models.Model):
    customer = models.ForeignKey('Customer',on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    order_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Pending')

    def __str__(self):
        return f"Order {self.id} - {self.customer.customerName}"

class Payment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    payment_date = models.DateField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=20, default='Pending')

    def __str__(self):
        return f"Payment {self.id} - Order {self.order.id}"
class Product(models.Model):
    productName=models.CharField(max_length=40)
    Category=models.CharField(max_length=50)
    price=models.DecimalField(max_digits=10, decimal_places=2)
    quantint=models.IntegerField()

    def __str__(self):
        return self.productName
    
class Customer(models.Model):
    customerName=models.CharField(max_length=30)
    customerNumber=models.CharField(max_length=10,blank=True,null=True)
    customerAddress=models.TextField(blank=True,null=True)
    
    def __str__(self):
        return self.customerName

class Sale(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    # user=models.ForeignKey(User,on_delete=models.CASCADE)
    totalPrice=models.DecimalField(max_digits=10,decimal_places=2)
    saleDate=models.DateField()

    def __str__(self):
        return f"Sale{self.id}-{self.product.productName}"
class DeliveryPerson(models.Model):
    DeliveryName=models.CharField(max_length=30)
    DeliveryNumber=models.CharField(max_length=10,blank=True,null=True)
    DeliveryAddress=models.TextField(blank=True,null=True)
    DeliveryEmail=models.EmailField(blank=True,null=True)
    DeliveryProduct=models.TextField()


    def __str__(self):
        return self.DeliveryName
    


        

