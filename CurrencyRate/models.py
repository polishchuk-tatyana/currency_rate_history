from django.db import models


# creating a model for storing the currency rate for a specific date
class Currency(models.Model):
    rateUAH = models.CharField(max_length=9)  # column for storing currency rate Ukrainian Hryvnia
    date = models.DateTimeField()  # column for storing date, where currency rate was refreshed

    # object views function in admin page
    def __str__(self):
        day = str(self.date).split(' ')  # cutting the string to get only date
        return self.rateUAH + ', ' + str(day[0])
