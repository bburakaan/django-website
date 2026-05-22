from django.shortcuts import render

from contact.models import GeneralSetting


DEFAULT_SETTINGS = {
    'site_title': 'Burak Kaan Ocak | CV App',
    'site_keywords': 'Burak Kaan Ocak, cv, portfolio, django, data engineering',
    'site_description': 'Burak Kaan Ocak icin kisisel CV, projeler ve iletisim sayfasi.',
    'home_banner_name': 'Burak Kaan Ocak',
    'home_banner_title': 'Information Systems Engineering Student',
    'home_banner_description': (
        'Data engineering ve real-time analytics odakli, Python, Java, '
        'JavaScript ve C ile proje ureten Bilgi Sistemleri Muhendisligi ogrencisi.'
    ),
    'about_myself_welcome': (
        'Piri Reis Universitesi Bilgi Sistemleri Muhendisligi ogrencisiyim. '
        'Veri muhendisligi, gercek zamanli analitik ve e-ticaret kullanici '
        'davranisi uzerine calisiyorum. Python, Java, JavaScript ve C ile '
        'uygulama gelistirirken SQL/NoSQL sistemleri ve streaming teknolojileri '
        'tarafinda temelimi guclendiriyorum.'
    ),
    'about_myself_footer': 'Staj, proje veya teknik is birligi icin ulasabilirsin.',
    'email': 'bburakaan@icloud.com',
    'phone': '+90 505 326 9261',
    'location': 'Istanbul, Turkey',
    'github': 'https://github.com/bburakaan',
    'linkedin': 'https://www.linkedin.com/in/burak-kaan-ocak-34a4212b6',
}


def get_general_setting(parameter):
    try:
        obj = GeneralSetting.objects.get(name=parameter).parameter
    except Exception:
        obj = ''
    return obj or DEFAULT_SETTINGS.get(parameter, '')


def get_home_context():
    site_title = get_general_setting('site_title')
    site_keywords = get_general_setting('site_keywords')
    site_description = get_general_setting('site_description')
    home_banner_name = get_general_setting('home_banner_name')
    home_banner_title = get_general_setting('home_banner_title')
    home_banner_description = get_general_setting('home_banner_description')
    about_myself_welcome = get_general_setting('about_myself_welcome')
    about_myself_footer = get_general_setting('about_myself_footer')
    email = get_general_setting('email')
    phone = get_general_setting('phone')
    location = get_general_setting('location')
    github = get_general_setting('github')
    linkedin = get_general_setting('linkedin')
    context = {
        'site_title': site_title,
        'site_keywords': site_keywords,
        'site_description': site_description,
        'home_banner_name': home_banner_name,
        'home_banner_title': home_banner_title,
        'home_banner_description': home_banner_description,
        'about_myself_welcome': about_myself_welcome,
        'about_myself_footer': about_myself_footer,
        'email': email,
        'phone': phone,
        'location': location,
        'github': github,
        'linkedin': linkedin,
        'skills': [
            {
                'group': 'Programming',
                'items': 'Python, Java, JavaScript, C',
                'detail': 'Algoritma, OOP, web gelistirme ve veri isleme temeli.',
            },
            {
                'group': 'Databases',
                'items': 'SQL, NoSQL, PostgreSQL',
                'detail': 'Veri modelleme, raporlama ve dashboard servis katmani.',
            },
            {
                'group': 'Data & Streaming',
                'items': 'Apache Kafka, Spark Streaming',
                'detail': 'Clickstream/event data icin near real-time analytics tasarimi.',
            },
            {
                'group': 'Tools',
                'items': 'Git, Linux',
                'detail': 'Versiyon kontrolu, terminal akisi ve temel sistem kullanimi.',
            },
        ],
        'projects': [
            {
                'tag': 'GRADUATION PROJECT',
                'title': 'Real-Time Data Processing Pipeline',
                'description': (
                    'E-ticaret kullanici davranisi icin click, pageview ve '
                    'add-to-cart eventlerini isleyen event-driven veri hatti.'
                ),
            },
            {
                'tag': 'DATA ANALYTICS',
                'title': 'Customer Purchase Behavior Analysis',
                'description': (
                    'Funnel ve cohort metrikleri uzerinden satin alma davranislarini '
                    'inceleyen sunum/arastirma calismasi.'
                ),
            },
            {
                'tag': 'DJANGO',
                'title': 'Personal CV App',
                'description': (
                    'Template, layout, static/media ve admin panel yapisiyla '
                    'hazirlanan profesyonel portfolyo uygulamasi.'
                ),
            },
        ],
        'education': {
            'school': 'Piri Reis University',
            'degree': 'B.Sc. Information Systems Engineering',
            'date': 'Oct 2022 - Present',
            'courses': (
                'Object-Oriented Programming, Web Development, Database Management '
                'Systems, Algorithms & Data Structures, Machine Learning'
            ),
        },
        'languages': 'Turkish: Native / English: B2-C1',
    }
    return context


def index(request):
    context = get_home_context()
    return render(request, 'index.html', context=context)


def contact(request):
    context = get_home_context()
    return render(request, 'contact.html', context=context)
