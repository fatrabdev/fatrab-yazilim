# FatRab Yazılım — Kurumsal Web Sitesi

FatRab Yazılım'ın tanıtım sayfası. Statik (HTML + CSS + tek JS dosyası), derleme adımı yok.

## İçerik

| Dosya | Görevi |
| :--- | :--- |
| `index.html` | Tek sayfalık site (hero, ürünler, özellikler, indirme, iletişim) |
| `assets/style.css` | Tema (mobil uygulamanın mor paletinden türetildi), açık/koyu mod, responsive |
| `assets/main.js` | GitHub Releases API'sinden son masaüstü sürümünü çekip indirme bağlantılarını doldurur |
| `assets/i18n.js` | TR/EN sözlüğü ve dil değiştirici (seçim `localStorage`'da saklanır) |
| `assets/logo.png` | Uygulama ikonu (`mobil/assets/icon.png` kopyası) |
| `.nojekyll` | GitHub Pages'in Jekyll işlemesini atlaması için |

## Bağlantılar

- Masaüstü (Windows): https://github.com/kilicsizoglu/fatrab-budget-tracker-desktop/releases
- Mobil (Android): https://play.google.com/store/apps/details?id=com.fatrab.budget
- Açık beta başvuru formu: https://docs.google.com/forms/d/e/1FAIpQLSdx4En4NGD1e1rI2bEA-7ZLpeVcdIArWo70p9AQ0FSiqSCVsQ/viewform
- Yeni özellik / öneri formu: https://docs.google.com/forms/d/e/1FAIpQLSeCyH8qUixASzzMRZYIxHvt887_ABZfjRGThAh85l8Qr3lTRA/viewform
- Hata rapor formu: https://docs.google.com/forms/d/e/1FAIpQLSclJdZ0oVmXbocobGfJXwlkYn-q41plsSQivWcK3VAOW_1HDw/viewform

`assets/main.js` açılışta `api.github.com/repos/kilicsizoglu/fatrab-budget-tracker-desktop/releases/latest`
adresini sorgular; son sürüm numarasını, yayın tarihini ve `.exe` / `.msi` varlıklarının doğrudan
indirme bağlantılarını sayfaya yazar. API'ye ulaşılamazsa (saatlik istek limiti veya çevrimdışı)
bağlantılar HTML'de yazılı olan `/releases/latest` adresinde kalır — sayfa bozulmaz.

Yeni bir sürüm yayınlandığında bu depoda **hiçbir şey değiştirmeye gerek yoktur**; sayfa sürümü
her ziyarette canlı olarak okur.

## Dil desteği

Sayfa Türkçe ve İngilizce yayınlanır. İlk ziyarette tarayıcı dili kullanılır (`tr*` → TR,
diğerleri → EN); sağ üstteki TR/EN düğmesiyle değiştirilen seçim `localStorage`'da saklanır.
Yeni metin eklerken HTML'de `data-i18n="anahtar"` kullanın ve anahtarı `assets/i18n.js`
içindeki **hem `tr` hem `en`** sözlüğüne ekleyin; eksik anahtar otomatik olarak TR'ye düşer.

## Yerelde çalıştırma

```bash
python -m http.server 8000
# tarayıcıda http://localhost:8000
```

`file://` ile de açılır, ancak sürüm bilgisini çeken `fetch` isteği bazı tarayıcılarda
CORS nedeniyle engellenebilir; yerel sunucu tercih edin.

## GitHub Pages'te yayınlama

1. Bu klasörü bir GitHub deposuna yükleyin (ör. `kilicsizoglu/fatrab-yazilim`).
2. Depo → **Settings → Pages**.
3. **Source**: `Deploy from a branch`, **Branch**: `main` / `(root)`.
4. Bir iki dakika içinde site `https://kilicsizoglu.github.io/fatrab-yazilim/` adresinde yayına girer.

Alternatif olarak depodaki `.github/workflows/pages.yml` iş akışı, **Source: GitHub Actions**
seçildiğinde her `main` push'unda siteyi yayınlar.

Özel alan adı kullanacaksanız kök dizine alan adını içeren bir `CNAME` dosyası ekleyin.

## Lisans

© FatRab Yazılım. Tüm hakları saklıdır.
