from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

import src.views

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', src.views.index, name='index'),
    url(r'^search/(?P<roomCode>.*)', src.views.search, name='search'),
    url(r'^getcount/(?P<roomCode>.*)', src.views.getcount, name='getcount'),
    url(r'^createroom/', src.views.createroom, name='createroom'),
    url(r'^addword/', src.views.addword, name='addword'),
    url(r'^getwords/(?P<roomCode>.*)', src.views.getwords, name='getwords'),
    # url(r'^admin/', include(admin.site.urls)),
]
