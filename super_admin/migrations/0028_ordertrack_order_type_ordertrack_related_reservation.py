# Generated by Django 4.2.9 on 2024-02-15 09:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("super_admin", "0027_ordertrack_client_order_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="ordertrack",
            name="order_type",
            field=models.TextField(default="", max_length=20),
        ),
        migrations.AddField(
            model_name="ordertrack",
            name="related_reservation",
            field=models.BooleanField(default=0),
        ),
    ]