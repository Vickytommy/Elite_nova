# Generated by Django 4.2.9 on 2024-01-21 11:34

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("super_admin", "0005_alter_elitenovauser_employee_email"),
    ]

    operations = [
        migrations.AddField(
            model_name="elitenovauser",
            name="plain_password",
            field=models.CharField(default="", max_length=255),
        ),
    ]