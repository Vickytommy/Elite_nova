# Generated by Django 4.2.9 on 2024-02-15 07:33

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("super_admin", "0026_ordertrack_type_of_reservation"),
    ]

    operations = [
        migrations.AddField(
            model_name="ordertrack",
            name="client_order_id",
            field=models.TextField(default="", max_length=100),
        ),
    ]
