from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

import src.views

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', src.views.index, name='index'),
    url(r'^db', src.views.db, name='db'),
    url(r'^admin/', include(admin.site.urls)),
]
