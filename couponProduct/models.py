from django.db import models
from datetime import date
from django.utils.crypto import get_random_string

'''

There are 3 models created. Coupon model for holding coupons, Product for products
and Purchase for successful purchases made.

'''

class Coupon(models.Model):
	PERCENTAGE = 'P'
	CASH = 'C'
	TYPE_CHOICES = (
		(PERCENTAGE, 'Percentage'),
		(CASH, 'Cash'),
	)
	coupon_type = models.CharField(max_length=1, choices=TYPE_CHOICES)
	amount = models.DecimalField(max_digits=8, decimal_places=2)
	code = models.CharField(max_length=6, unique=True, blank=True,
        help_text="Leaving this field empty will generate a random code.")
	description = models.CharField(max_length=100, blank=False)
	valid_from = models.DateField(blank=True, default=date.today)
	valid_until = models.DateField(blank=True, null=True)
	
	def save(self, *args, **kwargs):
         if not self.code:
              self.code = get_random_string(length=6)
         super(Coupon, self).save(*args, **kwargs)

	def __str__(self):
		return self.code

class Product(models.Model):
	identifier = models.CharField(max_length=50, unique=True, blank=False)
	price = models.DecimalField(max_digits=8, decimal_places=2)
	description = models.CharField(max_length=100, blank=False)
	features = models.TextField(max_length=500, blank=True)
	coupons = models.ManyToManyField(Coupon, blank=True)

	def __str__(self):
		return self.identifier

class Purchase(models.Model):
	coupon = models.ForeignKey(Coupon, on_delete = models.CASCADE,null=True)
	product = models.ForeignKey(Product, on_delete = models.CASCADE)
	email = models.EmailField("E-mail", help_text='A valid email address, please.')

	def __str__(self):
		return u'The product %s has been bought by %s' % (self.product.identifier, self.email)






