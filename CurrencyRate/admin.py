from django.contrib import admin
from .models import *  # import all models from file models

admin.site.register(Currency)  # registering a Currency model for display on the admin page
