# Generated by Django 3.2.7 on 2021-10-05 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CurrencyRate', '0002_alter_currency_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='currency',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
