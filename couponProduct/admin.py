from django.contrib import admin
from django import forms
from .models import *

# Models are registered and the admin page is customized.

class CouponForm(forms.ModelForm):
    class Meta:
        model = Coupon
        fields = '__all__'

    def clean(self):
    	cleaned_data = super(CouponForm, self).clean()
    	start_date = self.cleaned_data.get('valid_from')
    	end_date = self.cleaned_data.get('valid_until')
    	if end_date is not None:
    		if start_date > end_date:
    			raise forms.ValidationError("Valid_from cannot be later than valid_until.")
    	return self.cleaned_data

class PurchaseForm(forms.ModelForm):
	class Meta:
		model = Purchase
		fields = '__all__'
	def clean(self):
		cleaned_data = super(PurchaseForm, self).clean()
		try:
			p = Purchase.objects.get(coupon = cleaned_data['coupon'] , product = cleaned_data['product'], email= cleaned_data['email'])
			raise forms.ValidationError('There is already a purchase recorded.')
		except Purchase.DoesNotExist:
			pass
		return cleaned_data

class CouponAdmin(admin.ModelAdmin):
	form = CouponForm
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
	form = PurchaseForm
	list_display = ('coupon', 'product', 'email')

admin.site.register(Coupon, CouponAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Purchase, PurchaseAdmin)

