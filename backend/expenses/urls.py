from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ExpenseViewSet, expense_summary, register

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('expenses', ExpenseViewSet, basename='expense')

urlpatterns = [
    path('', include(router.urls)),
    path('summary/', expense_summary, name='expense-summary'),
    path('register/', register, name='register'),
]
