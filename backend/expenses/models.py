from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    """A spending category, e.g. Food, Travel, Rent."""
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Expense(models.Model):
    """A single expense entry belonging to a logged-in user."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expenses')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='expenses')
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.title} - {self.amount}"
