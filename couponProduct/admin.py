from django.contrib import admin
from .models import *

# Models are registered and the admin page is customized.
class CouponAdmin(admin.ModelAdmin):
    list_display = ('code', 'coupon_type', 'amount', 'description',)
    search_fields = ('code', 'description',)
    list_filter = ('coupon_type','amount', 'valid_until',)
    ordering = ('-amount',)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('identifier', 'price', 'description',)
    search_fields = ('identifier', 'description',)
    list_filter = ('description', 'price',)
    ordering = ('price',)
    filter_horizontal = ('coupons',)

class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('couponCode', 'productId', 'email')

admin.site.register(Coupon, CouponAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Purchase, PurchaseAdmin)

