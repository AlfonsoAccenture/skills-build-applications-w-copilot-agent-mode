from django.core.management.base import BaseCommand

from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):

        User = get_user_model()
        # Borrar datos existentes
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Crear equipos
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Crear usuarios
        ironman = User.objects.create_user(username='ironman', email='ironman@marvel.com', password='1234', team='Marvel')
        captain = User.objects.create_user(username='captain', email='captain@marvel.com', password='1234', team='Marvel')
        batman = User.objects.create_user(username='batman', email='batman@dc.com', password='1234', team='DC')
        superman = User.objects.create_user(username='superman', email='superman@dc.com', password='1234', team='DC')

        # Crear actividades
        Activity.objects.create(user_email='ironman@marvel.com', type='run', duration=30, calories=300)
        Activity.objects.create(user_email='batman@dc.com', type='cycle', duration=45, calories=400)

        # Crear leaderboard
        Leaderboard.objects.create(user_email='ironman@marvel.com', points=100)
        Leaderboard.objects.create(user_email='batman@dc.com', points=90)

        # Crear workouts
        Workout.objects.create(name='Full Body', description='Entrenamiento completo', duration=60)
        Workout.objects.create(name='Cardio', description='Entrenamiento cardiovascular', duration=40)

        self.stdout.write(self.style.SUCCESS('octofit_db poblada con datos de prueba'))
