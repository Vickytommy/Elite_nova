# Generated by Django 4.2.9 on 2024-01-21 07:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="Role",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="EliteNovaUser",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                ("company_name", models.CharField(max_length=255)),
                ("company_id", models.CharField(max_length=255)),
                ("employee_id", models.CharField(max_length=255)),
                ("employee_name", models.CharField(max_length=255)),
                ("employee_last_name", models.CharField(max_length=255)),
                ("employee_email", models.EmailField(max_length=254, unique=True)),
                ("phone_number", models.CharField(max_length=15)),
                ("password", models.CharField(max_length=255)),
                ("active", models.BooleanField(default=True)),
                ("registered_date", models.DateTimeField(auto_now_add=True)),
                (
                    "groups",
                    models.ManyToManyField(
                        related_name="elite_nova_user_groups", to="auth.group"
                    ),
                ),
                (
                    "role",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="super_admin.role",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        related_name="elite_nova_user_permissions", to="auth.permission"
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
