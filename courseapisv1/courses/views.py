from rest_framework import viewsets, generics
from courses.models import Category, Course
from courses import serializers


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer
