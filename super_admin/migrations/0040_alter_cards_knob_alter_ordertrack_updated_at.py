# Generated by Django 4.2.9 on 2024-03-25 16:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("super_admin", "0039_alter_ordertrack_created_at_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cards",
            name="knob",
            field=models.ForeignKey(
                default="",
                on_delete=django.db.models.deletion.CASCADE,
                to="super_admin.knob",
            ),
        ),
        migrations.AlterField(
            model_name="ordertrack",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
    ]