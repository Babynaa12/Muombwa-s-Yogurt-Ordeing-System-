from django.urls import path
from MYAPP import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('products/', views.get_and_post),
    path('products/<int:id/',views.Products),
    
]