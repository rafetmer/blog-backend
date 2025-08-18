# Blog API Backend

Bu proje, Node.js, Express, TypeScript ve Prisma kullanılarak geliştirilmiş, tam özellikli bir Blog API backend uygulamasıdır. JWT tabanlı kimlik doğrulama, katmanlı mimari ve temel CRUD işlemleri gibi modern backend prensiplerini içerir.

## ✨ Özellikler

-   **Katmanlı Mimari:** Kodun daha düzenli ve sürdürülebilir olması için Presentation (API), Business (Services) ve Data Access (Repositories) katmanlarına ayrılmıştır.
-   **Kimlik Doğrulama:** JWT (JSON Web Tokens) ile güvenli kullanıcı kaydı ve girişi.
-   **CRUD İşlemleri:** Kullanıcılar, Yazılar ve Kategoriler için tam Kapsamlı Oluşturma, Okuma, Güncelleme ve Silme (CRUD) işlemleri.
-   **ORM:** Veritabanı işlemleri için modern bir ORM olan Prisma kullanılmıştır.
-   **İlişkisel Veri Modeli:** Yazılar, kullanıcılar (yazarlar) ve kategoriler arasında ilişkiler kurulmuştur.

## 🛠️ Teknoloji Stack'i

| Teknoloji   | Açıklama                               |
| :---------- | :------------------------------------- |
| **Node.js** | Sunucu tarafı JavaScript çalışma ortamı  |
| **Express** | Hızlı ve minimalist web framework'ü      |
| **TypeScript**| JavaScript'in tipli bir üst kümesi     |
| **Prisma**  | Modern ORM (Veritabanı aracı)          |
| **PostgreSQL**| Güçlü, açık kaynaklı nesne-ilişkisel veritabanı sistemi (veya seçtiğiniz başka bir SQL DB) |
| **JWT**     | Güvenli kimlik doğrulama için JSON Web Tokens |
| **bcryptjs**| Şifre hash'leme kütüphanesi            |
| **dotenv**  | Ortam değişkenlerini yönetmek için     |

## 🚀 Kurulum ve Başlatma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/rafetmer/blog-backend.git
cd blog-backend
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın

Projenin ana dizininde `.env` adında bir dosya oluşturun ve aşağıdaki `.env.example` şablonunu kullanarak kendi bilgilerinizi girin.

**.env.example**
```env
# Veritabanı Bağlantı Bilgisi (PostgreSQL örneği)
DATABASE_URL="postgresql://KULLANICI_ADINIZ:SIFRENIZ@localhost:5432/VERITABANI_ADINIZ"

# JWT Gizli Anahtarı (Çok gizli ve karmaşık bir anahtar kullanın)
JWT_SECRET="YOUR_SUPER_SECRET_JWT_KEY"

# Sunucu Portu
PORT=3000
```

### 4. Veritabanı Şemasını Senkronize Edin

Prisma, `schema.prisma` dosyanıza göre veritabanı şemanızı güncelleyecektir.

```bash
npx prisma db push
```

### 5. Sunucuyu Başlatın

Uygulamayı geliştirme modunda başlatmak için:

```bash
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışmaya başlayacaktır.

## API Endpoints

Tüm endpoint'ler `/api` ön eki ile başlar. Korumalı rotalar, `Authorization: Bearer <TOKEN>` header'ı gerektirir.

---

### 🔑 Kimlik Doğrulama (`/api/auth`)

| Method | Endpoint         | Açıklama                  | Body Örneği                                                    |
| :----- | :--------------- | :------------------------ | :------------------------------------------------------------- |
| `POST` | `/register`      | Yeni kullanıcı kaydı yapar. | `{ "username": "user", "email": "user@mail.com", "password": "123" }` |
| `POST` | `/login`         | Giriş yapar ve JWT token döner. | `{ "username": "user", "password": "123" }`                      |

---

### 👤 Kullanıcılar (`/api/users`) - (Korumalı)

| Method   | Endpoint | Açıklama                               |
| :------- | :------- | :------------------------------------- |
| `GET`    | `/`      | Tüm kullanıcıları listeler.            |
| `GET`    | `/:id`   | Belirli bir kullanıcıyı getirir.       |
| `PUT`    | `/:id`   | Belirli bir kullanıcıyı günceller.     |
| `DELETE` | `/:id`   | Belirli bir kullanıcıyı siler.         |

---

### 📝 Yazılar (`/api/posts`) - (Korumalı)

| Method   | Endpoint | Açıklama                               | Body Örneği                                                              |
| :------- | :------- | :------------------------------------- | :----------------------------------------------------------------------- |
| `POST`   | `/`      | Yeni bir yazı oluşturur.               | `{ "title": "Başlık", "content": "İçerik", "author_id": 1, "category_id": 1 }` |
| `GET`    | `/`      | Tüm yazıları listeler.                 |                                                                          |
| `GET`    | `/:id`   | Belirli bir yazıyı getirir.            |                                                                          |
| `PUT`    | `/:id`   | Belirli bir yazıyı günceller.          | `{ "title": "Yeni Başlık", "content": "Yeni İçerik" }`                      |
| `DELETE` | `/:id`   | Belirli bir yazıyı siler.              |                                                                          |

---

### 📂 Kategoriler (`/api/categories`) - (Korumalı)

| Method   | Endpoint | Açıklama                               | Body Örneği                |
| :------- | :------- | :------------------------------------- | :------------------------- |
| `POST`   | `/`      | Yeni bir kategori oluşturur.           | `{ "name": "Teknoloji" }`    |
| `GET`    | `/`      | Tüm kategorileri listeler.             |                            |
| `GET`    | `/:id`   | Belirli bir kategoriyi getirir.        |                            |
| `PUT`    | `/:id`   | Belirli bir kategoriyi günceller.      | `{ "name": "Yeni Kategori" }` |
| `DELETE` | `/:id`   | Belirli bir kategoriyi siler.          |                            |

---
