from rest_framework import serializers
from .models import Coupon, Product

class CouponSerializer(serializers.ModelSerializer):
	class Meta:
		model = Coupon
		fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Product
		fields = ('identifier', 'features','price')
