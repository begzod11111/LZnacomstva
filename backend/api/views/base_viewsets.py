from rest_framework.viewsets import GenericViewSet


class BaseViewSet(GenericViewSet):

	def get_serializer(self, *args, **kwargs):
		serializer_class = self.get_serializer_class()
		kwargs.setdefault('context', self.get_serializer_context())
		kwargs.setdefault('dynamic_fields', self.get_serializer_fields())
		kwargs.setdefault('dynamic_relations', self.get_serializer_relations())
		return serializer_class(*args, **kwargs)

	def get_serializer_fields(self):
		"""
		Returns a tuple of fields to use for serializes
		"""
		pass

	def get_serializer_relations(self):
		"""
		Returns a dict of relations to serializes
		"""
		pass
