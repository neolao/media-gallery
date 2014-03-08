{% extends 'layout.swig' %}

{% block body %}
    <h1>Media gallery</h1>

    <ul>
    {% for media in medias %}
        <li>
            <a rel="medias" href="{{ media.normalizedUrl }}" 
                {% if media.type === 'image' %}
                class="media-image" 
                {% elseif media.type === 'video' %}
                class="media-video" 
                {% endif %}
                title="{{ media.name }}">
                <img src="{{ media.thumbnailUrl }}" alt="{{ media.name }}"/>
            </a>
        </li>
    {% endfor %}
    </ul>

    <script type="text/javascript" src="{{ asset('@website:resources/javascripts/gallery.js') }}"></script>
{% endblock %}
