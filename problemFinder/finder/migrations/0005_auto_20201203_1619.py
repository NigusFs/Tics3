# Generated by Django 3.0.8 on 2020-12-03 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finder', '0004_judgesdaemon_running'),
    ]

    operations = [
        migrations.AlterField(
            model_name='problem',
            name='content',
            field=models.CharField(max_length=20000),
        ),
        migrations.AlterField(
            model_name='problem',
            name='title',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='testcase',
            name='input_data',
            field=models.CharField(max_length=2000),
        ),
        migrations.AlterField(
            model_name='testcase',
            name='output_data',
            field=models.CharField(max_length=2000),
        ),
    ]
