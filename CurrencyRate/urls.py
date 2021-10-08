from django.urls import path
from . import views

urlpatterns = [

    # creating url for our function view (immediately go to the data page, so didn't set value in the quotes)
    path('', views.history, name='history'),
]
