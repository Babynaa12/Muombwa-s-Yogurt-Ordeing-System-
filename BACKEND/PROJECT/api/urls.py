from django.urls import path,include
from MYAPP .views import api_view
from django.conf import settings
from django.conf.urls.static import static
from MYAPP.views import*

urlpatterns = [
    path('users/', manage_users),  
    path('users/<int:id>/', manage_users),
   

    path('products/', manage_products),  
    path('products/<int:id>/', manage_products), 

    path('sales/', manage_sales),
    path('sales/<int:id>/', manage_sales),

    path('customers/', manage_customers),
    path('customers<int:id>/', manage_customers),

    path('suppliers/', manage_suppliers),
    path('suppliers<int:id>/', manage_suppliers),

    
]