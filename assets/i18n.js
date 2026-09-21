/* FatRab Yazılım — TR/EN dil desteği.
   Metinler HTML'de data-i18n / data-i18n-html / data-i18n-attr ile işaretlidir.
   Seçim localStorage'da saklanır; ilk ziyarette tarayıcı dili (tr* → TR) kullanılır.
   Dil değiştiğinde 'langchange' olayı yayılır (main.js sürüm metinlerini yeniden yazar). */

(function (global) {
  'use strict';

  var STORE_KEY = 'fatrab_lang';
  var DEFAULT_LANG = 'tr';

  var DICT = {
    tr: {
      docTitle: 'FatRab Yazılım',
      metaDesc: 'FatRab Yazılım — kişisel ve kurumsal bütçe takibi için masaüstü ve mobil uygulamalar. Verileriniz cihazınızda kalır.',
      brandSuffix: 'Yazılım',
      langLabel: 'Dil seçimi',

      navProducts: 'Ürünler',
      navFeatures: 'Özellikler',
      navBeta: 'Açık Beta',
      navDownload: 'İndir',
      navContact: 'İletişim',

      heroPill: 'Bağımsız yazılım stüdyosu',
      heroTitle: 'Paranızı yöneten yazılımlar,<br /><em>verinizi ele geçirmeden.</em>',
      heroLead: 'FatRab Yazılım; bütçe, nakit akışı ve muhasebe araçları geliştirir. Finansal kayıtlarınız varsayılan olarak cihazınızda şifreli durur — reklam yok, pazarlama analitiği yok, zorunlu hesap yok.',
      btnDownloadWin: 'Windows için indir',
      btnDownloadWinVer: 'Windows için indir (v{version})',
      artBudget: 'Aylık Bütçe',
      artCashflow: 'Nakit Akışı',

      stripPlatforms: 'platform',
      stripLangs: 'dil desteği',
      stripCrypto: 'yerel şifreleme',
      stripAds: 'reklam SDK',

      productsTitle: 'Ürünler',
      productsSub: 'Aynı finansal çekirdek, iki platform. İsterseniz kendi sunucunuz üzerinden eşitleyin.',

      deskName: 'FatRab Bütçe Takip — Masaüstü',
      deskKicker: 'Windows · Tauri tabanlı, hafif ve çevrimdışı',
      deskDesc: 'Genel muhasebe, envanter, mutabakat, portföy ve finansal tablolar. Kurumsal seviyede hesap planı ve raporlama; veriler bilgisayarınızdan çıkmaz.',
      deskTick1: 'Genel muhasebe defteri ve dönem kilidi',
      deskTick2: 'Envanter, mutabakat ve portföy modülleri',
      deskTick3: 'Kural motoru ile toplu yeniden kodlama',

      releaseLoading: 'Son sürüm getiriliyor…',
      releaseFallback: 'Son sürümü GitHub üzerinden indirin',
      releaseLine: 'Son sürüm v{version} · {date}',
      btnSetup: 'Kurulum (.exe)',
      btnMsi: 'MSI paketi',
      btnAllReleases: 'Tüm sürümler →',

      metaLoading: 'Son sürüm bilgisi yükleniyor…',
      metaVersion: 'Masaüstü sürüm <b>v{version}</b> — {date} tarihinde yayınlandı.',
      metaNotes: 'Sürüm notları →',
      metaFallbackPre: 'Son masaüstü sürümü için ',
      metaFallbackLink: 'GitHub Releases sayfasını',
      metaFallbackPost: ' açın.',

      mobName: 'FatRab Bütçe Takipçisi — Android',
      mobDesc: 'Günlük harcama girişi, bütçe uyarıları, borç ve ödeme planı, çoklu profil, QR veya Wi-Fi ile cihazdan cihaza yedek aktarımı. 40 dilde arayüz.',
      mobTick1: 'Şifreli yerel depolama (AES-256) ve PIN kilidi',
      mobTick2: 'Bildirim panelinden hızlı harcama girişi',
      mobTick3: 'Sesli dikte ve fiş fotoğrafından giriş',
      mobLive: 'Google Play’de yayında',
      btnOpenPlay: 'Google Play’de aç',
      btnJoinBetaShort: 'Açık betaya katıl →',

      featuresTitle: 'Neden FatRab?',
      featuresSub: 'Finansal yazılımda üç temel ilkemiz var: gizlilik, çevrimdışı çalışma, gerçek muhasebe.',
      f1t: 'Veri cihazda kalır',
      f1d: 'Kayıtlarınız şifreli olarak cihazınızda tutulur. Eşitleme isteğe bağlıdır ve kendi sunucunuza yapılır.',
      f2t: 'Çevrimdışı çalışır',
      f2d: 'İnternet olmadan da tam işlevsel. Bulut zorunluluğu yok, temel özellikler kilitli değil.',
      f3t: 'Ciddi muhasebe',
      f3d: 'Basit harcama listesinden fazlası: hesap planı, mutabakat, envanter ve finansal tablolar.',
      f4t: '40 dil, çoklu para birimi',
      f4d: 'Arayüz 40 dilde; döviz ve kripto kurlarıyla çoklu para birimi takibi.',
      f5t: 'Cihazlar arası aktarım',
      f5d: 'QR kod veya yerel Wi-Fi üzerinden doğrudan cihazdan cihaza yedek aktarımı.',
      f6t: 'Reklamsız',
      f6d: 'Reklam SDK’sı ve pazarlama analitiği yok. Yalnızca anonim çökme raporlaması.',

      betaPill: 'Açık Beta',
      betaTitle: 'Yeni sürümleri herkesten önce deneyin',
      betaSub: 'Açık beta programına katılın: geliştirme aşamasındaki özellikleri erken kullanın, geri bildiriminizle uygulamanın yönünü belirleyin. Katılım ücretsizdir ve istediğiniz zaman ayrılabilirsiniz.',
      betaTick1: 'Yayınlanmamış özelliklere erken erişim',
      betaTick2: 'Hata bildirimleriniz doğrudan geliştiriciye ulaşır',
      betaTick3: 'Formu doldurmanız yeterli, ek kurulum yok',
      btnJoinBeta: 'Beta başvuru formunu doldur',
      betaNote: 'Form Google Forms üzerinde açılır. Yalnızca iletişim ve cihaz bilgisi sorulur; finansal veriniz istenmez.',

      dlTitle: 'Hemen başlayın',
      dlSub: 'Masaüstü sürümü ücretsiz indirin, mobil uygulamayı Play Store’dan kurun.',
      dlFine: 'Windows 10/11 · 64-bit · yaklaşık 26 MB kurulum dosyası',

      contactTitle: 'İletişim',
      contactSub: 'Hata bildirimi, öneri ve iş birliği için yazın.',
      contactBugForm: 'Hata bildir',
      contactBugFormSub: 'Hata raporlama formu',
      contactFeatureForm: 'Özellik / Öneri iste',
      contactFeatureFormSub: 'Yeni özellik talep formu',
      contactMail: 'E-posta',
      contactBug: 'Hata bildir',
      contactBugSub: 'Masaüstü issue takibi',

      footBrand: 'FatRab Yazılım',
      footCopy: 'FatRab Yazılım · Tüm hakları saklıdır.',

      locale: 'tr-TR'
    },

    en: {
      docTitle: 'FatRab Software',
      metaDesc: 'FatRab Software — desktop and mobile apps for personal and business budgeting. Your data stays on your device.',
      brandSuffix: 'Software',
      langLabel: 'Language selection',

      navProducts: 'Products',
      navFeatures: 'Features',
      navBeta: 'Open Beta',
      navDownload: 'Download',
      navContact: 'Contact',

      heroPill: 'Independent software studio',
      heroTitle: 'Software that manages your money,<br /><em>without taking your data.</em>',
      heroLead: 'FatRab Software builds budgeting, cash-flow and accounting tools. Your financial records stay encrypted on your own device by default — no ads, no marketing analytics, no mandatory account.',
      btnDownloadWin: 'Download for Windows',
      btnDownloadWinVer: 'Download for Windows (v{version})',
      artBudget: 'Monthly Budget',
      artCashflow: 'Cash Flow',

      stripPlatforms: 'platforms',
      stripLangs: 'languages',
      stripCrypto: 'local encryption',
      stripAds: 'ad SDKs',

      productsTitle: 'Products',
      productsSub: 'One financial core, two platforms. Sync through your own server if you want to.',

      deskName: 'FatRab Budget Tracker — Desktop',
      deskKicker: 'Windows · Tauri based, lightweight and offline',
      deskDesc: 'General ledger, inventory, reconciliation, portfolio and financial statements. Business-grade chart of accounts and reporting; data never leaves your computer.',
      deskTick1: 'General ledger with period locking',
      deskTick2: 'Inventory, reconciliation and portfolio modules',
      deskTick3: 'Rule engine for bulk find-and-recode',

      releaseLoading: 'Fetching the latest release…',
      releaseFallback: 'Download the latest release from GitHub',
      releaseLine: 'Latest release v{version} · {date}',
      btnSetup: 'Installer (.exe)',
      btnMsi: 'MSI package',
      btnAllReleases: 'All releases →',

      metaLoading: 'Loading release information…',
      metaVersion: 'Desktop version <b>v{version}</b> — released on {date}.',
      metaNotes: 'Release notes →',
      metaFallbackPre: 'Open the ',
      metaFallbackLink: 'GitHub Releases page',
      metaFallbackPost: ' for the latest desktop build.',

      mobName: 'FatRab Budget Tracker — Android',
      mobDesc: 'Daily expense entry, budget alerts, debt and payoff plans, multiple profiles, device-to-device backup transfer over QR or Wi-Fi. Interface in 40 languages.',
      mobTick1: 'Encrypted local storage (AES-256) and PIN lock',
      mobTick2: 'Quick expense entry from the notification shade',
      mobTick3: 'Voice dictation and receipt photo input',
      mobLive: 'Live on Google Play',
      btnOpenPlay: 'Open in Google Play',
      btnJoinBetaShort: 'Join the open beta →',

      featuresTitle: 'Why FatRab?',
      featuresSub: 'Three principles drive our financial software: privacy, offline capability, real accounting.',
      f1t: 'Data stays on device',
      f1d: 'Your records are stored encrypted on your device. Syncing is optional and goes to your own server.',
      f2t: 'Works offline',
      f2d: 'Fully functional without internet. No cloud requirement, no core feature locked away.',
      f3t: 'Serious accounting',
      f3d: 'More than an expense list: chart of accounts, reconciliation, inventory and financial statements.',
      f4t: '40 languages, multi-currency',
      f4d: 'Interface in 40 languages; multi-currency tracking with FX and crypto rates.',
      f5t: 'Device-to-device transfer',
      f5d: 'Move your backup directly between devices over QR code or local Wi-Fi.',
      f6t: 'Ad-free',
      f6d: 'No ad SDKs and no marketing analytics. Anonymous crash reporting only.',

      betaPill: 'Open Beta',
      betaTitle: 'Try new releases before anyone else',
      betaSub: 'Join the open beta program: use features while they are still in development and shape the app with your feedback. Joining is free and you can leave at any time.',
      betaTick1: 'Early access to unreleased features',
      betaTick2: 'Your bug reports reach the developer directly',
      betaTick3: 'Just fill in the form — no extra setup',
      btnJoinBeta: 'Fill in the beta sign-up form',
      betaNote: 'The form opens on Google Forms. It only asks for contact and device details; your financial data is never requested.',

      dlTitle: 'Get started',
      dlSub: 'Download the desktop app for free, install the mobile app from the Play Store.',
      dlFine: 'Windows 10/11 · 64-bit · installer around 26 MB',

      contactTitle: 'Contact',
      contactSub: 'Get in touch for bug reports, suggestions and collaboration.',
      contactBugForm: 'Report a bug',
      contactBugFormSub: 'Bug reporting form',
      contactFeatureForm: 'Request a feature',
      contactFeatureFormSub: 'New feature request form',
      contactMail: 'E-mail',
      contactBug: 'Report a bug',
      contactBugSub: 'Desktop issue tracker',

      footBrand: 'FatRab Software',
      footCopy: 'FatRab Software · All rights reserved.',

      locale: 'en-US'
    }
  };

  function readStored() {
    try {
      var v = global.localStorage.getItem(STORE_KEY);
      return DICT[v] ? v : null;
    } catch (e) {
      return null;
    }
  }

  function store(lang) {
    try {
      global.localStorage.setItem(STORE_KEY, lang);
    } catch (e) { /* özel sekme / engelli depolama — sessizce geç */ }
  }

  function detect() {
    var nav = global.navigator || {};
    var list = nav.languages && nav.languages.length ? nav.languages : [nav.language || ''];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i]).toLowerCase();
      if (code.indexOf('tr') === 0) return 'tr';
      if (code.indexOf('en') === 0) return 'en';
    }
    return DEFAULT_LANG;
  }

  var current = readStored() || detect();

  function t(key, vars) {
    var pack = DICT[current] || DICT[DEFAULT_LANG];
    var out = pack[key];
    if (out === undefined) out = DICT[DEFAULT_LANG][key];
    if (out === undefined) return key;
    if (vars) {
      out = out.replace(/\{(\w+)\}/g, function (m, name) {
        return vars[name] !== undefined ? vars[name] : m;
      });
    }
    return out;
  }

  function apply() {
    var pack = DICT[current] || DICT[DEFAULT_LANG];
    document.documentElement.lang = current;
    document.title = pack.docTitle;

    var nodes = document.querySelectorAll('[data-i18n], [data-i18n-html]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var attr = el.getAttribute('data-i18n-attr');
      var htmlKey = el.getAttribute('data-i18n-html');
      var key = el.getAttribute('data-i18n');

      if (attr && key) {
        el.setAttribute(attr, t(key));
        continue;
      }
      if (htmlKey) {
        el.innerHTML = t(htmlKey);
        continue;
      }
      if (key) el.textContent = t(key);
    }

    var buttons = document.querySelectorAll('.lang-switch button');
    for (var j = 0; j < buttons.length; j++) {
      var active = buttons[j].getAttribute('data-lang') === current;
      buttons[j].className = active ? 'active' : '';
      buttons[j].setAttribute('aria-pressed', active ? 'true' : 'false');
    }

    document.dispatchEvent(new CustomEvent('langchange', { detail: current }));
  }

  function setLang(lang) {
    if (!DICT[lang] || lang === current) return;
    current = lang;
    store(lang);
    apply();
  }

  global.I18N = {
    t: t,
    apply: apply,
    setLang: setLang,
    get lang() { return current; },
    locale: function () { return t('locale'); }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.lang-switch button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (ev) {
        setLang(ev.currentTarget.getAttribute('data-lang'));
      });
    }
    apply();
  });
})(window);
