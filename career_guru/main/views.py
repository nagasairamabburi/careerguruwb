from django.shortcuts import redirect, render
from django.http import HttpResponse

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        # Store email and password in session
        request.session['email'] = email
        request.session['password'] = password
        request.session.save()
        
        # Redirect to the exam page
        return redirect('exam')

    return render(request, 'login.html')


def exam_view(request):
    email = request.session['email']
    password = request.session['password']
        
    

    # Placeholder check: replace with actual Firebase authentication logic
    return render(request, 'exam.html', {'email': email, 'pass': password})

def invalid_credentials_view(request):
    return render(request, 'invalid_credentials.html')