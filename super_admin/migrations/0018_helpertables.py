# Generated by Django 4.2.9 on 2024-01-29 16:23

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("super_admin", "0017_ordertrack_client_order_name"),
    ]

    operations = [
        migrations.CreateModel(
            name="helperTables",
            fields=[
                (
                    "helper_table_id",
                    models.AutoField(primary_key=True, serialize=False),
                ),
                ("helper_data_helper_name", models.TextField()),
                ("helper_value_english", models.TextField()),
                ("helper_value_hebrew", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]