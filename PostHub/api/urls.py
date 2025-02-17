from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('post-list/', views.postList, name='post-list'),
    path('post-details/<str:pk>/', views.postDetails, name='post-details'),
    path('post-create/', views.createPost, name='post-create'),
    path('post-update/<str:pk>/', views.postUpdate, name='post-update'),
    path('post-delete/<str:pk>/', views.postDelete, name='post-delete'),
]
