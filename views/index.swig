{% extends 'layout.swig' %}

{% block body %}
    <h1>Media gallery</h1>

    <ul>
    {% for media in medias %}
        <li>
            <a rel="medias" 
                {% if media.type === 'image' %}
                    class="media-image" 
                    href="{{ media.normalizedUrl }}" 
                {% elseif media.type === 'video' %}
                    class="media-video" 
                    href="{{ media.mp4Url }}" 
                    data-webm="{{ media.webmUrl }}" 
                {% endif %}
                title="{{ media.name }}">
                <img src="{{ media.thumbnailUrl }}" alt="{{ media.name }}"/>
            </a>
        </li>
    {% endfor %}
    </ul>

    <script type="text/javascript" src="{{ asset('@website:resources/javascripts/gallery.js') }}"></script>
{% endblock %}
