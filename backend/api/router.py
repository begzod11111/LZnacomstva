from rest_framework.routers import BaseRouter, Route


class CustomRouter(BaseRouter):
    def init(self):
        # Инициализируем роутер
        self.registry = []

    def register(self, prefix, viewset, base_name=None):
        # Регистрируем представление в роутере
        self.registry.append((prefix, viewset, base_name))

    def get_urls(self):
        # Получаем URL-пути для зарегистрированных представлений
        urls = []
        for prefix, viewset, base_name in self.registry:
            urls.extend(self.get_url_for_prefix(prefix, viewset, base_name))
        return urls

    def get_url_for_prefix(self, prefix, viewset, base_name):
        # Генерируем URL-пути для представления
        lookup = self.get_lookup_regex(viewset)
        url_path = f'^{prefix}/$'
        initkwargs = viewset.initkwargs.copy()
        initkwargs.update({'suffix': 'List'})
        url_name = base_name + '-list'
        ret = [
            Route(
                url=url_path,
                mapping={'get': 'list', 'post': 'create'},
                name=url_name,
                detail=False,
                initkwargs=initkwargs
            ),
        ]

        detail_url = f'^{prefix}/{{lookup}}/$'
        initkwargs = viewset.initkwargs.copy()
        initkwargs.update({'suffix': 'Instance'})
        detail_url_name = base_name + '-detail'
        ret.append(
            Route(
                url=detail_url,
                mapping={'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'},
                name=detail_url_name,
                detail=True,
                initkwargs=initkwargs
            ),
        )

        return ret

    def get_lookup_regex(self, viewset):
        # Получаем регулярное выражение для идентификатора объекта (lookup)
        lookup_field = getattr(viewset, 'lookup_field', 'pk')
        lookup_url_kwarg = getattr(viewset, 'lookup_url_kwarg', None) or lookup_field
        return f'(?P<{lookup_url_kwarg}>[^/]+)'
