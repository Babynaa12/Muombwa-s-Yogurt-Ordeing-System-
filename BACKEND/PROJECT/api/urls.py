from django import views
from django.urls import path,include
from MYAPP .views import *
from django.conf import settings
from django.conf.urls.static import static
from MYAPP.views import*
from rest_framework_simplejwt.views import ( # type: ignore
    TokenObtainPairView,  # For logging in
    TokenRefreshView,     # For refreshing the JWT token
)




urlpatterns = [
    # path('user/', manage_user),  
    # path('user/<int:id>/', manage_user),
     
# JWT authentication URLs
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Obtain JWT token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh JWT token
    
    # User-related URL
    # path('users/me/',views.curent_user , name='current_user'),  # Get current user info



    path('product/', manage_product),  
    path('product/<int:id>/', manage_product), 

    path('sale/', manage_sale),
    path('sale/<int:id>/', manage_sale),

    path('customer/', manage_customer),
    path('customer/<int:id>/', manage_customer),

    path('delivery/', manage_delivery),
    path('delivery/<int:id>/', manage_delivery),
  
    
]