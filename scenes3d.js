'use strict';
/* ═══════════════════════════════════════════════════════════════
   SCI-FI 3D SECTION SCENES — scenes3d.js
   Each scene is MEANINGFUL to its section content.
   ═══════════════════════════════════════════════════════════════ */

(function initSectionScenes() {
  let gmx = 0, gmy = 0;
  document.addEventListener('mousemove', e => {
    gmx = (e.clientX / innerWidth - 0.5);
    gmy = (e.clientY / innerHeight - 0.5);
  });

  function makeCtx(id) {
    const c = document.getElementById(id);
    if (!c) return null;
    const r = new THREE.WebGLRenderer({
      canvas: c,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: id === 'personal-3d',
    });
    r.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    const sec = c.parentElement;
    function resize() { const w = sec.clientWidth, h = sec.clientHeight; r.setSize(w, h); return { w, h }; }
    const sz = resize();
    window.addEventListener('resize', resize);
    return { r, sec, w: sz.w, h: sz.h, resize };
  }

  /* ────────────────────────────────────────────────────────────
     A. ABOUT — Rotating Earth with Vietnam GPS finder
     Ý nghĩa: Trái đất xoay, Việt Nam nổi bật, phi thuyền tìm GPS
     Vị trí: Lệch phải để cân đối với text bên trái
     ──────────────────────────────────────────────────────────── */
  (function() {
    const ctx = makeCtx('about-3d');
    if (!ctx) return;

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(45, ctx.w / ctx.h, 0.1, 100);
    cam.position.set(2.0, 0.55, 6.9);

    scene.add(new THREE.AmbientLight(0x112334, 0.9));
    const key = new THREE.DirectionalLight(0xc8d6e5, 1.2);
    key.position.set(5, 3.5, 4.5);
    scene.add(key);
    const rim = new THREE.PointLight(0x22d3ee, 1.5, 14);
    rim.position.set(-2, -2, 5);
    scene.add(rim);

    const readout = {
      panel: document.querySelector('.about-geo-readout'),
      status: document.getElementById('about-location-status'),
      coords: document.getElementById('about-location-coords'),
      inline: document.getElementById('about-live-location'),
      trigger: document.getElementById('about-location-trigger'),
    };
    if (readout.inline) readout.inline.removeAttribute('data-i18n');

    const DEG = Math.PI / 180;
    const GEOJSON_URL = 'https://raw.githubusercontent.com/AshKyd/geojson-regions/main/public/countries/50m/VNM.geojson';
    const VN_BOUNDS = { latMin: 6.0, latMax: 23.65, lonMin: 102.0, lonMax: 116.8 };
    const HOME = { lat: 10.8499, lon: 106.7549, accuracy: null };
    const EARTH_R = 1.72;
    const SURFACE_R = 1.755;
    const MARKER_R = 2.02;
    const ORBIT_R = 3.55;
    const VN_DISPLAY_CENTER = {
      lat: (VN_BOUNDS.latMin + VN_BOUNDS.latMax) / 2,
      lon: (VN_BOUNDS.lonMin + VN_BOUNDS.lonMax) / 2,
    };
    const VN_MAP_MAGNIFY = 3.15;
    const FALLBACK_VIETNAM_POLYGONS = [
      [mainFallbackRing()],
      [makeRing(103.96, 10.22, 0.18, 0.26, 18)],
      [makeRing(106.61, 8.70, 0.08, 0.08, 12)],
      [makeRing(107.05, 10.38, 0.09, 0.07, 12)],
      [makeRing(107.48, 20.9, 0.09, 0.07, 12)],
      [makeRing(106.8, 20.84, 0.06, 0.05, 10)],
    ];

    const globeGroup = new THREE.Group();
    globeGroup.position.set(2.48, -0.02, 0);
    scene.add(globeGroup);

    const earthRoot = new THREE.Group();
    globeGroup.add(earthRoot);

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0x071522,
        emissive: 0x03080f,
        shininess: 90,
        specular: 0x2f5b7a,
        transparent: true,
        opacity: 0.94,
      })
    );
    earthRoot.add(earth);

    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R + 0.012, 28, 28),
      new THREE.MeshBasicMaterial({ color: 0x7fa8c9, wireframe: true, transparent: true, opacity: 0.085 })
    );
    earthRoot.add(wire);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R + 0.28, 40, 40),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.045, side: THREE.BackSide })
    );
    globeGroup.add(atmosphere);

    const orbitRingMat = new THREE.MeshBasicMaterial({ color: 0xa8d8ea, transparent: true, opacity: 0.18, depthWrite: false });
    const orbitRingA = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.008, 5, 120), orbitRingMat.clone());
    orbitRingA.rotation.x = Math.PI * 0.58;
    const orbitRingB = new THREE.Mesh(new THREE.TorusGeometry(2.48, 0.006, 5, 120), orbitRingMat.clone());
    orbitRingB.rotation.x = Math.PI * 0.2;
    orbitRingB.rotation.y = Math.PI * 0.35;
    globeGroup.add(orbitRingA, orbitRingB);

    const vnLayer = new THREE.Group();
    const cityLayer = new THREE.Group();
    const markerGroup = new THREE.Group();
    earthRoot.add(vnLayer, cityLayer, markerGroup);

    const ship = createFinderShip();
    const trailGeo = new THREE.BufferGeometry();
    const trailPos = new Float32Array(8 * 3);
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
    const shipTrail = new THREE.Line(
      trailGeo,
      new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0, depthWrite: false })
    );
    earthRoot.add(shipTrail, ship);

    let latestMode = 'waiting';
    let latestLocation = HOME;
    let countryLayer = null;
    let finderMessageUntil = 0;
    const markerTarget = geoToDisplayVector(HOME.lat, HOME.lon, MARKER_R, true);
    const markerNormal = markerTarget.clone().normalize();
    const trailPoints = [];
    const shipState = {
      active: false,
      arrived: false,
      progress: 0,
      start: new THREE.Vector3(),
      control: new THREE.Vector3(),
      target: new THREE.Vector3(),
      holdUntil: 0,
    };

    buildVietnamLayer(FALLBACK_VIETNAM_POLYGONS);
    loadDetailedVietnamMap();
    addCityPins();
    addIslandClusters();
    buildMarker();
    updateReadout('waiting', HOME);
    startLocationTracking();
    bindFinderTrigger();

    const langObserver = new MutationObserver(() => updateReadout(latestMode, latestLocation));
    langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    function clamp(n, min, max) {
      return Math.max(min, Math.min(max, n));
    }

    function isOnVietnamMap(lat, lon) {
      return lat >= VN_BOUNDS.latMin && lat <= VN_BOUNDS.latMax && lon >= VN_BOUNDS.lonMin && lon <= VN_BOUNDS.lonMax;
    }

    function latLonToVector(lat, lon, radius) {
      const latRad = lat * DEG;
      const lonRad = lon * DEG;
      // Flip the horizontal axis so east/west read correctly from the camera-facing globe.
      return new THREE.Vector3(
        -radius * Math.cos(latRad) * Math.cos(lonRad),
        radius * Math.sin(latRad),
        radius * Math.cos(latRad) * Math.sin(lonRad)
      );
    }

    function displayGeo(lat, lon, force) {
      if (!force && !isOnVietnamMap(lat, lon)) return { lat, lon };
      return {
        lat: clamp(VN_DISPLAY_CENTER.lat + (lat - VN_DISPLAY_CENTER.lat) * VN_MAP_MAGNIFY, -70, 70),
        lon: VN_DISPLAY_CENTER.lon + (lon - VN_DISPLAY_CENTER.lon) * VN_MAP_MAGNIFY,
      };
    }

    function geoToDisplayVector(lat, lon, radius, force) {
      const geo = displayGeo(lat, lon, force);
      return latLonToVector(geo.lat, geo.lon, radius);
    }

    function orientSurfaceGroup(group, normal) {
      group.quaternion.copy(new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        normal.clone().normalize()
      ));
    }

    function makeRing(lon, lat, rx, ry, steps) {
      const pts = [];
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        pts.push([lon + Math.cos(a) * rx, lat + Math.sin(a) * ry]);
      }
      return pts;
    }

    function toPolygons(data) {
      const geom = data && data.type === 'Feature' ? data.geometry : data;
      if (!geom) return FALLBACK_VIETNAM_POLYGONS;
      if (geom.type === 'Polygon') return [geom.coordinates];
      if (geom.type === 'MultiPolygon') return geom.coordinates;
      return FALLBACK_VIETNAM_POLYGONS;
    }

    function disposeObject(obj) {
      obj.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
          else child.material.dispose();
        }
      });
    }

    function buildVietnamLayer(polygons) {
      if (countryLayer) {
        vnLayer.remove(countryLayer);
        disposeObject(countryLayer);
      }

      countryLayer = new THREE.Group();
      const outlineMat = new THREE.LineBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.9, depthWrite: false });
      const glowMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.38, depthWrite: false });
      const coastDots = [];

      polygons.forEach(poly => {
        const outer = poly && poly[0];
        if (!outer || outer.length < 4) return;
        const pts = outer.map(([lon, lat]) => geoToDisplayVector(lat, lon, SURFACE_R, true));
        const glowPts = outer.map(([lon, lat]) => geoToDisplayVector(lat, lon, SURFACE_R + 0.034, true));
        countryLayer.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), outlineMat.clone()));
        countryLayer.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(glowPts), glowMat.clone()));
        outer.forEach(([lon, lat], i) => {
          if (i % 3 === 0) coastDots.push(geoToDisplayVector(lat, lon, SURFACE_R + 0.05, true));
        });
      });

      const fillPts = sampleVietnamPoints(polygons);
      if (fillPts.length) {
        countryLayer.add(new THREE.Points(
          new THREE.BufferGeometry().setFromPoints(fillPts),
          new THREE.PointsMaterial({ color: 0xff6b6b, size: 0.062, transparent: true, opacity: 0.68, depthWrite: false })
        ));
      }

      if (coastDots.length) {
        countryLayer.add(new THREE.Points(
          new THREE.BufferGeometry().setFromPoints(coastDots),
          new THREE.PointsMaterial({ color: 0xc8d6e5, size: 0.038, transparent: true, opacity: 0.78, depthWrite: false })
        ));
      }

      vnLayer.add(countryLayer);
    }

    function sampleVietnamPoints(polygons) {
      const pts = [];
      polygons.forEach(poly => {
        const ring = poly && poly[0];
        if (!ring || ring.length < 4) return;
        let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
        ring.forEach(([lon, lat]) => {
          minLon = Math.min(minLon, lon);
          maxLon = Math.max(maxLon, lon);
          minLat = Math.min(minLat, lat);
          maxLat = Math.max(maxLat, lat);
        });
        if ((maxLon - minLon) * (maxLat - minLat) < 0.1) return;
        for (let lat = minLat; lat <= maxLat; lat += 0.5) {
          for (let lon = minLon; lon <= maxLon; lon += 0.5) {
            if (pointInRing(lon, lat, ring)) pts.push(geoToDisplayVector(lat, lon, SURFACE_R + 0.065, true));
          }
        }
      });
      return pts;
    }

    function pointInRing(lon, lat, ring) {
      let inside = false;
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const xi = ring[i][0], yi = ring[i][1];
        const xj = ring[j][0], yj = ring[j][1];
        const intersect = ((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi || 1e-9) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    }

    function loadDetailedVietnamMap() {
      if (!window.fetch) return;
      fetch(GEOJSON_URL)
        .then(res => {
          if (!res.ok) throw new Error('map request failed');
          return res.json();
        })
        .then(data => buildVietnamLayer(toPolygons(data)))
        .catch(() => {});
    }

    function addCityPins() {
      [
        { name: 'HA NOI', lat: 21.0278, lon: 105.8342, color: '#c8d6e5' },
        { name: 'DA NANG', lat: 16.0471, lon: 108.2068, color: '#a8d8ea' },
        { name: 'HCM', lat: HOME.lat, lon: HOME.lon, color: '#ff8a8a' },
      ].forEach(city => {
        const normal = geoToDisplayVector(city.lat, city.lon, 1, true).normalize();
        const pin = new THREE.Mesh(
          new THREE.SphereGeometry(0.05, 14, 14),
          new THREE.MeshBasicMaterial({ color: city.color === '#ff8a8a' ? 0xff6b6b : 0xc8d6e5, transparent: true, opacity: 0.78, depthWrite: false })
        );
        pin.position.copy(normal.clone().multiplyScalar(SURFACE_R + 0.1));
        const label = makeSpriteLabel(city.name, city.color);
        label.position.copy(normal.clone().multiplyScalar(SURFACE_R + 0.46));
        label.scale.set(0.5, 0.14, 1);
        cityLayer.add(pin, label);
      });
    }

    function addIslandClusters() {
      [
        { name: 'HOANG SA', label: [16.55, 112.25], dots: [[16.5, 111.65], [16.85, 112.25], [16.25, 112.75], [15.95, 113.08], [15.75, 111.95]] },
        { name: 'TRUONG SA', label: [9.65, 114.2], dots: [[7.85, 112.75], [8.65, 113.55], [9.85, 114.25], [10.15, 115.25], [11.25, 116.05], [11.55, 114.85]] },
      ].forEach(cluster => {
        cluster.dots.forEach(([lat, lon]) => {
          const dot = new THREE.Mesh(
            new THREE.SphereGeometry(0.038, 10, 10),
            new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.65, depthWrite: false })
          );
          dot.position.copy(geoToDisplayVector(lat, lon, SURFACE_R + 0.11, true));
          cityLayer.add(dot);
        });
        const label = makeSpriteLabel(cluster.name, '#a8d8ea');
        label.position.copy(geoToDisplayVector(cluster.label[0], cluster.label[1], SURFACE_R + 0.62, true));
        label.scale.set(0.78, 0.18, 1);
        cityLayer.add(label);
      });
    }

    function makeSpriteLabel(text, color) {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 64;
      const x = c.getContext('2d');
      x.clearRect(0, 0, c.width, c.height);
      x.font = '700 24px Courier New, monospace';
      x.textBaseline = 'middle';
      x.fillStyle = 'rgba(5,10,18,0.55)';
      x.fillRect(0, 13, c.width, 38);
      x.fillStyle = color;
      x.fillText(text, 12, 34);
      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      return new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.82 }));
    }

    function buildMarker() {
      const markerDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 18, 18),
        new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.96, depthWrite: false })
      );
      markerDot.userData.kind = 'dot';
      const markerGlow = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 18, 18),
        new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.18, depthWrite: false })
      );
      markerGlow.userData.kind = 'glow';
      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.075, 0.9, 14, 1, true),
        new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.18, depthWrite: false })
      );
      beam.rotation.x = Math.PI / 2;
      beam.position.z = 0.45;
      markerGroup.add(markerGlow, markerDot, beam);

      for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.18 + i * 0.12, 0.188 + i * 0.12, 52),
          new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.34, side: THREE.DoubleSide, depthWrite: false })
        );
        ring._i = i;
        markerGroup.add(ring);
      }
      setMarkerLocation(HOME, 'home');
    }

    function setMarkerLocation(loc, mode) {
      markerTarget.copy(geoToDisplayVector(loc.lat, loc.lon, MARKER_R, mode !== 'outside'));
      markerNormal.copy(markerTarget).normalize();
      markerGroup.position.copy(markerTarget);
      orientSurfaceGroup(markerGroup, markerNormal);
      const color = mode === 'outside' ? 0xfbbf24 : 0xff6b6b;
      markerGroup.traverse(child => {
        if (child.material && child.material.color) child.material.color.set(color);
      });
    }

    function createFinderShip() {
      const group = new THREE.Group();
      group.visible = false;
      const metal = new THREE.MeshBasicMaterial({ color: 0xc8d6e5, transparent: true, opacity: 0.92, wireframe: true, depthWrite: false });
      const glow = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.82, depthWrite: false });
      const body = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.64, 4), metal);
      body.rotation.x = Math.PI / 2;
      const cabin = new THREE.Mesh(new THREE.SphereGeometry(0.095, 12, 12), glow);
      cabin.position.z = -0.1;
      const aura = new THREE.Mesh(
        new THREE.SphereGeometry(0.26, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.12, depthWrite: false })
      );
      const wingGeo = new THREE.BoxGeometry(0.62, 0.045, 0.16);
      const wing = new THREE.Mesh(wingGeo, metal.clone());
      wing.position.z = -0.14;
      const engine = new THREE.Mesh(new THREE.ConeGeometry(0.078, 0.28, 12), glow.clone());
      engine.rotation.x = -Math.PI / 2;
      engine.position.z = -0.44;
      group.add(aura, body, cabin, wing, engine);
      group.scale.setScalar(2.05);
      return group;
    }

    function launchFinder() {
      const vi = document.documentElement.lang === 'vi';
      const markerN = markerTarget.clone().normalize();
      const startN = markerN.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -1.35).add(new THREE.Vector3(0, 0.28, 0)).normalize();
      shipState.start.copy(startN.multiplyScalar(ORBIT_R));
      shipState.target.copy(markerN.multiplyScalar(MARKER_R + 0.68));
      shipState.control.copy(shipState.start).add(shipState.target).multiplyScalar(0.5).normalize().multiplyScalar(ORBIT_R + 0.8);
      shipState.progress = 0;
      shipState.active = true;
      shipState.arrived = false;
      shipState.holdUntil = 0;
      trailPoints.length = 0;
      ship.position.copy(shipState.start);
      ship.visible = true;
      shipTrail.material.opacity = 0.78;
      finderMessageUntil = performance.now() + 2200;
      if (readout.status) readout.status.textContent = vi ? 'FINDER: DANG BAY' : 'FINDER: LAUNCHED';
    }

    function bindFinderTrigger() {
      const targets = [readout.trigger, readout.panel].filter(Boolean);
      targets.forEach(el => {
        el.addEventListener('click', launchFinder);
        el.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            launchFinder();
          }
        });
      });
      if (readout.trigger) {
        readout.trigger.setAttribute('title', 'Click to launch GPS finder spaceship');
      }
    }

    function updateReadout(mode, loc) {
      latestMode = mode;
      latestLocation = loc;
      const vi = document.documentElement.lang === 'vi';
      const accuracy = loc.accuracy ? ' · +/-' + Math.round(loc.accuracy) + 'M' : '';
      const coordText = 'LAT ' + loc.lat.toFixed(4) + ' · LON ' + loc.lon.toFixed(4) + accuracy;
      const statusText = {
        waiting: vi ? 'GPS: DANG CHO QUYEN' : 'GPS: WAITING',
        home: vi ? 'GPS: GHIM VI TRI NHA' : 'GPS: HOME PIN',
        live: vi ? 'GPS: DANG THEO DOI' : 'GPS: LIVE TRACKING',
        outside: vi ? 'GPS: NGOAI VIET NAM' : 'GPS: OUTSIDE VIETNAM',
        denied: vi ? 'GPS: BI TU CHOI' : 'GPS: PERMISSION DENIED',
        unavailable: vi ? 'GPS: KHONG KHA DUNG' : 'GPS: UNAVAILABLE',
      }[mode] || (vi ? 'GPS: GHIM VI TRI NHA' : 'GPS: HOME PIN');
      const hint = vi ? ' · bấm để phóng phi thuyền tìm tôi' : ' · click to launch finder ship';
      const inlineText = {
        waiting: vi ? 'Định vị GPS trên quả địa cầu · đang chờ quyền truy cập' : 'GPS tracker on rotating Earth · waiting for permission',
        home: vi ? 'Đang ghim Thủ Đức / TP.HCM trên quả địa cầu' + hint : 'Showing Thu Duc / HCMC on Earth' + hint,
        live: vi ? 'Live GPS marker trên Việt Nam · ' + coordText + hint : 'Live GPS marker on Vietnam map · ' + coordText + hint,
        outside: vi ? 'GPS nằm ngoài Việt Nam · ' + coordText + hint : 'GPS is outside Vietnam · ' + coordText + hint,
        denied: vi ? 'Bạn chưa cấp quyền định vị · đang ghim Thủ Đức / TP.HCM' + hint : 'Location permission denied · showing Thu Duc / HCMC' + hint,
        unavailable: vi ? 'Trình duyệt không hỗ trợ định vị · đang ghim Thủ Đức / TP.HCM' + hint : 'Geolocation unavailable · showing Thu Duc / HCMC' + hint,
      }[mode] || '';

      if (readout.status && performance.now() > finderMessageUntil) readout.status.textContent = statusText;
      if (readout.coords) readout.coords.textContent = coordText;
      if (readout.inline) readout.inline.textContent = inlineText;
    }

    function startLocationTracking() {
      setMarkerLocation(HOME, 'home');
      if (!navigator.geolocation) {
        updateReadout('unavailable', HOME);
        return;
      }
      let hasFix = false;
      try {
        navigator.geolocation.watchPosition(
          pos => {
            hasFix = true;
            const loc = {
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
              accuracy: pos.coords.accuracy || null,
            };
            const mode = isOnVietnamMap(loc.lat, loc.lon) ? 'live' : 'outside';
            setMarkerLocation(loc, mode);
            updateReadout(mode, loc);
          },
          err => {
            if (hasFix) return;
            updateReadout(err.code === 1 ? 'denied' : 'unavailable', HOME);
          },
          { enableHighAccuracy: true, maximumAge: 15000, timeout: 12000 }
        );
      } catch (err) {
        updateReadout('unavailable', HOME);
      }
    }

    function easeOutCubic(x) {
      return 1 - Math.pow(1 - x, 3);
    }

    function bezier(a, b, c, t) {
      const ab = a.clone().lerp(b, t);
      const bc = b.clone().lerp(c, t);
      return ab.lerp(bc, t);
    }

    function updateShip(dt, now) {
      if (!shipState.active && !shipState.arrived) return;

      if (shipState.active) {
        shipState.progress = Math.min(1, shipState.progress + dt / 2.35);
        const eased = easeOutCubic(shipState.progress);
        const pos = bezier(shipState.start, shipState.control, shipState.target, eased);
        const future = bezier(shipState.start, shipState.control, shipState.target, Math.min(1, eased + 0.025));
        ship.position.copy(pos);
        ship.lookAt(future);
        trailPoints.unshift(pos.clone());
        if (trailPoints.length > 8) trailPoints.pop();

        if (shipState.progress >= 1) {
          const vi = document.documentElement.lang === 'vi';
          shipState.active = false;
          shipState.arrived = true;
          shipState.holdUntil = now + 3.0;
          finderMessageUntil = performance.now() + 2800;
          if (readout.status) readout.status.textContent = vi ? 'FINDER: DA TIM THAY' : 'FINDER: TARGET LOCKED';
        }
      } else if (now > shipState.holdUntil) {
        ship.visible = false;
        shipState.arrived = false;
      }

      for (let i = 0; i < 8; i++) {
        const p = trailPoints[i] || ship.position;
        trailPos[i * 3] = p.x;
        trailPos[i * 3 + 1] = p.y;
        trailPos[i * 3 + 2] = p.z;
      }
      trailGeo.attributes.position.needsUpdate = true;
      shipTrail.material.opacity += (((shipState.active || shipState.arrived) ? 0.78 : 0) - shipTrail.material.opacity) * 0.08;
    }

    function layout() {
      const s = ctx.resize();
      cam.aspect = s.w / s.h;
      cam.updateProjectionMatrix();
      if (s.w < 768) {
        cam.position.set(0.1, 0.35, 9.35);
        globeGroup.position.set(1.05, -0.75, 0);
        globeGroup.scale.setScalar(0.52);
      } else {
        cam.position.set(2.0, 0.55, 7.15);
        globeGroup.position.set(2.72, -0.02, 0);
        globeGroup.scale.setScalar(0.96);
      }
    }
    window.addEventListener('resize', layout);
    layout();

    let prev = 0;
    const clk = new THREE.Clock();
    (function tick() {
      requestAnimationFrame(tick);
      const t = clk.getElapsedTime();
      const dt = prev ? t - prev : 0.016;
      prev = t;

      earthRoot.rotation.y = t * 0.085 + gmx * 0.12;
      earthRoot.rotation.x += (gmy * 0.08 - earthRoot.rotation.x) * 0.035;
      wire.rotation.y = -t * 0.035;
      atmosphere.rotation.y = t * 0.025;
      orbitRingA.rotation.z = t * 0.08;
      orbitRingB.rotation.z = -t * 0.055;

      markerGroup.position.lerp(markerTarget, 0.08);
      orientSurfaceGroup(markerGroup, markerGroup.position.clone().normalize());
      markerGroup.children.forEach(child => {
        if (child.geometry && child.geometry.type === 'RingGeometry') {
          const phase = (t * 1.4 + child._i * 0.72) % 2.8;
          child.scale.setScalar(1 + phase * 0.85);
          child.material.opacity = Math.max(0, 0.38 - phase * 0.12);
        } else if (child.userData.kind === 'glow') {
          child.material.opacity = 0.18 + Math.sin(t * 3.2) * 0.08;
        } else if (child.userData.kind === 'dot') {
          child.material.opacity = 0.96;
        }
      });

      updateShip(dt, t);
      rim.intensity = 1.3 + Math.sin(t * 1.7) * 0.35;

      const mobile = ctx.sec.clientWidth < 768;
      cam.position.x += ((mobile ? 0.15 : 2.0) + gmx * 0.35 - cam.position.x) * 0.025;
      cam.position.y += (0.55 - gmy * 0.3 - cam.position.y) * 0.025;
      cam.lookAt(
        globeGroup.position.x - (mobile ? 0.95 : 1.15),
        globeGroup.position.y - 0.02,
        globeGroup.position.z
      );
      ctx.r.render(scene, cam);
    })();

    function mainFallbackRing() {
      return [
        [105.32, 23.35], [104.65, 22.95], [103.88, 22.57], [103.25, 21.78],
        [102.15, 22.42], [102.82, 21.17], [103.12, 20.25], [104.1, 19.28],
        [104.62, 18.42], [105.03, 17.78], [105.78, 17.48], [106.55, 16.28],
        [107.28, 15.34], [107.58, 14.72], [107.44, 14.1], [107.6, 13.5],
        [107.34, 12.94], [106.95, 12.35], [106.86, 11.7], [106.55, 11.05],
        [105.95, 10.75], [105.18, 10.7], [104.7, 10.42], [104.48, 9.86],
        [104.86, 9.25], [105.18, 8.64], [105.75, 8.56], [106.45, 9.05],
        [106.9, 9.78], [107.18, 10.48], [108.05, 11.1], [108.95, 11.7],
        [109.4, 12.2], [109.28, 12.92], [109.05, 13.58], [109.25, 14.2],
        [108.95, 15.0], [108.15, 15.8], [107.6, 16.55], [106.9, 17.1],
        [106.55, 18.0], [106.25, 18.75], [106.05, 19.45], [106.65, 20.15],
        [107.15, 20.78], [107.95, 21.42], [108.08, 21.82], [107.3, 21.95],
        [106.55, 22.5], [105.85, 22.75], [105.32, 23.35],
      ];
    }
  })();

  /* ────────────────────────────────────────────────────────────
     A. ABOUT — Legacy flat Vietnam map disabled
     Ý nghĩa: Thể hiện vị trí địa lý, bản sắc Việt Nam, live GPS
     Vị trí: Lệch phải để cân đối với text bên trái
     ──────────────────────────────────────────────────────────── */
  (function() {
    return;
    const ctx = makeCtx('about-3d');
    if (!ctx) return;

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(44, ctx.w / ctx.h, 0.1, 100);
    cam.position.set(0, 0.25, 8);
    scene.add(new THREE.AmbientLight(0x0a1828, 1.15));

    const pLight = new THREE.PointLight(0xc8d6e5, 1.7, 18);
    pLight.position.set(2.8, 2.6, 5);
    scene.add(pLight);

    const readout = {
      status: document.getElementById('about-location-status'),
      coords: document.getElementById('about-location-coords'),
      inline: document.getElementById('about-live-location'),
    };
    if (readout.inline) readout.inline.removeAttribute('data-i18n');

    const DEG = Math.PI / 180;
    const GEOJSON_URL = 'https://raw.githubusercontent.com/AshKyd/geojson-regions/main/public/countries/50m/VNM.geojson';
    const VN_BOUNDS = { latMin: 6.0, latMax: 23.65, lonMin: 102.0, lonMax: 116.8 };
    const VN_CENTER = {
      lat: (VN_BOUNDS.latMin + VN_BOUNDS.latMax) / 2,
      lon: (VN_BOUNDS.lonMin + VN_BOUNDS.lonMax) / 2,
    };
    const MAP_SCALE = 0.35;
    const LON_SCALE = Math.cos(VN_CENTER.lat * DEG);
    const HOME = { lat: 10.8499, lon: 106.7549, accuracy: null };
    const FALLBACK_VIETNAM_POLYGONS = [
      [mainFallbackRing()],
      [makeRing(103.96, 10.22, 0.18, 0.26, 18)],
      [makeRing(106.61, 8.70, 0.08, 0.08, 12)],
      [makeRing(107.05, 10.38, 0.09, 0.07, 12)],
      [makeRing(107.48, 20.9, 0.09, 0.07, 12)],
      [makeRing(106.8, 20.84, 0.06, 0.05, 10)],
    ];

    const mapGroup = new THREE.Group();
    mapGroup.position.set(2.25, -0.1, 0);
    scene.add(mapGroup);

    const mapRoot = new THREE.Group();
    mapRoot.rotation.y = -0.24;
    mapGroup.add(mapRoot);

    const gridGroup = new THREE.Group();
    const islandGroup = new THREE.Group();
    const cityGroup = new THREE.Group();
    const markerGroup = new THREE.Group();
    mapRoot.add(gridGroup, islandGroup, cityGroup, markerGroup);

    const sw = projectGeo(VN_BOUNDS.latMin, VN_BOUNDS.lonMin, false);
    const ne = projectGeo(VN_BOUNDS.latMax, VN_BOUNDS.lonMax, false);
    const panelW = Math.abs(ne.x - sw.x) + 0.52;
    const panelH = Math.abs(ne.y - sw.y) + 0.5;
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(panelW, panelH),
      new THREE.MeshBasicMaterial({ color: 0x07131f, transparent: true, opacity: 0.16, depthWrite: false })
    );
    panel.position.z = -0.08;
    gridGroup.add(panel);

    const gridMat = new THREE.LineBasicMaterial({ color: 0x7fa8c9, transparent: true, opacity: 0.08, depthWrite: false });
    for (let lat = 8; lat <= 22; lat += 2) {
      gridGroup.add(makeLine([projectGeo(lat, VN_BOUNDS.lonMin, false), projectGeo(lat, VN_BOUNDS.lonMax, false)], gridMat));
    }
    for (let lon = 104; lon <= 116; lon += 2) {
      gridGroup.add(makeLine([projectGeo(VN_BOUNDS.latMin, lon, false), projectGeo(VN_BOUNDS.latMax, lon, false)], gridMat));
    }

    const borderMat = new THREE.LineBasicMaterial({ color: 0xc8d6e5, transparent: true, opacity: 0.24, depthWrite: false });
    const borderPts = [
      new THREE.Vector3(sw.x - 0.26, sw.y - 0.25, -0.04),
      new THREE.Vector3(ne.x + 0.26, sw.y - 0.25, -0.04),
      new THREE.Vector3(ne.x + 0.26, ne.y + 0.25, -0.04),
      new THREE.Vector3(sw.x - 0.26, ne.y + 0.25, -0.04),
    ];
    const border = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(borderPts), borderMat);
    gridGroup.add(border);

    const scan = new THREE.Mesh(
      new THREE.PlaneGeometry(panelW, 0.018),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.22, depthWrite: false })
    );
    scan.position.z = 0.14;
    mapRoot.add(scan);

    let countryLayer = null;
    buildCountryLayer(FALLBACK_VIETNAM_POLYGONS);
    loadDetailedVietnamMap();
    addIslandClusters();
    addCityPins();

    const homePos = projectGeo(HOME.lat, HOME.lon, true);
    const markerTarget = new THREE.Vector3(homePos.x, homePos.y, 0.22);
    markerGroup.position.copy(markerTarget);

    const markerDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 18, 18),
      new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.95, depthWrite: false })
    );
    const markerGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 18, 18),
      new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.18, depthWrite: false })
    );
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.055, 0.82, 14, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.18, depthWrite: false })
    );
    beam.rotation.x = Math.PI / 2;
    beam.position.z = 0.38;
    markerGroup.add(markerGlow, markerDot, beam);

    const pulseRings = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.12 + i * 0.07, 0.125 + i * 0.07, 48),
        new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false })
      );
      ring._i = i;
      markerGroup.add(ring);
      pulseRings.push(ring);
    }

    const routeGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(homePos.x, homePos.y, 0.11),
      new THREE.Vector3(homePos.x, homePos.y, 0.11),
    ]);
    const routeLine = new THREE.Line(
      routeGeo,
      new THREE.LineBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.3, depthWrite: false })
    );
    mapRoot.add(routeLine);

    const orbiters = [];
    for (let i = 0; i < 8; i++) {
      const orb = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.035 + i * 0.002, 0),
        new THREE.MeshBasicMaterial({ color: i % 2 ? 0xa8d8ea : 0x22d3ee, transparent: true, opacity: 0.55, depthWrite: false })
      );
      orb._r = 2.65 + (i % 3) * 0.36;
      orb._speed = 0.16 + i * 0.035;
      orb._phase = (Math.PI * 2 / 8) * i;
      mapGroup.add(orb);
      orbiters.push(orb);
    }

    let latestMode = 'waiting';
    let latestLocation = HOME;
    updateReadout('waiting', HOME);
    startLocationTracking();

    const langObserver = new MutationObserver(() => updateReadout(latestMode, latestLocation));
    langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    function clamp(n, min, max) {
      return Math.max(min, Math.min(max, n));
    }

    function projectGeo(lat, lon, clampToBounds) {
      const safeLat = clampToBounds ? clamp(lat, VN_BOUNDS.latMin, VN_BOUNDS.latMax) : lat;
      const safeLon = clampToBounds ? clamp(lon, VN_BOUNDS.lonMin, VN_BOUNDS.lonMax) : lon;
      return new THREE.Vector3(
        (safeLon - VN_CENTER.lon) * LON_SCALE * MAP_SCALE,
        (safeLat - VN_CENTER.lat) * MAP_SCALE,
        0
      );
    }

    function isOnVietnamMap(lat, lon) {
      return lat >= VN_BOUNDS.latMin && lat <= VN_BOUNDS.latMax && lon >= VN_BOUNDS.lonMin && lon <= VN_BOUNDS.lonMax;
    }

    function makeLine(points, material) {
      return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
    }

    function makeRing(lon, lat, rx, ry, steps) {
      const pts = [];
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        pts.push([lon + Math.cos(a) * rx, lat + Math.sin(a) * ry]);
      }
      return pts;
    }

    function disposeObject(obj) {
      obj.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
          else child.material.dispose();
        }
      });
    }

    function toPolygons(data) {
      const geom = data && data.type === 'Feature' ? data.geometry : data;
      if (!geom) return FALLBACK_VIETNAM_POLYGONS;
      if (geom.type === 'Polygon') return [geom.coordinates];
      if (geom.type === 'MultiPolygon') return geom.coordinates;
      return FALLBACK_VIETNAM_POLYGONS;
    }

    function buildCountryLayer(polygons) {
      if (countryLayer) {
        mapRoot.remove(countryLayer);
        disposeObject(countryLayer);
      }

      countryLayer = new THREE.Group();
      const fillMat = new THREE.MeshBasicMaterial({
        color: 0x123047,
        transparent: true,
        opacity: 0.26,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const outlineMat = new THREE.LineBasicMaterial({ color: 0xa8d8ea, transparent: true, opacity: 0.42, depthWrite: false });
      const glowMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.15, depthWrite: false });
      const coastPts = [];

      polygons.forEach(poly => {
        const outer = poly && poly[0];
        if (!outer || outer.length < 4) return;

        const shape = new THREE.Shape();
        outer.forEach(([lon, lat], i) => {
          const p = projectGeo(lat, lon, false);
          if (i === 0) shape.moveTo(p.x, p.y);
          else shape.lineTo(p.x, p.y);
          coastPts.push(new THREE.Vector3(p.x, p.y, 0.08));
        });

        try {
          const fill = new THREE.Mesh(new THREE.ShapeGeometry(shape), fillMat.clone());
          fill.position.z = -0.015;
          countryLayer.add(fill);
        } catch (err) {
          // Keep outline rendering even if a complex polygon cannot be triangulated.
        }

        const ringPts = outer.map(([lon, lat]) => {
          const p = projectGeo(lat, lon, false);
          return new THREE.Vector3(p.x, p.y, 0.08);
        });
        countryLayer.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(ringPts), outlineMat.clone()));
        countryLayer.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(ringPts), glowMat.clone()));
      });

      if (coastPts.length) {
        const dotGeo = new THREE.BufferGeometry().setFromPoints(coastPts.filter((_, i) => i % 5 === 0));
        countryLayer.add(new THREE.Points(
          dotGeo,
          new THREE.PointsMaterial({ color: 0xc8d6e5, size: 0.022, transparent: true, opacity: 0.38, depthWrite: false })
        ));
      }
      mapRoot.add(countryLayer);
    }

    function loadDetailedVietnamMap() {
      if (!window.fetch) return;
      fetch(GEOJSON_URL)
        .then(res => {
          if (!res.ok) throw new Error('map request failed');
          return res.json();
        })
        .then(data => buildCountryLayer(toPolygons(data)))
        .catch(() => {});
    }

    function addIslandClusters() {
      const clusters = [
        {
          name: 'HOANG SA',
          labelAt: [112.25, 16.55],
          dots: [[111.65, 16.5], [112.25, 16.85], [112.75, 16.25], [113.08, 15.95], [111.95, 15.75]],
        },
        {
          name: 'TRUONG SA',
          labelAt: [114.2, 9.65],
          dots: [[112.75, 7.85], [113.55, 8.65], [114.25, 9.85], [115.25, 10.15], [116.05, 11.25], [114.85, 11.55]],
        },
      ];
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xa8d8ea, transparent: true, opacity: 0.66, depthWrite: false });
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false });

      clusters.forEach(cluster => {
        cluster.dots.forEach(([lon, lat]) => {
          const p = projectGeo(lat, lon, false);
          const dot = new THREE.Mesh(new THREE.CircleGeometry(0.026, 14), dotMat.clone());
          const ring = new THREE.Mesh(new THREE.RingGeometry(0.055, 0.059, 24), ringMat.clone());
          dot.position.set(p.x, p.y, 0.13);
          ring.position.set(p.x, p.y, 0.12);
          islandGroup.add(dot, ring);
        });
        const labelPos = projectGeo(cluster.labelAt[1], cluster.labelAt[0], false);
        const label = makeSpriteLabel(cluster.name, '#a8d8ea');
        label.position.set(labelPos.x + 0.35, labelPos.y, 0.2);
        label.scale.set(0.7, 0.18, 1);
        islandGroup.add(label);
      });
    }

    function addCityPins() {
      const cities = [
        { name: 'HA NOI', lat: 21.0278, lon: 105.8342 },
        { name: 'DA NANG', lat: 16.0471, lon: 108.2068 },
        { name: 'HCM', lat: 10.8499, lon: 106.7549 },
      ];
      cities.forEach(city => {
        const p = projectGeo(city.lat, city.lon, true);
        const dot = new THREE.Mesh(
          new THREE.CircleGeometry(0.034, 18),
          new THREE.MeshBasicMaterial({ color: city.name === 'HCM' ? 0xff6b6b : 0xc8d6e5, transparent: true, opacity: 0.7, depthWrite: false })
        );
        dot.position.set(p.x, p.y, 0.16);
        const label = makeSpriteLabel(city.name, city.name === 'HCM' ? '#ff8a8a' : '#c8d6e5');
        label.position.set(p.x + 0.22, p.y + 0.05, 0.2);
        label.scale.set(0.42, 0.12, 1);
        cityGroup.add(dot, label);
      });
    }

    function makeSpriteLabel(text, color) {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 64;
      const x = c.getContext('2d');
      x.clearRect(0, 0, c.width, c.height);
      x.font = '700 24px Courier New, monospace';
      x.textBaseline = 'middle';
      x.fillStyle = 'rgba(5,10,18,0.55)';
      x.fillRect(0, 13, c.width, 38);
      x.fillStyle = color;
      x.fillText(text, 12, 34);
      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      return new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.82, depthWrite: false }));
    }

    function setMarkerLocation(loc, mode) {
      const p = projectGeo(loc.lat, loc.lon, true);
      markerTarget.set(p.x, p.y, 0.22);
      markerDot.material.color.set(mode === 'outside' ? 0xfbbf24 : 0xff6b6b);
      markerGlow.material.color.set(mode === 'outside' ? 0xfbbf24 : 0xff6b6b);
      beam.material.color.set(mode === 'outside' ? 0xfbbf24 : 0xff6b6b);
      pulseRings.forEach(r => r.material.color.set(mode === 'outside' ? 0xfbbf24 : 0xff6b6b));
    }

    function updateReadout(mode, loc) {
      latestMode = mode;
      latestLocation = loc;
      const vi = document.documentElement.lang === 'vi';
      const accuracy = loc.accuracy ? ' · +/-' + Math.round(loc.accuracy) + 'M' : '';
      const coordText = 'LAT ' + loc.lat.toFixed(4) + ' · LON ' + loc.lon.toFixed(4) + accuracy;
      const statusText = {
        waiting: vi ? 'GPS: DANG CHO QUYEN' : 'GPS: WAITING',
        home: vi ? 'GPS: GHIM VI TRI NHA' : 'GPS: HOME PIN',
        live: vi ? 'GPS: DANG THEO DOI' : 'GPS: LIVE TRACKING',
        outside: vi ? 'GPS: NGOAI KHUNG VN' : 'GPS: OUTSIDE VN VIEW',
        denied: vi ? 'GPS: BI TU CHOI' : 'GPS: PERMISSION DENIED',
        unavailable: vi ? 'GPS: KHONG KHA DUNG' : 'GPS: UNAVAILABLE',
      }[mode] || (vi ? 'GPS: GHIM VI TRI NHA' : 'GPS: HOME PIN');
      const inlineText = {
        waiting: vi ? 'Định vị GPS trên bản đồ Việt Nam · đang chờ quyền truy cập' : 'GPS tracking on Vietnam map · waiting for permission',
        home: vi ? 'Đang hiển thị vị trí Thủ Đức / TP.HCM trên bản đồ Việt Nam' : 'Showing Thu Duc / HCMC pin on Vietnam map',
        live: vi ? 'Đang theo dõi vị trí thật trên bản đồ Việt Nam · ' + coordText : 'Live GPS marker on Vietnam map · ' + coordText,
        outside: vi ? 'Đã nhận GPS nhưng vị trí nằm ngoài khung bản đồ Việt Nam' : 'GPS received, location is outside the Vietnam map frame',
        denied: vi ? 'Bạn chưa cấp quyền định vị · đang ghim Thủ Đức / TP.HCM' : 'Location permission denied · showing Thu Duc / HCMC pin',
        unavailable: vi ? 'Trình duyệt không hỗ trợ định vị · đang ghim Thủ Đức / TP.HCM' : 'Geolocation unavailable · showing Thu Duc / HCMC pin',
      }[mode] || '';

      if (readout.status) readout.status.textContent = statusText;
      if (readout.coords) readout.coords.textContent = coordText;
      if (readout.inline) readout.inline.textContent = inlineText;
    }

    function startLocationTracking() {
      setMarkerLocation(HOME, 'home');
      if (!navigator.geolocation) {
        updateReadout('unavailable', HOME);
        return;
      }

      let hasFix = false;
      try {
        navigator.geolocation.watchPosition(
          pos => {
            hasFix = true;
            const loc = {
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
              accuracy: pos.coords.accuracy || null,
            };
            const mode = isOnVietnamMap(loc.lat, loc.lon) ? 'live' : 'outside';
            setMarkerLocation(loc, mode);
            updateReadout(mode, loc);
          },
          err => {
            if (hasFix) return;
            updateReadout(err.code === 1 ? 'denied' : 'unavailable', HOME);
          },
          { enableHighAccuracy: true, maximumAge: 15000, timeout: 12000 }
        );
      } catch (err) {
        updateReadout('unavailable', HOME);
      }
    }

    function layout() {
      const s = ctx.resize();
      cam.aspect = s.w / s.h;
      cam.updateProjectionMatrix();
      if (s.w < 768) {
        cam.position.z = 9.2;
        mapGroup.position.set(0.4, -0.15, 0);
        mapGroup.scale.setScalar(0.68);
      } else {
        cam.position.z = 8;
        mapGroup.position.set(2.25, -0.1, 0);
        mapGroup.scale.setScalar(1);
      }
    }
    window.addEventListener('resize', layout);
    layout();

    const clk = new THREE.Clock();
    (function tick() {
      requestAnimationFrame(tick);
      const t = clk.getElapsedTime();

      mapRoot.rotation.x += (gmy * 0.05 - mapRoot.rotation.x) * 0.03;
      mapRoot.rotation.y += (-0.24 + gmx * 0.09 - mapRoot.rotation.y) * 0.03;
      scan.position.y = sw.y - 0.16 + ((t * 0.75) % (panelH + 0.32));
      scan.material.opacity = 0.14 + Math.sin(t * 4) * 0.06;

      markerGroup.position.lerp(markerTarget, 0.075);
      markerGlow.material.opacity = 0.14 + Math.sin(t * 3.2) * 0.08;
      beam.material.opacity = 0.12 + Math.sin(t * 2.4) * 0.06;
      pulseRings.forEach(r => {
        const phase = (t * 1.35 + r._i * 0.72) % 2.6;
        r.scale.setScalar(1 + phase * 0.95);
        r.material.opacity = Math.max(0, 0.38 - phase * 0.14);
      });

      const routePos = routeGeo.attributes.position.array;
      routePos[0] = homePos.x; routePos[1] = homePos.y; routePos[2] = 0.11;
      routePos[3] = markerGroup.position.x; routePos[4] = markerGroup.position.y; routePos[5] = 0.11;
      routeGeo.attributes.position.needsUpdate = true;
      routeLine.material.opacity = 0.12 + Math.sin(t * 2.2) * 0.08;

      orbiters.forEach(o => {
        const a = t * o._speed + o._phase;
        o.position.set(
          Math.cos(a) * o._r,
          Math.sin(a * 0.72) * 1.5,
          Math.sin(a) * 0.9
        );
        o.rotation.x = t * 0.7;
        o.rotation.y = t;
      });

      const lookX = ctx.sec.clientWidth < 768 ? 0.2 : 2.05;
      cam.position.x += (gmx * 0.45 - cam.position.x) * 0.025;
      cam.position.y += (0.25 - gmy * 0.35 - cam.position.y) * 0.025;
      cam.lookAt(lookX, -0.05, 0);
      ctx.r.render(scene, cam);
    })();

    function mainFallbackRing() {
      return [
        [105.32, 23.35], [104.65, 22.95], [103.88, 22.57], [103.25, 21.78],
        [102.15, 22.42], [102.82, 21.17], [103.12, 20.25], [104.1, 19.28],
        [104.62, 18.42], [105.03, 17.78], [105.78, 17.48], [106.55, 16.28],
        [107.28, 15.34], [107.58, 14.72], [107.44, 14.1], [107.6, 13.5],
        [107.34, 12.94], [106.95, 12.35], [106.86, 11.7], [106.55, 11.05],
        [105.95, 10.75], [105.18, 10.7], [104.7, 10.42], [104.48, 9.86],
        [104.86, 9.25], [105.18, 8.64], [105.75, 8.56], [106.45, 9.05],
        [106.9, 9.78], [107.18, 10.48], [108.05, 11.1], [108.95, 11.7],
        [109.4, 12.2], [109.28, 12.92], [109.05, 13.58], [109.25, 14.2],
        [108.95, 15.0], [108.15, 15.8], [107.6, 16.55], [106.9, 17.1],
        [106.55, 18.0], [106.25, 18.75], [106.05, 19.45], [106.65, 20.15],
        [107.15, 20.78], [107.95, 21.42], [108.08, 21.82], [107.3, 21.95],
        [106.55, 22.5], [105.85, 22.75], [105.32, 23.35],
      ];
    }

  })();

  /* ────────────────────────────────────────────────────────────
     B. SKILLS — Hexagonal CPU / Circuit Grid
     Ý nghĩa: Chip xử lý = kiến trúc kỹ năng kỹ thuật
     Vị trí: Trải đều làm nền
     ──────────────────────────────────────────────────────────── */
  (function() {
    const ctx = makeCtx('skills-3d');
    if (!ctx) return;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(50, ctx.w / ctx.h, 0.1, 100);
    cam.position.set(0, 6, 8);
    cam.lookAt(0, 0, 0);
    window.addEventListener('resize', () => { const s = ctx.resize(); cam.aspect = s.w / s.h; cam.updateProjectionMatrix(); });

    // Hexagonal grid (circuit board)
    const hexGroup = new THREE.Group();
    scene.add(hexGroup);
    const hexShape = new THREE.CircleGeometry(0.45, 6);
    const colors = [0x22d3ee, 0xa78bfa, 0x4ade80, 0xfbbf24, 0xff6b6b, 0x38bdf8, 0xc8d6e5];

    const hexes = [];
    const cols = 9, rows = 7;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = (col - cols / 2) * 1.0 + (row % 2 ? 0.5 : 0);
        const z = (row - rows / 2) * 0.87;
        const hex = new THREE.Mesh(
          hexShape,
          new THREE.MeshBasicMaterial({
            color: colors[(row * cols + col) % colors.length],
            wireframe: true, transparent: true,
            opacity: 0.06 + Math.random() * 0.08
          })
        );
        hex.rotation.x = -Math.PI / 2;
        hex.position.set(x, 0, z);
        hex._baseOp = hex.material.opacity;
        hex._phase = Math.random() * Math.PI * 2;
        hexGroup.add(hex);
        hexes.push(hex);
      }
    }

    // Circuit traces (connections between hex centers)
    const traceMat = new THREE.LineBasicMaterial({ color: 0x7fa8c9, transparent: true, opacity: 0.06 });
    for (let i = 0; i < hexes.length; i++) {
      for (let j = i + 1; j < hexes.length; j++) {
        if (hexes[i].position.distanceTo(hexes[j].position) < 1.2) {
          const geo = new THREE.BufferGeometry().setFromPoints([hexes[i].position.clone(), hexes[j].position.clone()]);
          hexGroup.add(new THREE.Line(geo, traceMat));
        }
      }
    }

    // Data pulses (particles flowing along traces)
    const pCount = 150;
    const pPos = new Float32Array(pCount * 3);
    const pVel = [];
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 10;
      pPos[i * 3 + 1] = 0.1;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 7;
      pVel.push({ x: (Math.random() - 0.5) * 0.015, z: (Math.random() - 0.5) * 0.015 });
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.05, transparent: true, opacity: 0.5 })));

    // Central processor (floating cube)
    const cpu = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.15, 0.8),
      new THREE.MeshBasicMaterial({ color: 0xc8d6e5, wireframe: true, transparent: true, opacity: 0.2 })
    );
    cpu.position.y = 0.3;
    scene.add(cpu);

    const clk = new THREE.Clock();
    (function tick() {
      requestAnimationFrame(tick);
      const t = clk.getElapsedTime();

      // Hex pulse wave (ripple từ tâm ra ngoài)
      hexes.forEach(h => {
        const dist = h.position.length();
        const wave = Math.sin(t * 2 - dist * 0.8);
        h.material.opacity = h._baseOp + wave * 0.04;
        h.position.y = Math.sin(t * 0.8 + h._phase) * 0.05;
      });

      // Data pulses
      const pos = pGeo.attributes.position.array;
      for (let i = 0; i < pCount; i++) {
        pos[i * 3] += pVel[i].x;
        pos[i * 3 + 2] += pVel[i].z;
        if (Math.abs(pos[i * 3]) > 5) pVel[i].x *= -1;
        if (Math.abs(pos[i * 3 + 2]) > 3.5) pVel[i].z *= -1;
      }
      pGeo.attributes.position.needsUpdate = true;

      cpu.rotation.y = t * 0.3;
      cpu.position.y = 0.3 + Math.sin(t * 0.5) * 0.1;
      hexGroup.rotation.y = t * 0.02;

      cam.position.x += (gmx * 2 - cam.position.x) * 0.02;
      cam.position.z += (8 - gmy * 1.5 - cam.position.z) * 0.02;
      cam.lookAt(0, 0, 0);
      ctx.r.render(scene, cam);
    })();
  })();

  /* ────────────────────────────────────────────────────────────
     C. EXPERIENCE — Ascending Helix Path (Career Growth)
     Ý nghĩa: Con đường sự nghiệp đi lên, mỗi nút = mốc quan trọng
     Vị trí: Lệch trái, dọc theo timeline
     ──────────────────────────────────────────────────────────── */
  (function() {
    const ctx = makeCtx('exp-3d');
    if (!ctx) return;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(50, ctx.w / ctx.h, 0.1, 100);
    cam.position.set(-4, 2, 7);
    window.addEventListener('resize', () => { const s = ctx.resize(); cam.aspect = s.w / s.h; cam.updateProjectionMatrix(); });

    scene.add(new THREE.AmbientLight(0x0a1520, 1));
    const pL = new THREE.PointLight(0xc8d6e5, 2, 20);
    pL.position.set(-2, 5, 5); scene.add(pL);

    // Ascending helix path
    const pathGroup = new THREE.Group();
    pathGroup.position.set(-2.5, -3, 0);
    scene.add(pathGroup);

    const steps = 36;
    const helixR = 1.8;
    const totalH = 8;
    const pathPoints = [];
    const milestones = [6, 18, 30]; // 3 công ty

    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 3;
      const y = t * totalH;
      const x = Math.cos(angle) * helixR;
      const z = Math.sin(angle) * helixR;
      pathPoints.push(new THREE.Vector3(x, y, z));

      // Path node (nhỏ)
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x7fa8c9, transparent: true, opacity: 0.4 })
      );
      node.position.set(x, y, z);
      pathGroup.add(node);
    }

    // Path line
    const pathGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
    pathGroup.add(new THREE.Line(pathGeo, new THREE.LineBasicMaterial({
      color: 0x7fa8c9, transparent: true, opacity: 0.15
    })));

    // Milestone markers (3 công ty)
    const msColors = [0x4ade80, 0x22d3ee, 0xa78bfa];
    milestones.forEach((idx, i) => {
      const pt = pathPoints[idx];
      // Glowing sphere
      const ms = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        new THREE.MeshBasicMaterial({ color: msColors[i], transparent: true, opacity: 0.8 })
      );
      ms.position.copy(pt);
      pathGroup.add(ms);

      // Glow
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 12, 12),
        new THREE.MeshBasicMaterial({ color: msColors[i], transparent: true, opacity: 0.15, side: THREE.BackSide })
      );
      glow.position.copy(pt);
      glow._i = i;
      pathGroup.add(glow);

      // Ring
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.35, 0.008, 4, 32),
        new THREE.MeshBasicMaterial({ color: msColors[i], transparent: true, opacity: 0.25 })
      );
      ring.position.copy(pt);
      ring._i = i;
      pathGroup.add(ring);
    });

    // Ascending particles (energy flowing up)
    const apCount = 80;
    const apPos = new Float32Array(apCount * 3);
    const apData = [];
    for (let i = 0; i < apCount; i++) {
      const t = Math.random();
      const angle = t * Math.PI * 3;
      apPos[i * 3] = Math.cos(angle) * (helixR + (Math.random() - 0.5) * 0.5);
      apPos[i * 3 + 1] = t * totalH;
      apPos[i * 3 + 2] = Math.sin(angle) * (helixR + (Math.random() - 0.5) * 0.5);
      apData.push({ speed: 0.01 + Math.random() * 0.02 });
    }
    const apGeo = new THREE.BufferGeometry();
    apGeo.setAttribute('position', new THREE.BufferAttribute(apPos, 3));
    pathGroup.add(new THREE.Points(apGeo, new THREE.PointsMaterial({
      color: 0x22d3ee, size: 0.04, transparent: true, opacity: 0.45
    })));

    const clk = new THREE.Clock();
    (function tick() {
      requestAnimationFrame(tick);
      const t = clk.getElapsedTime();

      pathGroup.rotation.y = t * 0.06;

      // Milestone pulse
      pathGroup.children.forEach(child => {
        if (child.geometry && child.geometry.type === 'TorusGeometry' && child._i !== undefined) {
          child.rotation.x = Math.PI / 2 + Math.sin(t + child._i) * 0.3;
          child.rotation.z = t * 0.3 * (child._i + 1);
        }
        if (child.material && child.material.side === THREE.BackSide && child._i !== undefined) {
          child.material.opacity = 0.1 + Math.sin(t * 2 + child._i) * 0.08;
          child.scale.setScalar(1 + Math.sin(t * 2.5 + child._i) * 0.15);
        }
      });

      // Particles ascend
      const pos = apGeo.attributes.position.array;
      for (let i = 0; i < apCount; i++) {
        pos[i * 3 + 1] += apData[i].speed;
        if (pos[i * 3 + 1] > totalH) {
          pos[i * 3 + 1] = 0;
          const angle = (pos[i * 3 + 1] / totalH) * Math.PI * 3;
          pos[i * 3] = Math.cos(angle) * helixR;
          pos[i * 3 + 2] = Math.sin(angle) * helixR;
        }
      }
      apGeo.attributes.position.needsUpdate = true;

      cam.position.x += (-4 + gmx * 1.5 - cam.position.x) * 0.02;
      cam.position.y += (2 - gmy * 1 - cam.position.y) * 0.02;
      cam.lookAt(pathGroup.position.x, pathGroup.position.y + totalH / 2, pathGroup.position.z);
      ctx.r.render(scene, cam);
    })();
  })();

  /* ────────────────────────────────────────────────────────────
     D. PROJECTS — Floating Holographic Screens
     Ý nghĩa: Mỗi màn hình = 1 dự án, thể hiện sản phẩm đa dạng
     Vị trí: Phân bổ đều, tạo chiều sâu
     ──────────────────────────────────────────────────────────── */
  (function() {
    const ctx = makeCtx('projects-3d');
    if (!ctx) return;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(50, ctx.w / ctx.h, 0.1, 100);
    cam.position.set(0, 0, 10);
    window.addEventListener('resize', () => { const s = ctx.resize(); cam.aspect = s.w / s.h; cam.updateProjectionMatrix(); });

    const screenGroup = new THREE.Group();
    scene.add(screenGroup);

    // 8 floating screens (tương ứng 8 projects)
    const screenColors = [0x22d3ee, 0xfb923c, 0x34d399, 0xa3e635, 0x38bdf8, 0xc084fc, 0xfb7185, 0xfbbf24];
    const screens = [];

    const positions = [
      [-4.5, 2, -3], [4.5, 2.5, -2], [-3, -1.5, -1], [3.5, -1, -2],
      [-5, 0.5, -4], [5, -2, -3], [-1.5, 3, -5], [2, -3, -4]
    ];

    positions.forEach((pos, i) => {
      const group = new THREE.Group();

      // Screen frame
      const frame = new THREE.Mesh(
        new THREE.PlaneGeometry(1.4, 0.9),
        new THREE.MeshBasicMaterial({ color: screenColors[i], transparent: true, opacity: 0.04, side: THREE.DoubleSide })
      );
      group.add(frame);

      // Screen border
      const border = new THREE.Mesh(
        new THREE.PlaneGeometry(1.45, 0.95),
        new THREE.MeshBasicMaterial({ color: screenColors[i], wireframe: true, transparent: true, opacity: 0.15, side: THREE.DoubleSide })
      );
      group.add(border);

      // Scan line inside screen
      const scanGeo = new THREE.PlaneGeometry(1.3, 0.01);
      const scan = new THREE.Mesh(scanGeo, new THREE.MeshBasicMaterial({
        color: screenColors[i], transparent: true, opacity: 0.3, side: THREE.DoubleSide
      }));
      scan.position.z = 0.01;
      group.add(scan);

      // Code lines (horizontal bars inside screen)
      for (let j = 0; j < 4; j++) {
        const lineW = 0.3 + Math.random() * 0.7;
        const codeLine = new THREE.Mesh(
          new THREE.PlaneGeometry(lineW, 0.03),
          new THREE.MeshBasicMaterial({ color: screenColors[i], transparent: true, opacity: 0.12, side: THREE.DoubleSide })
        );
        codeLine.position.set(-0.5 + lineW / 2, 0.25 - j * 0.15, 0.01);
        group.add(codeLine);
      }

      // Corner brackets
      const bracketMat = new THREE.LineBasicMaterial({ color: screenColors[i], transparent: true, opacity: 0.3 });
      const corners = [[-0.72, 0.47], [0.72, 0.47], [-0.72, -0.47], [0.72, -0.47]];
      corners.forEach(([cx, cy], ci) => {
        const dx = ci % 2 === 0 ? 0.1 : -0.1;
        const dy = ci < 2 ? -0.1 : 0.1;
        const pts = [new THREE.Vector3(cx + dx, cy, 0.02), new THREE.Vector3(cx, cy, 0.02), new THREE.Vector3(cx, cy + dy, 0.02)];
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), bracketMat));
      });

      group.position.set(...pos);
      group.lookAt(cam.position);
      group._scan = scan;
      group._baseY = pos[1];
      group._phase = i * 0.8;
      group._i = i;
      screenGroup.add(group);
      screens.push(group);
    });

    // Connection lines between screens (data flow)
    const connMat = new THREE.LineBasicMaterial({ color: 0x7fa8c9, transparent: true, opacity: 0.04 });
    for (let i = 0; i < screens.length - 1; i++) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        screens[i].position.clone(), screens[i + 1].position.clone()
      ]);
      scene.add(new THREE.Line(geo, connMat));
    }

    const clk = new THREE.Clock();
    (function tick() {
      requestAnimationFrame(tick);
      const t = clk.getElapsedTime();

      screens.forEach(s => {
        // Float gently
        s.position.y = s._baseY + Math.sin(t * 0.4 + s._phase) * 0.2;
        // Face camera
        s.lookAt(cam.position);
        // Scan line animation
        if (s._scan) {
          s._scan.position.y = Math.sin(t * 1.5 + s._phase) * 0.35;
        }
      });

      cam.position.x += (gmx * 2.5 - cam.position.x) * 0.02;
      cam.position.y += (-gmy * 1.5 - cam.position.y) * 0.02;
      cam.lookAt(0, 0, -2);
      ctx.r.render(scene, cam);
    })();
  })();

  /* ────────────────────────────────────────────────────────────
     E. PERSONAL PROJECT — AI Sidebar Extension Lab
     Ý nghĩa: Browser extension, vùng highlight, AI sidebar, local storage, privacy shield
     Vị trí: Hologram nổi phía sau card personal project
     ──────────────────────────────────────────────────────────── */
  (function() {
    const ctx = makeCtx('personal-3d');
    if (!ctx) return;

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(48, ctx.w / ctx.h, 0.1, 100);
    const root = new THREE.Group();
    const browser = new THREE.Group();
    const providerLines = [];
    const providers = [];
    const storageLayers = [];
    let camBase = new THREE.Vector3(0, 1.15, 7.8);

    scene.add(root);
    root.add(browser);
    scene.add(new THREE.AmbientLight(0x0a1828, 0.9));

    const key = new THREE.PointLight(0x22d3ee, 1.2, 10);
    key.position.set(2.5, 2.4, 4);
    scene.add(key);

    function basicMat(color, opacity) {
      return new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
    }

    function plane(w, h, color, opacity) {
      return new THREE.Mesh(new THREE.PlaneGeometry(w, h), basicMat(color, opacity));
    }

    function rectLine(w, h, color, opacity, z) {
      const x = w / 2;
      const y = h / 2;
      const pts = [
        new THREE.Vector3(-x, y, z || 0),
        new THREE.Vector3(x, y, z || 0),
        new THREE.Vector3(x, -y, z || 0),
        new THREE.Vector3(-x, -y, z || 0),
        new THREE.Vector3(-x, y, z || 0),
      ];
      return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false })
      );
    }

    function makeBar(w, h, color, opacity, x, y, z) {
      const bar = plane(w, h, color, opacity);
      bar.position.set(x, y, z || 0.04);
      return bar;
    }

    const shell = plane(4.35, 2.65, 0x071522, 0.2);
    shell.position.z = 0;
    browser.add(shell);
    browser.add(rectLine(4.35, 2.65, 0xc8d6e5, 0.2, 0.035));

    const topBar = plane(4.35, 0.25, 0x7fa8c9, 0.07);
    topBar.position.set(0, 1.2, 0.04);
    browser.add(topBar);

    [0xff6b6b, 0xfbbf24, 0x4ade80].forEach((color, i) => {
      const dot = new THREE.Mesh(
        new THREE.CircleGeometry(0.035, 16),
        basicMat(color, 0.55)
      );
      dot.position.set(-1.95 + i * 0.13, 1.2, 0.08);
      browser.add(dot);
    });

    const contentLines = [
      [-1.42, 0.78, 1.35, 0x7fa8c9, 0.15],
      [-1.36, 0.52, 1.72, 0xc8d6e5, 0.12],
      [-1.44, 0.28, 1.62, 0xfbbf24, 0.18],
      [-1.52, 0.05, 1.25, 0xc8d6e5, 0.1],
      [-1.4, -0.18, 1.58, 0x7fa8c9, 0.1],
      [-1.55, -0.42, 1.15, 0xc8d6e5, 0.08],
    ];
    contentLines.forEach(([x, y, w, color, opacity]) => browser.add(makeBar(w, 0.055, color, opacity, x, y, 0.07)));

    const highlight = makeBar(1.72, 0.18, 0xfbbf24, 0.16, -1.12, 0.28, 0.085);
    browser.add(highlight);
    browser.add(rectLine(1.72, 0.18, 0xfbbf24, 0.26, 0.1).translateX(-1.12).translateY(0.28));

    const sidebar = plane(1.17, 2.12, 0x22d3ee, 0.07);
    sidebar.position.set(1.23, -0.02, 0.07);
    browser.add(sidebar);
    const sidebarFrame = rectLine(1.17, 2.12, 0x22d3ee, 0.28, 0.1);
    sidebarFrame.position.set(1.23, -0.02, 0);
    browser.add(sidebarFrame);

    const iconHolder = plane(0.68, 0.68, 0x06101b, 0.36);
    iconHolder.position.set(1.23, 0.68, 0.12);
    browser.add(iconHolder);
    browser.add(rectLine(0.68, 0.68, 0x22d3ee, 0.22, 0.14).translateX(1.23).translateY(0.68));

    const iconMat = basicMat(0xffffff, 0.82);
    const iconPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.54, 0.54), iconMat);
    iconPlane.position.set(1.23, 0.68, 0.16);
    browser.add(iconPlane);
    new THREE.TextureLoader().load('icon.png', tex => {
      if (ctx.r.capabilities && ctx.r.capabilities.getMaxAnisotropy) {
        tex.anisotropy = Math.min(ctx.r.capabilities.getMaxAnisotropy(), 4);
      }
      iconMat.map = tex;
      iconMat.needsUpdate = true;
    }, undefined, () => {
      iconMat.color.set(0x22d3ee);
      iconMat.opacity = 0.18;
    });

    const sideScan = plane(1.0, 0.035, 0x22d3ee, 0.4);
    sideScan.position.set(1.23, 0.5, 0.19);
    browser.add(sideScan);

    [
      [0.92, 0.18, 0.52],
      [1.03, -0.05, 0.72],
      [0.98, -0.28, 0.58],
    ].forEach(([x, y, w], i) => {
      const row = makeBar(w, 0.045, i === 1 ? 0xa3e635 : 0xc8d6e5, i === 1 ? 0.2 : 0.1, x, y, 0.14);
      browser.add(row);
    });

    const askButton = plane(0.72, 0.2, 0x22d3ee, 0.16);
    askButton.position.set(1.23, -0.62, 0.14);
    browser.add(askButton);
    browser.add(rectLine(0.72, 0.2, 0x22d3ee, 0.34, 0.16).translateX(1.23).translateY(-0.62));

    const cursor = new THREE.Mesh(
      new THREE.ConeGeometry(0.06, 0.18, 3),
      basicMat(0xc8d6e5, 0.72)
    );
    cursor.rotation.z = -Math.PI / 5;
    cursor.position.set(0.72, -0.55, 0.2);
    browser.add(cursor);

    const storage = new THREE.Group();
    storage.position.set(-1.55, -0.95, 0.11);
    browser.add(storage);
    for (let i = 0; i < 4; i++) {
      const layer = new THREE.Mesh(
        new THREE.BoxGeometry(0.88 - i * 0.08, 0.08, 0.12),
        basicMat(i % 2 ? 0x7fa8c9 : 0xc8d6e5, 0.16 + i * 0.035)
      );
      layer.position.y = i * 0.12;
      storage.add(layer);
      storageLayers.push(layer);
    }
    storage.add(rectLine(1.02, 0.62, 0x7fa8c9, 0.14, 0.1));

    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 0.43);
    shieldShape.lineTo(0.34, 0.25);
    shieldShape.lineTo(0.26, -0.24);
    shieldShape.lineTo(0, -0.5);
    shieldShape.lineTo(-0.26, -0.24);
    shieldShape.lineTo(-0.34, 0.25);
    shieldShape.lineTo(0, 0.43);

    const shield = new THREE.Mesh(new THREE.ShapeGeometry(shieldShape), basicMat(0x38bdf8, 0.18));
    shield.position.set(1.78, -0.78, 0.18);
    browser.add(shield);
    const shieldRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.46, 0.006, 4, 60),
      basicMat(0x38bdf8, 0.35)
    );
    shieldRing.position.set(1.78, -0.78, 0.2);
    browser.add(shieldRing);

    const providerSpecs = [
      { base: new THREE.Vector3(-2.35, 1.46, -0.45), color: 0x4ade80 },
      { base: new THREE.Vector3(0.05, 1.92, -0.72), color: 0x38bdf8 },
      { base: new THREE.Vector3(2.42, 1.25, -0.52), color: 0xfb923c },
    ];
    const providerAnchor = new THREE.Vector3(1.23, 0.06, 0.15);
    providerSpecs.forEach((spec, i) => {
      const group = new THREE.Group();
      const node = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.14, 0),
        basicMat(spec.color, 0.78)
      );
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.34, 16, 16),
        basicMat(spec.color, 0.08)
      );
      group.add(glow, node);
      group.position.copy(spec.base);
      root.add(group);

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      const line = new THREE.Line(
        lineGeo,
        new THREE.LineBasicMaterial({ color: spec.color, transparent: true, opacity: 0.16, depthWrite: false })
      );
      root.add(line);
      providerLines.push({ line, group, color: spec.color });
      providers.push({ group, node, glow, base: spec.base, phase: i * 1.15 });
    });

    const orbitRingA = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.006, 4, 120),
      basicMat(0x22d3ee, 0.16)
    );
    orbitRingA.rotation.x = Math.PI * 0.55;
    root.add(orbitRingA);

    const orbitRingB = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.005, 4, 100),
      basicMat(0xc8d6e5, 0.1)
    );
    orbitRingB.rotation.x = Math.PI * 0.23;
    orbitRingB.rotation.y = Math.PI * 0.38;
    root.add(orbitRingB);

    const pCount = 150;
    const pPos = new Float32Array(pCount * 3);
    const pData = [];
    for (let i = 0; i < pCount; i++) {
      pData.push({
        a: Math.random() * Math.PI * 2,
        r: 1.35 + Math.random() * 1.65,
        y: -1.1 + Math.random() * 2.35,
        speed: 0.002 + Math.random() * 0.004,
      });
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    root.add(new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.035, transparent: true, opacity: 0.48, depthWrite: false })
    ));

    function layout(w) {
      if (w < 768) {
        root.position.set(0.12, -0.28, 0);
        root.scale.setScalar(0.72);
        camBase.set(0, 0.78, 8.45);
      } else {
        root.position.set(1.08, -0.02, 0);
        root.scale.setScalar(1.05);
        camBase.set(0, 1.15, 7.8);
      }
    }

    function resize() {
      const s = ctx.resize();
      cam.aspect = s.w / s.h;
      cam.updateProjectionMatrix();
      layout(s.w);
      if (!cam.userData.ready) {
        cam.position.copy(camBase);
        cam.userData.ready = true;
      }
    }
    window.addEventListener('resize', resize);
    resize();

    const clk = new THREE.Clock();
    (function tick() {
      requestAnimationFrame(tick);
      const t = clk.getElapsedTime();

      browser.position.y = Math.sin(t * 0.7) * 0.08;
      browser.rotation.z = Math.sin(t * 0.42) * 0.018;
      root.rotation.y += (gmx * 0.18 + Math.sin(t * 0.34) * 0.045 - root.rotation.y) * 0.035;
      root.rotation.x += (-gmy * 0.08 - root.rotation.x) * 0.035;

      const scanPhase = (t * 0.42) % 1;
      sideScan.position.y = 0.86 - scanPhase * 1.55;
      sideScan.material.opacity = 0.14 + Math.sin(scanPhase * Math.PI) * 0.34;
      highlight.material.opacity = 0.12 + Math.sin(t * 2.4) * 0.05;
      cursor.position.x = 0.72 + Math.sin(t * 1.5) * 0.08;
      cursor.position.y = -0.55 + Math.cos(t * 1.2) * 0.04;

      shield.rotation.z = Math.sin(t * 1.1) * 0.07;
      shieldRing.rotation.z = t * 0.75;
      shieldRing.material.opacity = 0.22 + Math.sin(t * 2.1) * 0.11;

      orbitRingA.rotation.z = t * 0.18;
      orbitRingB.rotation.z = -t * 0.12;

      storageLayers.forEach((layer, i) => {
        layer.position.z = Math.sin(t * 1.8 + i * 0.55) * 0.025;
        layer.material.opacity = 0.14 + i * 0.035 + Math.sin(t * 2 + i) * 0.025;
      });

      providers.forEach((p, i) => {
        p.group.position.x = p.base.x + Math.sin(t * 0.62 + p.phase) * 0.14;
        p.group.position.y = p.base.y + Math.cos(t * 0.54 + p.phase) * 0.11;
        p.group.position.z = p.base.z + Math.sin(t * 0.8 + p.phase) * 0.08;
        p.node.rotation.x = t * 0.7 + i;
        p.node.rotation.y = -t * 0.9 + i;
        p.node.scale.setScalar(1 + Math.sin(t * 2.4 + i) * 0.12);
        p.glow.material.opacity = 0.055 + Math.sin(t * 2.1 + i) * 0.025;
      });

      providerLines.forEach(({ line, group }) => {
        const pos = line.geometry.attributes.position.array;
        pos[0] = providerAnchor.x; pos[1] = providerAnchor.y; pos[2] = providerAnchor.z;
        pos[3] = group.position.x; pos[4] = group.position.y; pos[5] = group.position.z;
        line.geometry.attributes.position.needsUpdate = true;
        line.material.opacity = 0.1 + Math.sin(t * 1.7 + group.position.x) * 0.045;
      });

      for (let i = 0; i < pCount; i++) {
        const d = pData[i];
        d.a += d.speed;
        pPos[i * 3] = Math.cos(d.a) * d.r;
        pPos[i * 3 + 1] = d.y + Math.sin(t * 0.8 + d.a) * 0.18;
        pPos[i * 3 + 2] = Math.sin(d.a) * d.r * 0.42 - 0.2;
      }
      pGeo.attributes.position.needsUpdate = true;

      cam.position.x += (camBase.x + gmx * 1.1 - cam.position.x) * 0.025;
      cam.position.y += (camBase.y - gmy * 0.45 - cam.position.y) * 0.025;
      cam.position.z += (camBase.z - cam.position.z) * 0.025;
      cam.lookAt(root.position.x * 0.25, 0, 0);
      ctx.r.render(scene, cam);
    })();
  })();

  /* ────────────────────────────────────────────────────────────
     F. CONTACT — Signal Broadcast Waves
     Ý nghĩa: Sóng tín hiệu phát ra = kết nối, liên lạc
     Vị trí: Trung tâm (phù hợp layout centered)
     ──────────────────────────────────────────────────────────── */
  (function() {
    const ctx = makeCtx('contact-3d');
    if (!ctx) return;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(50, ctx.w / ctx.h, 0.1, 100);
    cam.position.set(0, 2, 7);
    window.addEventListener('resize', () => { const s = ctx.resize(); cam.aspect = s.w / s.h; cam.updateProjectionMatrix(); });

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Central antenna / transmitter
    const antenna = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 1.2, 6),
      new THREE.MeshBasicMaterial({ color: 0xc8d6e5, transparent: true, opacity: 0.3 })
    );
    antenna.position.y = 0.6;
    coreGroup.add(antenna);

    // Antenna top (diamond)
    const diamond = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.15, 0),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.7 })
    );
    diamond.position.y = 1.3;
    coreGroup.add(diamond);

    // Diamond glow
    const diamondGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.08, side: THREE.BackSide })
    );
    diamondGlow.position.y = 1.3;
    coreGroup.add(diamondGlow);

    // Base platform
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.6, 0.08, 6),
      new THREE.MeshBasicMaterial({ color: 0x7fa8c9, wireframe: true, transparent: true, opacity: 0.2 })
    );
    coreGroup.add(base);

    // Signal wave rings (expanding from top)
    const waveRings = [];
    for (let i = 0; i < 5; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.3, 0.008, 4, 48),
        new THREE.MeshBasicMaterial({
          color: [0x22d3ee, 0x4ade80, 0xa78bfa, 0xc8d6e5, 0x22d3ee][i],
          transparent: true, opacity: 0.35
        })
      );
      ring.position.y = 1.3;
      ring.rotation.x = Math.PI / 2;
      ring._delay = i * 0.6;
      coreGroup.add(ring);
      waveRings.push(ring);
    }

    // Endpoint nodes (destinations — email, phone, github)
    const endpoints = [
      { pos: [-3, 1.5, -1], color: 0x22d3ee },  // email
      { pos: [3, 0.5, -1], color: 0x4ade80 },    // phone
      { pos: [0, 3.5, -2], color: 0xa78bfa },    // github
    ];
    const epMeshes = [];
    endpoints.forEach(ep => {
      const node = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.1, 0),
        new THREE.MeshBasicMaterial({ color: ep.color, transparent: true, opacity: 0.6 })
      );
      node.position.set(...ep.pos);
      coreGroup.add(node);
      epMeshes.push(node);

      // Connection line
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 1.3, 0), node.position.clone()
      ]);
      coreGroup.add(new THREE.Line(geo, new THREE.LineBasicMaterial({
        color: ep.color, transparent: true, opacity: 0.06
      })));
    });

    // Grid floor
    const gridH = new THREE.GridHelper(10, 20, 0x0a1828, 0x0a1828);
    gridH.material.transparent = true; gridH.material.opacity = 0.08;
    gridH.position.y = -0.5;
    scene.add(gridH);

    const clk = new THREE.Clock();
    (function tick() {
      requestAnimationFrame(tick);
      const t = clk.getElapsedTime();

      diamond.rotation.y = t * 0.8;
      diamond.rotation.x = t * 0.4;
      diamond.material.opacity = 0.5 + Math.sin(t * 3) * 0.2;
      diamondGlow.material.opacity = 0.05 + Math.sin(t * 2) * 0.05;
      diamondGlow.scale.setScalar(1 + Math.sin(t * 2.5) * 0.2);

      // Wave rings expand and fade
      waveRings.forEach(ring => {
        const phase = ((t - ring._delay) * 0.6) % 2.5;
        if (phase > 0) {
          const scale = 1 + phase * 2.5;
          ring.scale.setScalar(scale);
          ring.material.opacity = Math.max(0, 0.35 - phase * 0.14);
        }
      });

      // Endpoint pulse
      epMeshes.forEach((ep, i) => {
        ep.rotation.y = t * 0.5;
        ep.rotation.x = t * 0.3;
        ep.material.opacity = 0.4 + Math.sin(t * 2 + i) * 0.2;
      });

      coreGroup.rotation.y = t * 0.04;
      cam.position.x += (gmx * 1.5 - cam.position.x) * 0.02;
      cam.position.y += (2 - gmy * 0.8 - cam.position.y) * 0.02;
      cam.lookAt(0, 1, 0);
      ctx.r.render(scene, cam);
    })();
  })();

})();
