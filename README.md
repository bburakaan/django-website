# Django Todo List Project

## Proje aciklamasi

Bu proje, Django ile hazirlanan teslim edilebilir bir web uygulamasidir. Mevcut calisan yapi; ana sayfa, iletisim sayfasi, admin paneli, statik dosyalar, media kullanimi ve template yapisi uzerinden ilerleyen kisisel CV/portfolio ekranlarini icerir.

Proje teslim ve GitHub kullanimi icin temizlenmis, `requirements.txt`, `.gitignore` ve kurulum adimlari standart hale getirilmistir.

## Kullanilan teknolojiler

- Python
- Django
- django-environ
- SQLite
- HTML
- CSS
- JavaScript
- Bootstrap

## Ozellikler

- Django template sistemi ile hazirlanmis ana sayfa.
- Iletisim sayfasi.
- Admin panelinden yonetilebilen genel ayarlar modeli.
- Statik CSS/JS dosyalari ile responsive ve modern arayuz.
- Media klasoru ile CV PDF ve profil gorseli kullanimi.
- Konsol benzeri etkilesimli alan.
- Lokal gelistirme icin `.env` destegi.

## Kurulum adimlari

Projeyi GitHub uzerinden indirmek icin:

```bash
git clone <repo-link>
cd <proje-klasoru>
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Windows'ta `python` komutu PATH uzerinde degilse ayni komutlar `py` ile de calistirilabilir:

```bash
py manage.py migrate
py manage.py runserver
```

Tarayicida acilacak adres:

```text
http://127.0.0.1:8000/
```

## Projeyi calistirma komutlari

Var olan proje klasorunde calistirmak icin:

```bash
cd C:\Users\bbura\PycharmProjects\BurakKaan_CV_Django
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Windows icin alternatif:

```bash
py manage.py migrate
py manage.py runserver
```

Sunucu calistiktan sonra:

```text
http://127.0.0.1:8000/
```

Admin panel:

```text
http://127.0.0.1:8000/admin/
```

## GitHub / versiyon kontrol aciklamasi

`.env`, `db.sqlite3`, `media/`, `staticfiles/`, sanal ortam klasorleri ve editor ayarlari `.gitignore` icinde tutulur. Bu sayede SECRET_KEY, DEBUG gibi lokal/gizli bilgiler GitHub'a yuklenmez.

Projeyi ilk kez GitHub'a gondermek icin:

```bash
git init
git branch -M main
git add .
git commit -m "Initial Django todo list project"
git remote add origin <repo-link>
git push -u origin main
```

Not: `.env` dosyasi GitHub'a eklenmez. Gerekirse `.env.example` dosyasindaki ornek degerler kullanilarak lokal `.env` dosyasi olusturulabilir.
