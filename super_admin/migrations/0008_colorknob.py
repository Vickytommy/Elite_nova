# Generated by Django 4.2.9 on 2024-01-26 05:49

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("super_admin", "0007_drawer"),
    ]

    operations = [
        migrations.CreateModel(
            name="ColorKnob",
            fields=[
                ("colorknob_id", models.AutoField(primary_key=True, serialize=False)),
                ("colorknob_barcode", models.CharField(max_length=255)),
                ("colorknob_description", models.CharField(max_length=1024)),
            ],
        ),
    ]