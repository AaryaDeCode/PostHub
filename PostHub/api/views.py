from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Post
from .serializers import PostSerializer

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/api/post-list/',
        'Details': '/api/post-details/<str:pk>/',
        'Create': '/api/post-create/',
        'Update': '/api/post-update/<str:pk>/',
        'Delete': '/api/post-delete/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def postList(request):
    posts = Post.objects.all().order_by('-created_at')  # Sorting by latest posts
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def postDetails(request, pk):
    post = get_object_or_404(Post, id=pk)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createPost(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['PUT'])  # Changed to PUT for updates
def postUpdate(request, pk):
    post = get_object_or_404(Post, id=pk)
    serializer = PostSerializer(instance=post, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def postDelete(request, pk):
    post = get_object_or_404(Post, id=pk)
    post.delete()
    return Response({"message": "Post successfully deleted."})
