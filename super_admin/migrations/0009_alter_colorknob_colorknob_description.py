# Generated by Django 4.2.9 on 2024-01-26 06:23

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("super_admin", "0008_colorknob"),
    ]

    operations = [
        migrations.AlterField(
            model_name="colorknob",
            name="colorknob_description",
            field=models.TextField(max_length=1024),
        ),
    ]