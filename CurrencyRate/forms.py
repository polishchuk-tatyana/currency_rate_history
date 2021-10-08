from django import forms  # including forms
from .models import Currency  # including Currency model to use data
from django.core.exceptions import ValidationError  # for showing message of entering wrong data
from django.utils.translation import ugettext_lazy as _
import datetime


# creating a form AddRate using by class ModelForm
class AddRate(forms.ModelForm):

    """
    we have two fields only in model and can write validation on Fields level
    it's function clean_date() and clean_rateUAH()
    """

    class Meta:
        model = Currency
        fields = ['rateUAH', 'date']

    def clean_date(self):
        date_passed = self.cleaned_data.get("date")

        """
        create comparing the days in database and day from the form
        """

        # creating list for all days from database
        days = []

        # iterating over all elements of date from database
        for day in Currency.objects.all():

            # split time (as type string) and rewrite in variable "day"
            day = str(day.date).split(' ')

            # adding all days from list "day" in list "days"
            days.append(day[0])

        # split day in entered value of date
        form_day = str(date_passed).split(" ")[0]

        # user can't enter day that is in database already, checking used by condition below
        if form_day in days:
            raise ValidationError(_('There is currency rate on this date already'))

        # user can't enter tomorrow date or later, checking used by condition below
        if date_passed > datetime.datetime.now():
            raise ValidationError(_('You can not enter tomorrow date'))

        # user has to enter date necessarily
        if not date_passed:
            raise ValidationError(_('The field is empty'))

        return date_passed

    def clean_rateUAH(self):
        rateUAH_passed = self.cleaned_data.get("rateUAH")

        # user has to enter rate with sign min = 9 and max = 9
        if len(rateUAH_passed) > 9 or len(rateUAH_passed) < 9:
            raise ValidationError(_('Recommended number of characters - 9'))

        # user has to enter rate necessarily
        if not rateUAH_passed:
            raise ValidationError(_('The field is empty'))

        return rateUAH_passed