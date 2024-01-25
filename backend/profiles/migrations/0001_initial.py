# Generated by Django 4.2.6 on 2024-01-21 07:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.IntegerField(blank=True, null=True)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('eye_color', models.CharField(choices=[('Not Answer', 'Предпочитаю не отвечать'), ('Blue', 'Синий'), ('Black', 'Черный'), ('White', 'Белый')], db_index=True, default='Not Answer', max_length=10)),
                ('hair_color', models.CharField(choices=[('Not Answer', 'Предпочитаю не отвечать'), ('Blue', 'Синий'), ('Black', 'Черный'), ('White', 'Белый')], db_index=True, default='Not Answer', max_length=10)),
                ('height', models.PositiveIntegerField(blank=True, null=True)),
                ('weight', models.PositiveIntegerField(blank=True, null=True)),
                ('about_me', models.TextField(blank=True, null=True)),
                ('PurposeOfDating', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.goalmeeting')),
                ('country', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='profiles', to='api.country')),
                ('gender', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.gender')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
