from allauth.account.views import confirm_email

from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from core.views import robots_txt, notfound_page

from search import views as search_views
from wagtail.contrib.sitemaps.views import sitemap
from .api import api_router


urlpatterns = [
    url(r'^django-admin/', admin.site.urls),

    url(r'^admin/', include(wagtailadmin_urls)),

    url(r'^api/v1/rest-auth/', include('rest_auth.urls')),
    url(r'^api/v1/rest-auth/registration/',
        include('rest_auth.registration.urls')),
    url(r'^api/v1/account/', include('allauth.urls')),
    url(r'^api/v1/accounts-rest/registration/account-confirm-email/(?P<key>.+)/$',
        confirm_email, name='account_confirm_email'),

    url(r'^api/v1/cowork/', include("cowork.api.urls")),
    url(r'^api/v1/payments/', include('payments.api.urls')),

    url(r'^documents/', include(wagtaildocs_urls)),
    url(r'^search/$', search_views.search, name='search'),

    url(r'^api/', include('cms.rest.urls')),
    url(r'^api/v2/', api_router.urls),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

urlpatterns = urlpatterns + [
    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    url(r'^404', notfound_page),
    # url(r'^sitemap\.xml$', sitemap),
    # url(r'^robots\.txt$', robots_txt, name='robots'),
    # url(r"", include(wagtail_urls)),

    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    url(r"^pages/", include(wagtail_urls)),
]
