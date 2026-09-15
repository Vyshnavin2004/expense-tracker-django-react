from django.db.models import Sum
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Category, Expense
from .serializers import CategorySerializer, ExpenseSerializer, RegisterSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """CRUD for expense categories. Read-only for all authenticated users
    would be a reasonable restriction in production; kept open here for simplicity."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class ExpenseViewSet(viewsets.ModelViewSet):
    """
    CRUD for expenses. Each user only ever sees and modifies their own data —
    enforced both in the queryset and at save time.
    Supports optional filtering: /api/expenses/?category=<id>&month=<1-12>&year=<yyyy>
    """
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Expense.objects.filter(user=self.request.user)

        category_id = self.request.query_params.get('category')
        if category_id:
            queryset = queryset.filter(category_id=category_id)

        month = self.request.query_params.get('month')
        if month:
            queryset = queryset.filter(date__month=month)

        year = self.request.query_params.get('year')
        if year:
            queryset = queryset.filter(date__year=year)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def expense_summary(request):
    """
    Returns the logged-in user's total spend and a per-category breakdown.
    Used by the React dashboard to render the summary cards/chart.
    """
    expenses = Expense.objects.filter(user=request.user)
    total = expenses.aggregate(total=Sum('amount'))['total'] or 0

    by_category = (
        expenses.values('category__name')
        .annotate(total=Sum('amount'))
        .order_by('-total')
    )

    return Response({
        'total': total,
        'by_category': [
            {'category': item['category__name'] or 'Uncategorized', 'total': item['total']}
            for item in by_category
        ],
    })


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register(request):
    """Public endpoint to create a new user account."""
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
