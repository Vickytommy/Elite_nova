# Generated by Django 4.2.9 on 2024-05-20 18:49

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("super_admin", "0045_alter_cards_knob_position_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="collection",
            name="min_order",
            field=models.FloatField(),
        ),
    ]
