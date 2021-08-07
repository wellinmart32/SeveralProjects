from django.http import HttpResponse

def greeting(request):
    return HttpResponse("Hi world, this is my first page!")