# Generated by Django 4.2.6 on 2023-10-16 23:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='airport',
            name='airport_code',
            field=models.CharField(max_length=3),
        ),
    ]
