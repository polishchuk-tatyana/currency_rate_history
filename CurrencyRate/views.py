from decimal import Decimal
from .models import Currency  # including Currency model to use data in function "history"
from django.shortcuts import render, redirect
from .forms import AddRate  # including add_Rate form created in forms.py
import json


def history(request):
    # getting all objects from Currency model, getting values of fields for displaying on the chart and sorting by date
    chart = Currency.objects.all() \
        .values("date", "rateUAH") \
        .order_by("date")

    # getting last element to show last update on the page
    chart_item = Currency.objects.all().reverse()[len(chart) - 1]

    """
    generating data for chart
    """

    # creating lists for currency rate by date
    list_date = list()
    list_rate = list()

    # adding data in lists
    for currency in chart:
        list_date.append(currency["date"].strftime('%Y/%m/%d, %H:%M'))
        list_rate.append(float(currency["rateUAH"]))

    # creating dictionary with data lists
    chart_currency_rate = dict()
    chart_currency_rate["date"] = list_date
    chart_currency_rate["rateUAH"] = list_rate

    # checking if this request is of type 'POST' and validating the form
    if request.method == 'POST':

        # create form instance and fill with data from the request
        form = AddRate(request.POST or None)

        # validating the form
        if form.is_valid():
            # process the data in form.cleaned_data as required
            data = form.cleaned_data
            form.save()

            # redirect to the current page with updated data
            return redirect('http://127.0.0.1:8000')
    else:
        form = AddRate()

    # converting data from dictionary "chart" to type .json with type str
    data = json.dumps([{'rateUAH': el['rateUAH'], 'date': el['date']} for el in chart.values()], indent=4, sort_keys=True, default=str)

    # converting dictionary "chart_currency_rate" to type file .json
    chart_currency_rate = json.dumps(chart_currency_rate)

    # return object HttpResponse and render the template with Currency Rate data
    return render(request, 'pages/currency_rate_history.html', context={'json_chart': data, 'chart': chart, 'chart_currency_rate': chart_currency_rate, "chart_item": chart_item})
