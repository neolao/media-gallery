<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>{{ title }}</title>
        {% for url in stylesheet('default') %}
            <link rel="stylesheet" type="text/css" href="{{ url }}"/>
        {% endfor %}
    </head>
    <body>
        {% block body %}{% endblock %}
    </body>
</html>
