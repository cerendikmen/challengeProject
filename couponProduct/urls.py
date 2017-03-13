from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^check/', views.Discount.as_view()),
	url(r'^record/', views.RecordPurchase.as_view()),
	url(r'^(?P<product_id>[\w\-]+)/$', views.ProductList.as_view()),
]
	