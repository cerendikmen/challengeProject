from rest_framework import serializers
from .models import Coupon, Product

class CouponSerializer(serializers.ModelSerializer):
	class Meta:
		model = Coupon

class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Product
