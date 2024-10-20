from django.contrib import admin
from courses.models import Category, Course, Lesson

admin.site.register(Category)
admin.site.register(Course)
admin.site.register(Lesson)
