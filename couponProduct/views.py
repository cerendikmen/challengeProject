from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import *
from .serializers import ProductSerializer
from datetime import date


'''

There are 2 endpoints here. The first one called Discount checks 
(coupon, product_id, email) tuple and returns the reason if it is rejected 
or returns the discounted price otherwise. discountedPrice is a helper method
calculating the discounted price based on the coupon type, namely percentage or
cash. The second one called RecordPurchase records the successful purchase made and
checks for duplicate rows so if the purchase has already been recorded, it does not
saves it again.

'''
def discountedPrice(coupon_type, coupon_amount, product_price):
	if coupon_type == 'C':
		if(product_price - coupon_amount < 0):
			return 0;
		else:
			return product_price - coupon_amount
	else:
		return product_price - (product_price * coupon_amount)/100

class Discount(APIView):

	def post(self, request, format=None):
		coupon_code = request.data['coupon']
		product_id = request.data['product_id']
		email = request.data['email']
		response = {}


		if not Coupon.objects.filter(code = coupon_code).exists():
			response['result'] = False
			response['reason'] = 'Coupon does not exist.'
			return Response(response)

		if not Product.objects.filter(identifier = product_id).exists():
			response['result'] = False
			response['reason'] = 'Product does not exist.'
			return Response(response)

		coupon_used = Coupon.objects.get(code = coupon_code)
		coupons_used = Purchase.objects.filter(coupon = coupon_used)
		if coupons_used.exists():
			for coupon in coupons_used:
				if coupon.email == email:
					response['result'] = False
					response['reason'] = 'The coupon was already used by this e-mail.'
					return Response(response)

		if not Product.objects.get(identifier = product_id).coupons.filter(code = coupon_code).exists():
			response['result'] = False
			response['reason'] = 'The coupon is not applicable to this product.'
			return Response(response)

		coupon_valid_from = Coupon.objects.get(code = coupon_code).valid_from
		coupon_valid_until = Coupon.objects.get(code = coupon_code).valid_until
		if coupon_valid_from is not None:
			if date.today() < coupon_valid_from:
				response['result'] = False
				response['reason'] = 'The coupon is valid from ' + coupon_valid_from.strftime('%d-%m-%Y')
				return Response(response)

		if coupon_valid_until is not None:
			if date.today() > coupon_valid_until:
				passed_days = (date.today() - coupon_valid_until).days
				response['result'] = False
				if passed_days > 1:
					response['reason'] = 'The coupon expired by ' + str(passed_days) + ' days ago.'
					return Response(response)
				else:
					response['reason'] = 'The coupon expired yesterday.'
					return Response(response)

		couponType = Coupon.objects.get(code = coupon_code).coupon_type
		couponAmount = Coupon.objects.get(code = coupon_code).amount
		productPrice = Product.objects.get(identifier = product_id).price
		newPrice = discountedPrice(couponType, couponAmount, productPrice)

		response['result'] = True
		response['price'] = newPrice
		return Response(response)
		
class RecordPurchase(APIView):
	def post(self, request, format=None):
		coupon_code = request.data['coupon']
		product_id = request.data['product_id']
		email = request.data['email']
		response = {}
		
		coupon_used = Coupon.objects.get(code = coupon_code)
		product_used = Product.objects.get(identifier = product_id)

		newPurchase, isCreated = Purchase.objects.get_or_create(coupon = coupon_used, product = product_used, email = email)
		if isCreated:
			response['result'] = 'Success'
			response['reason'] = 'The purchase has just been recorded.'
			return Response(response)
		else:
			response['result'] = 'Fail'
			response['reason'] = 'There is already a purchase recorded.'
			return Response(response)
class ProductList(generics.ListCreateAPIView):
	"""
	API endpoint for listing and creating Product objects
	"""
	def get(self, request, product_id):
		product = Product.objects.get(identifier = product_id)
		serializer= ProductSerializer(product)
		return render(request, 'index.html', serializer.data)
	#queryset = Product.objects.all()
	#serializer_class = ProductSerializer
    







