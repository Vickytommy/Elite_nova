# Generated by Django 4.2.9 on 2024-01-26 07:23

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("super_admin", "0010_knobmodel_alter_colorknob_colorknob_description"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="KnobModel",
            new_name="Knob",
        ),
    ]