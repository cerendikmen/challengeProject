from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^discount/', views.Discount.as_view()),
	url(r'^purchases/', views.RecordPurchase.as_view()),
	#url(r'^productList/', views.ProductList.as_view()),
	url(r'^(?P<product_id>[\w\-]+)/$', views.ProductList.as_view()),
	#url(r'^$',views.ProductList.as_view()),
]
	