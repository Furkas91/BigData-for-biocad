from django.db import models

class param(models.Model):
    caption = models.CharField(verbose_name='Caption', db_index=True, max_length=256)
    date = models.DateField(verbose_name='Date')
    source = models.URLField(verbose_name='Source', max_length=512)
