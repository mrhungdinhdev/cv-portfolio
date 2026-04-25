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
    const r = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: true });
    r.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    const sec = c.parentElement;
    function resize() { const w = sec.clientWidth, h = sec.clientHeight; r.setSize(w, h); return { w, h }; }
    const sz = resize();
    window.addEventListener('resize', resize);
    return { r, sec, w: sz.w, h: sz.h, resize };
  }

  /* ────────────────────────────────────────────────────────────
     A. ABOUT — 3D Earth Globe with HCM pin
     Ý nghĩa: Thể hiện vị trí địa lý, bản sắc cá nhân
     Vị trí: Lệch phải để cân đối với text bên trái
     ──────────────────────────────────────────────────────────── */
  (function() {
    const ctx = makeCtx('about-3d');
    if (!ctx) return;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(45, ctx.w / ctx.h, 0.1, 100);
    cam.position.set(3, 0.5, 6);
    window.addEventListener('resize', () => { const s = ctx.resize(); cam.aspect = s.w / s.h; cam.updateProjectionMatrix(); });

    // Ambient + directional light for realism
    scene.add(new THREE.AmbientLight(0x1a2a3a, 0.8));
    const dLight = new THREE.DirectionalLight(0xc8d6e5, 1.2);
    dLight.position.set(5, 3, 5); scene.add(dLight);

    // Earth sphere
    const earthGeo = new THREE.SphereGeometry(1.8, 48, 48);
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0x0a1828, emissive: 0x050d15, shininess: 60, specular: 0x3a5a7a,
      transparent: true, opacity: 0.9
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earth.position.set(3, 0, 0);
    scene.add(earth);

    // Wireframe grid overlay (giống lưới kinh/vĩ tuyến)
    const wireEarth = new THREE.Mesh(
      new THREE.SphereGeometry(1.82, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0x7fa8c9, wireframe: true, transparent: true, opacity: 0.08 })
    );
    wireEarth.position.copy(earth.position);
    scene.add(wireEarth);

    // Atmosphere glow
    const atm = new THREE.Mesh(
      new THREE.SphereGeometry(2.0, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.04, side: THREE.BackSide })
    );
    atm.position.copy(earth.position);
    scene.add(atm);

    // Meridian rings (kinh tuyến)
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.85, 0.005, 4, 80),
        new THREE.MeshBasicMaterial({ color: 0x7fa8c9, transparent: true, opacity: 0.12 })
      );
      ring.position.copy(earth.position);
      ring.rotation.y = (Math.PI / 3) * i;
      scene.add(ring);
    }
    // Equator ring
    const eqRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.008, 4, 80),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.2 })
    );
    eqRing.position.copy(earth.position);
    eqRing.rotation.x = Math.PI / 2;
    scene.add(eqRing);

    // HCM City pin (lat:10.8N, lon:106.7E)
    const latRad = (10.8 * Math.PI) / 180;
    const lonRad = (106.7 * Math.PI) / 180;
    const pinR = 1.84;
    const pinPos = new THREE.Vector3(
      pinR * Math.cos(latRad) * Math.cos(lonRad),
      pinR * Math.sin(latRad),
      pinR * Math.cos(latRad) * Math.sin(lonRad)
    );

    // Glowing pin
    const pin = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xff6b6b })
    );
    const pinGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.3 })
    );

    const pinGroup = new THREE.Group();
    pinGroup.add(pin); pinGroup.add(pinGlow);
    earth.add(pinGroup);
    pinGroup.position.copy(pinPos);

    // Pulse rings from pin
    const pulseRings = [];
    for (let i = 0; i < 3; i++) {
      const pr = new THREE.Mesh(
        new THREE.TorusGeometry(0.1 + i * 0.12, 0.003, 4, 32),
        new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.4 })
      );
      pr.position.copy(pinPos);
      pr.lookAt(0, 0, 0);
      pr._i = i;
      earth.add(pr);
      pulseRings.push(pr);
    }

    // Orbiting data points (satellites)
    const sats = [];
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.04, 0),
        new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.6 })
      );
      s._orbit = 2.2 + i * 0.25;
      s._speed = 0.15 + i * 0.08;
      s._phase = (Math.PI * 2 / 5) * i;
      s._tilt = 0.3 + i * 0.15;
      scene.add(s);
      sats.push(s);
    }

    const clk = new THREE.Clock();
    (function tick() {
      requestAnimationFrame(tick);
      const t = clk.getElapsedTime();
      earth.rotation.y = t * 0.08;
      wireEarth.rotation.y = t * 0.08;
      atm.rotation.y = t * 0.05;

      pinGlow.material.opacity = 0.2 + Math.sin(t * 3) * 0.15;
      pulseRings.forEach(pr => {
        const phase = (t * 1.5 + pr._i * 0.8) % 3;
        const scale = 1 + phase * 0.8;
        pr.scale.setScalar(scale);
        pr.material.opacity = Math.max(0, 0.5 - phase * 0.18);
      });

      sats.forEach(s => {
        const a = t * s._speed + s._phase;
        s.position.set(
          earth.position.x + Math.cos(a) * s._orbit,
          earth.position.y + Math.sin(a * 0.7) * s._orbit * 0.3,
          earth.position.z + Math.sin(a) * s._orbit
        );
        s.rotation.y = t;
      });

      cam.position.x += (3 + gmx * 1.5 - cam.position.x) * 0.02;
      cam.position.y += (0.5 - gmy * 0.8 - cam.position.y) * 0.02;
      cam.lookAt(earth.position);
      ctx.r.render(scene, cam);
    })();
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
     E. CONTACT — Signal Broadcast Waves
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
