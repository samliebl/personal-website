/*
 * Site analytics. One file, loaded by every page on samliebl.com and by
 * app.samliebl.com.
 *
 * It loads Umami's tracker (cookie-free, no personal data) and adds what the
 * tracker doesn't measure by itself: which links get followed, how far down a
 * page people read, how long a page holds attention, and JavaScript errors.
 *
 * Switching on: fill in the website IDs below. An empty ID keeps analytics
 * off for that host.
 *
 * Staying private: nothing is sent when the browser sends Do Not Track or
 * Global Privacy Control, or when the visitor has opted out. Add
 * ?analytics=off to any page address to opt out on that browser for good, and
 * ?analytics=on to undo it. Add ?analytics=debug to see in the console what
 * would be sent, without sending anything (?analytics=nodebug to stop).
 */
(function () {
    'use strict';

    /* ------------------------------------------------------------------
       Configuration
       ------------------------------------------------------------------ */

    // The tracker. This is Umami Cloud's script; change it if Umami is
    // self-hosted.
    var TRACKER_URL = 'https://cloud.umami.is/script.js';

    // Umami website IDs by hostname. Analytics stays off for any host whose
    // ID is empty or missing, so localhost, previews and file:// pages never
    // send anything. The two samliebl.com names share one ID.
    var WEBSITE_IDS = {
        'samliebl.com': '',
        'www.samliebl.com': '',
        'app.samliebl.com': ''
    };

    // Reading measurements.
    var DEPTH_STEPS = [25, 50, 75, 100];              // percent of the page scrolled
    var ENGAGED_STEPS = [15, 30, 60, 120, 300, 600];  // seconds of active reading
        var IDLE_AFTER = 60;       // seconds without input before the clock stops
    var MAX_ERRORS = 3;        // JavaScript errors reported per page view

    var OPT_OUT_KEY = 'sl-analytics-off';
    var DEBUG_KEY = 'sl-analytics-debug';

    /* ------------------------------------------------------------------
       State
       ------------------------------------------------------------------ */

    var host = location.hostname;
    var file = location.pathname.split('/').pop() || 'index.html';
    var kind = pageKind();
    var enabled = false;
    var debug = false;
    var trackerReady = false;
    var queue = [];
    var lastInput = Date.now();
    var engaged = 0;
    var errorCount = 0;
    var depthSeen = {};
    
    /* ------------------------------------------------------------------
       Helpers
       ------------------------------------------------------------------ */

    function pageKind() {
        var p = location.pathname;
        if (host === 'app.samliebl.com') { return 'app'; }
        if (/^\/writing\/novel\//.test(p)) { return 'novel'; }
        if (/^\/writing\//.test(p)) { return 'poetry'; }
        if (/^\/work\//.test(p)) { return 'work'; }
        if (/colophon/.test(p)) { return 'colophon'; }
        if (p === '/' || /^\/index\.html$/.test(p)) { return 'home'; }
        return 'other';
    }

    // Storage can throw (private windows, blocked cookies), so every use goes
    // through here.
    function store(area, op, key, value) {
        try {
            return window[area][op](key, value);
        } catch (e) {
            return null;
        }
    }

    function clean(data) {
        var out = {};
        Object.keys(data).forEach(function (k) {
            var v = data[k];
            if (v !== undefined && v !== null && v !== '') { out[k] = v; }
        });
        return out;
    }

    function words() {
        var el = document.getElementById('wordCount');
        var n = el ? parseInt(el.textContent.replace(/,/g, ''), 10) : NaN;
        return isNaN(n) ? undefined : n;
    }

    function isActive() {
        return document.visibilityState === 'visible' &&
            (Date.now() - lastInput) < IDLE_AFTER * 1000;
    }

    function disabledReason() {
        if (navigator.doNotTrack === '1' || window.doNotTrack === '1' ||
            navigator.msDoNotTrack === '1') { return 'Do Not Track'; }
        if (navigator.globalPrivacyControl) { return 'Global Privacy Control'; }
        if (store('localStorage', 'getItem', OPT_OUT_KEY) === '1') { return 'opted out'; }
        return '';
    }

    function handleQuery() {
        var v;
        try {
            v = new URLSearchParams(location.search).get('analytics');
        } catch (e) {
            return;
        }
        if (v === 'off') { store('localStorage', 'setItem', OPT_OUT_KEY, '1'); }
        else if (v === 'on') { store('localStorage', 'removeItem', OPT_OUT_KEY); }
        else if (v === 'debug') { store('sessionStorage', 'setItem', DEBUG_KEY, '1'); }
        else if (v === 'nodebug') { store('sessionStorage', 'removeItem', DEBUG_KEY); }
    }

    /* ------------------------------------------------------------------
       Sending
       ------------------------------------------------------------------ */

    function track(name, data) {
        if (!enabled) { return; }
        data = clean(data || {});
        data.kind = kind;
        if (debug) {
            console.info('[analytics]', name, data);
            return;
        }
        if (trackerReady && window.umami && typeof window.umami.track === 'function') {
            try {
                window.umami.track(name, data);
            } catch (e) { /* analytics must never break a page */ }
        } else {
            queue.push([name, data]);
            if (queue.length > 50) { queue.shift(); }
        }
    }

    function flush() {
        var item;
        while ((item = queue.shift())) {
            try {
                window.umami.track(item[0], item[1]);
            } catch (e) { /* ignore */ }
        }
    }

    function loadTracker(id) {
        var s = document.createElement('script');
        s.async = true;
        s.src = TRACKER_URL;
        s.setAttribute('data-website-id', id);
        s.setAttribute('data-do-not-track', 'true');
        s.onload = function () {
            trackerReady = true;
            flush();
        };
        // Blocked by an extension or a network: drop what's queued and move on.
        s.onerror = function () {
            enabled = false;
            queue.length = 0;
        };
        document.head.appendChild(s);
    }

    /* ------------------------------------------------------------------
       Measurements
       ------------------------------------------------------------------ */

    // Links: where people go next.
    function onClick(e) {
        var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
        if (!a || (a.protocol !== 'http:' && a.protocol !== 'https:')) { return; }
        var label = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);

        if (a.hostname !== host) {
            track('outbound-click', { url: a.hostname + a.pathname, label: label });
        } else if (a.closest('header nav')) {
            track('nav-click', { label: label });
        } else if (a.closest('.toc') && (a.getAttribute('href') || '').charAt(0) === '#') {
            track('toc-click', { target: a.getAttribute('href').slice(1) });
        } else if (/chapter\d+\.html$/.test(a.pathname)) {
            track('chapter-link', { to: a.pathname.split('/').pop() });
        }
    }

    // Scrolling: how far down a page people get.
    function checkDepth() {
        var doc = document.documentElement;
        var total = Math.max(doc.scrollHeight, document.body ? document.body.scrollHeight : 0);
        var view = window.innerHeight || doc.clientHeight;
        if (total <= view * 1.5) { return; }   // a short page has no depth to measure

        var pct = ((window.pageYOffset || doc.scrollTop) + view) / total * 100;
        DEPTH_STEPS.forEach(function (step) {
            var needed = step === 100 ? 98 : step;
            if (pct < needed || depthSeen[step]) { return; }
            depthSeen[step] = true;
            track('read-depth', { percent: step });
            if (step === 100 && kind === 'novel' && /chapter\d+\.html$/.test(file)) {
                track('chapter-complete', { chapter: file, words: words() });
            }
        });
    }

    // Time on page. The clock only runs while the tab is visible and the reader
    // has touched the page recently.
    function tick() {
        if (!isActive()) { return; }

        engaged += 1;
        if (ENGAGED_STEPS.indexOf(engaged) !== -1) {
            track('engaged', { seconds: engaged });
        }
    }

    // JavaScript errors, so a broken page shows up here before anyone mentions it.
    function reportError(message, source, line) {
        if (errorCount >= MAX_ERRORS) { return; }
        errorCount += 1;
        track('js-error', {
            message: String(message || 'error').slice(0, 150),
            source: String(source || '').split('/').pop().slice(0, 60),
            line: line
        });
    }

    /* ------------------------------------------------------------------
       Start
       ------------------------------------------------------------------ */

    function init() {
        handleQuery();
        debug = store('sessionStorage', 'getItem', DEBUG_KEY) === '1';

        var reason = disabledReason();
        var id = WEBSITE_IDS[host] || '';

        if (debug) {
            console.info('[analytics] debug mode: events are logged here and not sent.' +
                (reason ? ' (They would not be sent anyway: ' + reason + '.)' : ''));
        } else if (reason || !id) {
            return;
        }

        enabled = true;
        if (!debug) { loadTracker(id); }

        document.addEventListener('click', onClick, true);
        document.addEventListener('auxclick', onClick, true);

        ['scroll', 'mousemove', 'keydown', 'touchstart', 'click'].forEach(function (name) {
            window.addEventListener(name, function () { lastInput = Date.now(); },
                { passive: true, capture: true });
        });

        var scheduled = false;
        window.addEventListener('scroll', function () {
            if (scheduled) { return; }
            scheduled = true;
            window.requestAnimationFrame(function () {
                scheduled = false;
                checkDepth();
            });
        }, { passive: true });

        window.addEventListener('error', function (e) {
            reportError(e.message, e.filename, e.lineno);
        });
        window.addEventListener('unhandledrejection', function (e) {
            reportError(e.reason && e.reason.message ? e.reason.message : e.reason);
        });

        window.setInterval(tick, 1000);
    }

    // Available to other scripts. A harmless no-op wherever analytics is off.
    window.siteAnalytics = { track: track };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
