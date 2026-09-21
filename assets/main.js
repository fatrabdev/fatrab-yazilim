/* FatRab Yazılım — son masaüstü sürümünü GitHub Releases API'sinden çeker.
   Metinler i18n.js üzerinden gelir; dil değiştiğinde ('langchange') sürüm
   satırları da yeniden çizilir. API erişilemezse (rate limit, çevrimdışı)
   HTML'deki varsayılan /releases/latest bağlantıları kalır — sayfa çalışmaya devam eder. */

(function () {
  'use strict';

  var REPO = 'kilicsizoglu/fatrab-budget-tracker-desktop';
  var LATEST_PAGE = 'https://github.com/' + REPO + '/releases/latest';

  var state = { status: 'loading', release: null, setup: null, msi: null };

  function el(id) { return document.getElementById(id); }

  function mb(bytes) {
    var value = (bytes / 1048576).toFixed(1);
    return (I18N.lang === 'tr' ? value.replace('.', ',') : value) + ' MB';
  }

  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleDateString(I18N.locale(), { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      return '';
    }
  }

  function pick(assets, test) {
    for (var i = 0; i < assets.length; i++) {
      if (test(assets[i].name.toLowerCase())) return assets[i];
    }
    return null;
  }

  function setAsset(id, asset, labelKey) {
    var node = el(id);
    if (!node || !asset) return;
    node.href = asset.browser_download_url;
    node.setAttribute('download', '');
    node.textContent = I18N.t(labelKey) + ' · ' + mb(asset.size);
  }

  function render() {
    var yearNode = el('year');
    if (yearNode) yearNode.textContent = String(new Date().getFullYear());

    var title = el('releaseTitle');
    var meta = el('heroMeta');

    if (state.status === 'loading') return; // i18n.js zaten "yükleniyor" metnini bastı

    if (state.status === 'error') {
      if (title) title.textContent = I18N.t('releaseFallback');
      if (meta) {
        meta.innerHTML = I18N.t('metaFallbackPre')
          + '<a href="' + LATEST_PAGE + '" target="_blank" rel="noopener">' + I18N.t('metaFallbackLink') + '</a>'
          + I18N.t('metaFallbackPost');
      }
      return;
    }

    var rel = state.release;
    var version = (rel.tag_name || '').replace(/^v/i, '');
    var date = rel.published_at ? fmtDate(rel.published_at) : '';

    if (title) title.textContent = I18N.t('releaseLine', { version: version, date: date });

    setAsset('dlSetup', state.setup, 'btnSetup');
    setAsset('dlMsi', state.msi, 'btnMsi');

    var notes = el('dlNotes');
    if (notes && rel.html_url) notes.href = rel.html_url;

    var primary = state.setup || state.msi;
    if (primary) {
      ['heroDownload', 'footDownload'].forEach(function (id) {
        var node = el(id);
        if (!node) return;
        node.href = primary.browser_download_url;
        node.setAttribute('download', '');
      });
      var footText = el('footDownloadText');
      if (footText) footText.textContent = I18N.t('btnDownloadWinVer', { version: version });
    }

    if (meta) {
      meta.innerHTML = I18N.t('metaVersion', { version: version, date: date })
        + ' <a href="' + (rel.html_url || LATEST_PAGE) + '" target="_blank" rel="noopener">' + I18N.t('metaNotes') + '</a>';
    }
  }

  document.addEventListener('langchange', render);

  fetch('https://api.github.com/repos/' + REPO + '/releases/latest', {
    headers: { Accept: 'application/vnd.github+json' }
  })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (rel) {
      var assets = rel.assets || [];
      state.release = rel;
      state.setup = pick(assets, function (n) { return n.indexOf('setup.exe') > -1; })
        || pick(assets, function (n) { return n.slice(-4) === '.exe'; });
      state.msi = pick(assets, function (n) { return n.slice(-4) === '.msi'; });
      state.status = 'ready';
      render();
    })
    .catch(function () {
      state.status = 'error';
      render();
    });
})();
