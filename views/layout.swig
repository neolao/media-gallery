<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

        <title>{{ title }}</title>

        <link rel="stylesheet" type="text/css" href="{{ asset('@website:resources/fancybox/jquery.fancybox.css') }}"/>
        <script type="text/javascript" src="{{ asset('@website:resources/javascripts/jquery-1.10.1.min.js') }}"></script>
        <script type="text/javascript" src="{{ asset('@website:resources/fancybox/jquery.fancybox.js') }}"></script>

        {% for url in stylesheet('default') %}
            <link rel="stylesheet" type="text/css" href="{{ url }}"/>
        {% endfor %}
    </head>
    <body>
        {% block body %}{% endblock %}
    </body>
</html>
