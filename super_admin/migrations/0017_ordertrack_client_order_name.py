# Generated by Django 4.2.9 on 2024-01-27 15:06

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        ("super_admin", "0016_ordertrack"),
    ]

    operations = [
        migrations.AddField(
            model_name="ordertrack",
            name="client_order_name",
            field=models.TextField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
