# challengeProject
**1.** Create a virtualenv `python3 -m venv /path/to/new/virtual/environment`

**2.** Activate the virtualenv `source ./venv/bin/activate`

**3.** Install all the dependencies `pip install -r requirements.txt`

**4.** Validate models `python manage.py check`

**5.** Tell Django that you have made some changes to your models `python manage.py makemigrations couponProduct`

**6.** At the first time, create the tables and later propagates changes you make to your models into your database schema

`python manage.py migrate`

**7.**  Start the Django development server `python manage.py runserver`
  
