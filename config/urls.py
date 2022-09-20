from django.urls import include, re_path
from django.contrib import admin
admin.autodiscover()

import src.views

# Examples:
# re_path(r'^$', 'gettingstarted.views.home', name='home'),
# re_path(r'^blog/', include('blog.urls')),

urlpatterns = [
    re_path(r'^$', src.views.index, name='index'),
    re_path(r'^search/(?P<roomCode>.*)', src.views.search, name='search'),
    re_path(r'^getcount/(?P<roomCode>.*)', src.views.getcount, name='getcount'),
    re_path(r'^createroom/', src.views.createroom, name='createroom'),
    re_path(r'^addword/', src.views.addword, name='addword'),
    re_path(r'^getwords/(?P<roomCode>.*)', src.views.getwords, name='getwords'),
    # re_path(r'^admin/', include(admin.site.urls)),
]
