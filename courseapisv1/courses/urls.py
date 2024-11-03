from django.urls import path, include
from rest_framework.routers import DefaultRouter
from courses import views

r = DefaultRouter()
r.register('categories', views.CategoryViewSet, basename='category')

urlpatterns = [
    path('', include(r.urls))
]
