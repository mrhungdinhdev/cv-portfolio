'use strict';

/* ── I18N ── */
const T = {
  en: {
    nav_about:'ABOUT', nav_skills:'SKILLS', nav_exp:'EXP', nav_projects:'PROJECTS', nav_personal:'PERSONAL', nav_edu:'EDU', nav_contact:'CONTACT',
    mob_about:'ABOUT', mob_skills:'SKILLS', mob_experience:'EXPERIENCE', mob_projects:'PROJECTS', mob_personal:'PERSONAL PROJECT', mob_education:'EDUCATION', mob_contact:'CONTACT',
    hero_status:'// SYSTEM ONLINE  ·  AVAILABLE FOR HIRE',
    hero_role_title:'FULL STACK DEVELOPER',
    hero_desc:'Building scalable APIs, cloud architectures, AI-powered systems and real-world production apps that serve <span style="color:#8aa8c0;font-weight:600;">thousands of users</span> — from backend to full-stack.',
    hero_contact:'CONTACT ME ›', hero_exp:'YRS EXPERIENCE', hero_proj:'PROJECTS SHIPPED', hero_scroll:'SCROLL',
    about_label:'01 — ABOUT', about_title:'Who I am',
    about_p1:'I\'m a <span style="color:#8aa8c0;font-weight:600;">Full Stack Developer</span> with 3 years of hands-on experience specialising in backend development and system design.',
    about_p2:'Core stack: <span class="text-st font-mono">Laravel</span> · <span class="text-st font-mono">NestJS</span> · <span class="text-st font-mono">Node.js</span> · <span class="text-st font-mono">AWS</span>. Experienced in building RESTful APIs, AI-powered platforms, distributed systems, and cloud-native architectures.',
    about_p3:'From scalable web systems to multi-agent AI — I ship full-stack systems that <span style="color:#8aa8c0;font-weight:600;">real users depend on</span>.',
    about_address:'11 Street, Tam Binh Ward, Thu Duc City, Ho Chi Minh City',
    about_tracking:'GPS tracker on rotating Earth · click to launch finder ship',
    about_born:'Born 28 January 2002',
    about_lang:'Vietnamese (Native) · English (Intermediate)',
    skills_label:'02 — SKILLS', skills_title:'Technical Stack',
    skill_lang:'LANGUAGES', skill_fe:'FRONTEND', skill_be:'BACKEND', skill_ai:'AI / DATA', skill_db:'DATABASES', skill_devops:'DEVOPS / CLOUD', skill_cms:'CMS / TOOLS',
    exp_label:'03 — EXPERIENCE', exp_title:'Work History', exp_role_fsd:'FULL STACK DEVELOPER',
    exp1_date:'AUG 2025 – PRESENT', exp1_badge:'● CURRENT',
    exp1_b1:'Build and maintain an AI-powered social media content generation platform with multi-tenant workspace support.',
    exp1_b2:'Develop a distributed web crawling worker for automated social media data collection using Redis Streams.',
    exp1_b3:'Design and develop a digital publishing platform (docsach.com.vn) with real-time reading features and e-book management.',
    exp2_date:'JAN 2025 – JUL 2025',
    exp2_b1:'Design and maintain scalable web-based systems across multiple business domains.',
    exp2_b2:'Optimise and upgrade existing systems for performance, reliability, and security.',
    exp2_b3:'Collaborate with cross-functional teams to deploy features aligned with business goals.',
    exp3_date:'JAN 2024 – DEC 2024',
    exp3_b1:'Engineered and maintained full-stack web applications for various client projects.',
    exp3_b2:'Developed core system features with a focus on performance and scalability.',
    exp3_b3:'Ensured code quality and security through testing and regular refactoring.',
    proj_label:'04 — PROJECTS', proj_title:'Highlighted Work',
    proj1_desc:'AI-powered social media content generation platform with multi-tenant workspaces, multi-agent architecture (4 agents/fanpage), and adaptive MPE learning framework.',
    proj1_internal:'// Internal Platform',
    proj2_desc:'Distributed worker consuming crawl jobs from Redis Streams. Supports Facebook, X/Twitter, Instagram, TikTok with persistent Playwright browser sessions.',
    proj2_internal:'// Internal Tool',
    proj3_desc:'Full-featured e-book publishing & reading platform with real-time reading progress, payment flows, and Socket.IO sidecar.',
    proj4_desc:'Vegetarian & vegan platform for Vietnam — web + 3 mobile apps for users, vendors, and delivery. Full ordering ecosystem with live exchange rates.',
    proj5_desc:'Task management platform with AI chat (ChatGPT) trained on customer data. Web + mobile on full AWS infrastructure (ECS, RDS, S3, CloudWatch).',
    proj6_desc:'Apply enterprise AI learning models to ChatGPT & Bard with full data isolation, perpetual learning, and PDF/Word/XML support.',
    proj7_desc:'Earn crypto watching & uploading videos. ERC-20 & NFT on BSC, NFT marketplace, wallet system, Solidity smart contracts.',
    proj8_desc:'Tech accessories e-commerce with full product, category, cart, and order management for smart purchasing decisions.',
    personal_label:'05 — PERSONAL PROJECT', personal_title:'Personal Project',
    personal_status:'// PERSONAL BUILD', personal_platform:'BROWSER EXTENSION',
    personal_desc:'A privacy-focused Chrome extension for highlighting, note-taking, and opt-in AI assistance. Users can select text, save context locally, or trigger Ask AI through OpenAI, Google Gemini, or Anthropic Claude.',
    personal_feature1_title:'ASK AI', personal_feature1_desc:'Selected text is sent to AI services only after user action.',
    personal_feature2_title:'LOCAL STORAGE', personal_feature2_desc:'Highlights, notes, and settings are stored with Chrome storage.',
    personal_feature3_title:'NO TRACKING', personal_feature3_desc:'No data selling, browsing-history collection, advertising, or profiling.',
    personal_privacy_link:'PRIVACY POLICY', personal_role_label:'ROLE', personal_role:'Solo Product Builder',
    personal_side_desc:'Built from product idea to extension UX, AI-provider routing, highlight and note persistence, settings storage, and privacy policy.',
    edu_label:'06 — EDUCATION', edu_title:'Academic Background',
    edu_school:'FPT Polytechnic College', edu_degree:'ADVANCED DIPLOMA IN INFORMATION TECHNOLOGY',
    edu_duration:'<span style="color:#8aa8c0;">Duration:</span> 2022 – 2024',
    edu_grad:'<span style="color:#8aa8c0;">Graduated:</span> Sep 30, 2024',
    edu_gpa:'<span style="color:#8aa8c0;">GPA:</span> 8.5 / 10',
    edu_rank:'<span style="color:#8aa8c0;">Rank:</span> Top 10%',
    edu_credits:'<span style="color:#8aa8c0;">Credits:</span> 103',
    edu_cert:'<span style="color:#8aa8c0;">Cert:</span> Academic English Lvl 3 – Topnotch 2',
    edu_badge:'DISTINCTION',
    contact_label:'07 — CONTACT', contact_title:"Let's work together", contact_sub:'// OPEN TO NEW OPPORTUNITIES',
    contact_email_lbl:'EMAIL', contact_phone_lbl:'PHONE', contact_github_lbl:'GITHUB', contact_btn:'SEND MESSAGE ›',
    chat_title:'HUNG AI ASSISTANT', chat_subtitle:'ASK ABOUT CV · SKILLS · PROJECTS',
    chat_launcher_title:'AI GUIDE',
    chat_launcher_sub:'Ask about Hùng',
    chat_mode_cv:'CV-grounded',
    chat_mode_voice:'Neural voice',
    chat_welcome:'Hi, I can answer questions about Hùng\'s skills, experience, projects, and contact information.',
    chat_placeholder:'Ask about skills, projects...',
    chat_quick_skills:'BACKEND SKILLS', chat_quick_projects:'PROJECTS', chat_quick_contact:'CONTACT',
    chat_presence:'LIVE VOICE READY',
    chat_voice_on:'Voice on',
    chat_voice_off:'Voice off',
    chat_voice_disclosure:'Voice is AI-generated.',
    chat_state_idle:'ATTENTIVE',
    chat_state_thinking:'THINKING',
    chat_state_speaking:'SPEAKING',
    chat_state_listening:'LISTENING',
    chat_state_hint:'AI-generated portfolio guide, ready to talk.',
    chat_state_hint_thinking:'Reading CV context and composing a grounded answer.',
    chat_state_hint_speaking:'Speaking the answer with neural voice when available.',
    chat_state_hint_listening:'Voice input is active. Speak clearly near your microphone.',
    chat_listening:'Listening...',
    chat_mic_unavailable:'Voice input is not supported in this browser.',
    chat_greeting:'Hi, I am Hùng\'s portfolio assistant. You can ask me about his skills, projects, experience, or contact details.',
    chat_loading:'Thinking through the CV data...',
    chat_empty:'Please enter a question.',
    chat_error:'The AI assistant is unavailable right now.',
    chat_unavailable:'No response.',
  },
  vi: {
    nav_about:'GIỚI THIỆU', nav_skills:'KỸ NĂNG', nav_exp:'KINH NGHIỆM', nav_projects:'DỰ ÁN', nav_personal:'CÁ NHÂN', nav_edu:'HỌC VẤN', nav_contact:'LIÊN HỆ',
    mob_about:'GIỚI THIỆU', mob_skills:'KỸ NĂNG', mob_experience:'KINH NGHIỆM', mob_projects:'DỰ ÁN', mob_personal:'DỰ ÁN CÁ NHÂN', mob_education:'HỌC VẤN', mob_contact:'LIÊN HỆ',
    hero_status:'// HỆ THỐNG ONLINE  ·  SẴN SÀNG NHẬN VIỆC',
    hero_role_title:'LẬP TRÌNH VIÊN FULL STACK',
    hero_desc:'Xây dựng APIs có khả năng mở rộng, kiến trúc cloud, hệ thống AI và ứng dụng thực tế phục vụ <span style="color:#8aa8c0;font-weight:600;">hàng nghìn người dùng</span> — từ backend đến full-stack.',
    hero_contact:'LIÊN HỆ TÔI ›', hero_exp:'NĂM KINH NGHIỆM', hero_proj:'DỰ ÁN HOÀN THÀNH', hero_scroll:'CUỘN XUỐNG',
    about_label:'01 — GIỚI THIỆU', about_title:'Tôi là ai',
    about_p1:'Tôi là <span style="color:#8aa8c0;font-weight:600;">Lập Trình Viên Full Stack</span> với 3 năm kinh nghiệm thực tế, chuyên về phát triển backend và thiết kế hệ thống.',
    about_p2:'Tech stack chính: <span class="text-st font-mono">Laravel</span> · <span class="text-st font-mono">NestJS</span> · <span class="text-st font-mono">Node.js</span> · <span class="text-st font-mono">AWS</span>. Có kinh nghiệm xây dựng RESTful APIs, nền tảng AI, hệ thống phân tán và kiến trúc cloud-native.',
    about_p3:'Từ hệ thống web có khả năng mở rộng đến AI đa tác nhân — tôi xây dựng các hệ thống full-stack mà <span style="color:#8aa8c0;font-weight:600;">người dùng thực sự phụ thuộc vào</span>.',
    about_address:'Đường 11, Phường Tam Bình, TP. Thủ Đức, TP. Hồ Chí Minh',
    about_tracking:'Định vị GPS trên quả địa cầu · bấm để phóng phi thuyền tìm tôi',
    about_born:'Sinh ngày 28 tháng 01 năm 2002',
    about_lang:'Tiếng Việt (Bản ngữ) · Tiếng Anh (Trung cấp)',
    skills_label:'02 — KỸ NĂNG', skills_title:'Kỹ Năng Kỹ Thuật',
    skill_lang:'NGÔN NGỮ', skill_fe:'FRONTEND', skill_be:'BACKEND', skill_ai:'AI / DỮ LIỆU', skill_db:'CƠ SỞ DỮ LIỆU', skill_devops:'DEVOPS / CLOUD', skill_cms:'CMS / CÔNG CỤ',
    exp_label:'03 — KINH NGHIỆM', exp_title:'Lịch Sử Làm Việc', exp_role_fsd:'LẬP TRÌNH VIÊN FULL STACK',
    exp1_date:'T8 2025 – HIỆN TẠI', exp1_badge:'● HIỆN TẠI',
    exp1_b1:'Xây dựng và duy trì nền tảng tạo nội dung mạng xã hội bằng AI với hỗ trợ đa tenant workspace.',
    exp1_b2:'Phát triển worker crawl web phân tán để tự động thu thập dữ liệu mạng xã hội bằng Redis Streams.',
    exp1_b3:'Thiết kế và phát triển nền tảng xuất bản điện tử (docsach.com.vn) với tính năng đọc thời gian thực và quản lý e-book.',
    exp2_date:'T1 2025 – T7 2025',
    exp2_b1:'Thiết kế và duy trì các hệ thống web có khả năng mở rộng trên nhiều lĩnh vực kinh doanh.',
    exp2_b2:'Tối ưu và nâng cấp các hệ thống hiện có để cải thiện hiệu suất, độ tin cậy và bảo mật.',
    exp2_b3:'Phối hợp với các nhóm liên chức năng để triển khai tính năng phù hợp với mục tiêu kinh doanh.',
    exp3_date:'T1 2024 – T12 2024',
    exp3_b1:'Xây dựng và duy trì các ứng dụng web full-stack cho nhiều dự án khách hàng.',
    exp3_b2:'Phát triển các tính năng hệ thống cốt lõi với trọng tâm là hiệu suất và khả năng mở rộng.',
    exp3_b3:'Đảm bảo chất lượng code và bảo mật thông qua kiểm thử và tái cấu trúc định kỳ.',
    proj_label:'04 — DỰ ÁN', proj_title:'Dự Án Nổi Bật',
    proj1_desc:'Nền tảng tạo nội dung mạng xã hội bằng AI với đa tenant workspace, kiến trúc đa tác nhân (4 agent/fanpage) và framework học thích ứng MPE.',
    proj1_internal:'// Nội Bộ',
    proj2_desc:'Worker phân tán xử lý crawl job từ Redis Streams. Hỗ trợ Facebook, X/Twitter, Instagram, TikTok với phiên Playwright bền vững.',
    proj2_internal:'// Công Cụ Nội Bộ',
    proj3_desc:'Nền tảng xuất bản và đọc e-book đầy đủ tính năng với tiến trình đọc thời gian thực, luồng thanh toán và Socket.IO sidecar.',
    proj4_desc:'Nền tảng ẩm thực chay và thuần chay cho Việt Nam — web + 3 app mobile cho người dùng, nhà cung cấp và shipper. Hệ sinh thái đặt hàng đầy đủ.',
    proj5_desc:'Nền tảng quản lý công việc với AI chat (ChatGPT) được huấn luyện trên dữ liệu khách hàng. Web + mobile trên hạ tầng AWS đầy đủ.',
    proj6_desc:'Áp dụng mô hình AI doanh nghiệp vào ChatGPT & Bard với cô lập dữ liệu hoàn toàn, học liên tục và hỗ trợ PDF/Word/XML.',
    proj7_desc:'Tham gia dự án nền tảng kiếm crypto khi xem và tải video — ERC-20 & NFT trên BSC, marketplace và smart contract Solidity.',
    proj8_desc:'Thương mại điện tử phụ kiện công nghệ với quản lý sản phẩm, danh mục, giỏ hàng và đơn hàng đầy đủ.',
    personal_label:'05 — DỰ ÁN CÁ NHÂN', personal_title:'Dự Án Cá Nhân',
    personal_status:'// SẢN PHẨM CÁ NHÂN', personal_platform:'TIỆN ÍCH TRÌNH DUYỆT',
    personal_desc:'Tiện ích Chrome tập trung vào quyền riêng tư cho highlight, ghi chú và hỗ trợ AI theo lựa chọn của người dùng. Người dùng có thể chọn văn bản, lưu ngữ cảnh cục bộ hoặc dùng Ask AI qua OpenAI, Google Gemini, hoặc Anthropic Claude.',
    personal_feature1_title:'ASK AI', personal_feature1_desc:'Văn bản đã chọn chỉ được gửi tới dịch vụ AI khi người dùng chủ động thao tác.',
    personal_feature2_title:'LƯU CỤC BỘ', personal_feature2_desc:'Highlight, ghi chú và cài đặt được lưu bằng Chrome storage.',
    personal_feature3_title:'KHÔNG THEO DÕI', personal_feature3_desc:'Không bán dữ liệu, không thu thập lịch sử duyệt web, không quảng cáo hoặc profiling.',
    personal_privacy_link:'CHÍNH SÁCH RIÊNG TƯ', personal_role_label:'VAI TRÒ', personal_role:'Người xây dựng sản phẩm độc lập',
    personal_side_desc:'Tự xây dựng từ ý tưởng sản phẩm đến UX extension, điều phối nhà cung cấp AI, lưu highlight/ghi chú, lưu cài đặt và privacy policy.',
    edu_label:'06 — HỌC VẤN', edu_title:'Nền Tảng Học Vấn',
    edu_school:'Cao Đẳng FPT Polytechnic', edu_degree:'CAO ĐẲNG CÔNG NGHỆ THÔNG TIN',
    edu_duration:'<span style="color:#8aa8c0;">Thời gian:</span> 2022 – 2024',
    edu_grad:'<span style="color:#8aa8c0;">Tốt nghiệp:</span> 30/09/2024',
    edu_gpa:'<span style="color:#8aa8c0;">GPA:</span> 8.5 / 10',
    edu_rank:'<span style="color:#8aa8c0;">Xếp hạng:</span> Top 10%',
    edu_credits:'<span style="color:#8aa8c0;">Tín chỉ:</span> 103',
    edu_cert:'<span style="color:#8aa8c0;">Chứng chỉ:</span> Tiếng Anh Học Thuật Lvl 3 – Topnotch 2',
    edu_badge:'XUẤT SẮC',
    contact_label:'07 — LIÊN HỆ', contact_title:'Hãy cùng hợp tác', contact_sub:'// SẴN SÀNG CƠ HỘI MỚI',
    contact_email_lbl:'EMAIL', contact_phone_lbl:'ĐIỆN THOẠI', contact_github_lbl:'GITHUB', contact_btn:'GỬI TIN NHẮN ›',
    chat_title:'TRỢ LÝ AI CỦA HÙNG', chat_subtitle:'HỎI VỀ CV · KỸ NĂNG · DỰ ÁN',
    chat_launcher_title:'AI GUIDE',
    chat_launcher_sub:'Hỏi về Hùng',
    chat_mode_cv:'Dựa trên CV',
    chat_mode_voice:'Neural voice',
    chat_welcome:'Xin chào, tôi có thể trả lời về kỹ năng, kinh nghiệm, dự án và thông tin liên hệ của Hùng.',
    chat_placeholder:'Hỏi về kỹ năng, dự án...',
    chat_quick_skills:'BACKEND', chat_quick_projects:'DỰ ÁN', chat_quick_contact:'LIÊN HỆ',
    chat_presence:'SẴN SÀNG GIỌNG NÓI',
    chat_voice_on:'Đã bật giọng nói',
    chat_voice_off:'Đã tắt giọng nói',
    chat_voice_disclosure:'Giọng nói được tạo bởi AI.',
    chat_state_idle:'ĐANG CHỜ',
    chat_state_thinking:'ĐANG SUY NGHĨ',
    chat_state_speaking:'ĐANG NÓI',
    chat_state_listening:'ĐANG NGHE',
    chat_state_hint:'Trợ lý portfolio tạo bởi AI, sẵn sàng trò chuyện.',
    chat_state_hint_thinking:'Đang đọc dữ liệu CV và soạn câu trả lời đúng ngữ cảnh.',
    chat_state_hint_speaking:'Đang đọc câu trả lời bằng neural voice nếu có.',
    chat_state_hint_listening:'Đang bật nhập giọng nói. Hãy nói rõ gần micro.',
    chat_listening:'Đang nghe...',
    chat_mic_unavailable:'Trình duyệt này chưa hỗ trợ nhập bằng giọng nói.',
    chat_greeting:'Xin chào, tôi là trợ lý portfolio của Hùng. Bạn có thể hỏi tôi về kỹ năng, dự án, kinh nghiệm hoặc thông tin liên hệ của Hùng.',
    chat_loading:'Đang đọc dữ liệu CV...',
    chat_empty:'Vui lòng nhập câu hỏi.',
    chat_error:'Trợ lý AI hiện chưa khả dụng.',
    chat_unavailable:'Không có phản hồi.',
  }
};

const ROLES = {
  en: ['Full Stack Developer_','Backend Architect_','AI Systems Builder_','Cloud Engineer_','API & Systems Developer_'],
  vi: ['Lập Trình Viên Full Stack_','Kiến Trúc Sư Backend_','Xây Dựng Hệ Thống AI_','Kỹ Sư Cloud_','Phát Triển API & Hệ Thống_'],
};

let lang = localStorage.getItem('dvh_lang') || 'en';
let resetTyping = function(){};

function applyLang(l) {
  const t = T[l];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (t[k] !== undefined) el.textContent = t[k];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const k = el.getAttribute('data-i18n-html');
    if (t[k] !== undefined) el.innerHTML = t[k];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const k = el.getAttribute('data-i18n-placeholder');
    if (t[k] !== undefined) el.setAttribute('placeholder', t[k]);
  });
  if (window.lucide) lucide.createIcons();
  const isEn = l === 'en';
  document.getElementById('lang-en').classList.toggle('lang-active', isEn);
  document.getElementById('lang-vi').classList.toggle('lang-active', !isEn);
  document.getElementById('lang-en-mob').classList.toggle('lang-active', isEn);
  document.getElementById('lang-vi-mob').classList.toggle('lang-active', !isEn);
  document.documentElement.lang = isEn ? 'en' : 'vi';
  localStorage.setItem('dvh_lang', l);
}

function toggleLang(event) {
  if (event) event.preventDefault();
  const trigger = event && event.currentTarget;
  lang = lang === 'en' ? 'vi' : 'en';
  applyLang(lang);
  resetTyping();
  window.dispatchEvent(new CustomEvent('dvh:lang-change', { detail: { lang } }));
  if (trigger && typeof trigger.blur === 'function') {
    requestAnimationFrame(() => trigger.blur());
  }
}

applyLang(lang);
document.getElementById('lang-toggle').addEventListener('click', toggleLang);
document.getElementById('lang-toggle-mob').addEventListener('click', toggleLang);

/* ── LOADER ── */
function hideLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  const reduceMotion = window.DVHPerf ? window.DVHPerf.reduceMotion : false;
  setTimeout(() => loader.classList.add('hide'), reduceMotion ? 120 : 650);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideLoader, { once: true });
} else {
  hideLoader();
}

/* ── PERF HELPERS ── */
const DVHPerf = (() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const state = {
    reduceMotion: reduced.matches,
    finePointer: fine.matches,
  };
  const listen = (media, cb) => {
    if (media.addEventListener) media.addEventListener('change', cb);
    else media.addListener(cb);
  };
  listen(reduced, e => { state.reduceMotion = e.matches; });
  listen(fine, e => { state.finePointer = e.matches; });
  function isLowPower() {
    return state.reduceMotion || innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  }

  function makeVisibility(el, rootMargin = '180px') {
    const visible = { active: true };
    if (!el || !('IntersectionObserver' in window)) return visible;
    const io = new IntersectionObserver(entries => {
      visible.active = entries.some(entry => entry.isIntersecting);
    }, { rootMargin });
    io.observe(el);
    return visible;
  }

  function makeFrameGate(fps) {
    const interval = 1000 / fps;
    let last = 0;
    return () => {
      if (document.hidden) return false;
      const now = performance.now();
      if (now - last < interval) return false;
      last = now;
      return true;
    };
  }

  return {
    get reduceMotion() { return state.reduceMotion; },
    get finePointer() { return state.finePointer; },
    get lowPower() { return isLowPower(); },
    makeVisibility,
    makeFrameGate,
  };
})();
window.DVHPerf = DVHPerf;

/* ── CUSTOM CURSOR ── */
(function() {
  const cur = document.getElementById('custom-cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cur || !ring || !DVHPerf.finePointer || DVHPerf.reduceMotion) return;
  let tx=-80, ty=-80, frame=0;
  document.addEventListener('pointermove', e => {
    tx=e.clientX; ty=e.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      cur.style.transform = `translate3d(${tx}px,${ty}px,0)`;
      frame = 0;
    });
  }, {passive:true});
  document.querySelectorAll('a,button,.hud-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width='50px'; ring.style.height='50px';
      ring.style.top='-25px'; ring.style.left='-25px';
      ring.style.borderColor='rgba(200,214,229,0.9)';
      ring.style.boxShadow='0 0 22px rgba(200,214,229,0.4), 0 0 44px rgba(201,168,76,0.2)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width='32px'; ring.style.height='32px';
      ring.style.top='-16px'; ring.style.left='-16px';
      ring.style.borderColor='rgba(200,214,229,0.6)';
      ring.style.boxShadow='0 0 12px rgba(200,214,229,0.3)';
    });
  });
})();

/* ── CLOCK ── */
setInterval(() => {
  const n=new Date(), p=v=>String(v).padStart(2,'0');
  document.getElementById('nav-time').textContent = p(n.getHours())+':'+p(n.getMinutes())+':'+p(n.getSeconds());
}, 1000);

/* ── 1. SPACE BACKGROUND ── */
function initSpaceScene() {
  const canvas = document.getElementById('space-canvas');
  if (!canvas || !window.THREE || canvas.dataset.ready === 'true') return;
  canvas.dataset.ready = 'true';
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:false});
  renderer.setPixelRatio(Math.min(devicePixelRatio, DVHPerf.lowPower ? 1 : 1.25));
  renderer.setSize(innerWidth, innerHeight);
  const canFrame = DVHPerf.makeFrameGate(DVHPerf.reduceMotion ? 12 : DVHPerf.lowPower ? 18 : 30);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 200);
  camera.position.z = 6;

  const N = DVHPerf.reduceMotion ? 500 : DVHPerf.lowPower ? 850 : 2200, sp = new Float32Array(N*3), sc = new Float32Array(N*3);
  const pal = [
    [0.78,0.84,0.90],[0.50,0.66,0.79],[0.66,0.85,0.92],
    [0.72,0.84,0.94],[0.88,0.92,0.96],[0.95,0.97,1.00],
  ];
  for (let i=0;i<N;i++) {
    const r=14+Math.random()*70, th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1);
    sp[i*3]=r*Math.sin(ph)*Math.cos(th); sp[i*3+1]=r*Math.sin(ph)*Math.sin(th); sp[i*3+2]=r*Math.cos(ph);
    const c=pal[Math.floor(Math.random()*pal.length)]; sc[i*3]=c[0]; sc[i*3+1]=c[1]; sc[i*3+2]=c[2];
  }
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.BufferAttribute(sp,3));
  sGeo.setAttribute('color',    new THREE.BufferAttribute(sc,3));
  const starPoints = new THREE.Points(sGeo, new THREE.PointsMaterial({size:.065, vertexColors:true, transparent:true, opacity:.88}));
  scene.add(starPoints);

  [{pos:[9,4,-22],col:0x080e18,r:9},{pos:[-11,-5,-26],col:0x050a12,r:11},{pos:[1,-9,-20],col:0x0a1020,r:8}]
    .forEach(d => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(d.r,10,10), new THREE.MeshBasicMaterial({color:d.col,transparent:true,opacity:.28,side:THREE.BackSide}));
      m.position.set(...d.pos); scene.add(m);
    });

  const grid = new THREE.GridHelper(70,35,0x0a1828,0x060e18);
  grid.position.y = -10;
  scene.add(grid);

  const WL = DVHPerf.lowPower ? 55 : 120, wPos = new Float32Array(WL*6), wCol = new Float32Array(WL*6);
  for (let i=0;i<WL;i++) {
    const ang=i/WL*Math.PI*2, dist=8+Math.random()*60;
    wPos[i*6]=Math.cos(ang)*dist; wPos[i*6+1]=(Math.random()-.5)*30; wPos[i*6+2]=Math.sin(ang)*dist;
    wPos[i*6+3]=Math.cos(ang)*(dist+2.5); wPos[i*6+4]=wPos[i*6+1]; wPos[i*6+5]=Math.sin(ang)*(dist+2.5);
    const b=.15+Math.random()*.25;
    wCol[i*6]=b*.8; wCol[i*6+1]=b; wCol[i*6+2]=b*1.1;
    wCol[i*6+3]=b*.8; wCol[i*6+4]=b; wCol[i*6+5]=b*1.1;
  }
  const wGeo = new THREE.BufferGeometry();
  wGeo.setAttribute('position', new THREE.BufferAttribute(wPos,3));
  wGeo.setAttribute('color',    new THREE.BufferAttribute(wCol,3));
  const warpLines = new THREE.LineSegments(wGeo, new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.3}));
  scene.add(warpLines);

  const rocks = [];
  for (let i=0;i<(DVHPerf.lowPower ? 4 : 10);i++) {
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(.05+Math.random()*.12,0), new THREE.MeshBasicMaterial({color:0x0a1828,wireframe:Math.random()>.4}));
    m.position.set((Math.random()-.5)*22,(Math.random()-.5)*14,(Math.random()-.5)*8-4);
    m._spd={rx:(Math.random()-.5)*.4,ry:(Math.random()-.5)*.3}; m._oy=m.position.y; m._ph=Math.random()*Math.PI*2;
    scene.add(m); rocks.push(m);
  }

  let mx=0,my=0;
  document.addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5)*.7;my=(e.clientY/innerHeight-.5)*.5;},{passive:true});
  window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});

  const clk=new THREE.Clock();
  (function tick(){
    requestAnimationFrame(tick);
    if (!canFrame()) return;
    const t=clk.getElapsedTime();
    starPoints.rotation.y=t*.01; starPoints.rotation.x=Math.sin(t*.007)*.03;
    warpLines.rotation.y=t*.008;
    camera.position.x+=(mx-camera.position.x)*.03;
    camera.position.y+=(-my-camera.position.y)*.03;
    rocks.forEach(r=>{r.rotation.x+=r._spd.rx*.016;r.rotation.y+=r._spd.ry*.016;r.position.y=r._oy+Math.sin(t*.38+r._ph)*.22;});
    renderer.render(scene,camera);
  })();
}

/* ── 2. HERO 3D SCENE ── */
function initHeroScene() {
  const canvas   = document.getElementById('hero-canvas');
  if (!canvas || !window.THREE || canvas.dataset.ready === 'true') return;
  canvas.dataset.ready = 'true';
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:!DVHPerf.lowPower});
  const visible  = DVHPerf.makeVisibility(canvas.parentElement, '220px');
  const canFrame = DVHPerf.makeFrameGate(DVHPerf.reduceMotion ? 12 : DVHPerf.lowPower ? 18 : 30);
  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(50, 1, .1, 100);
  camera.position.set(0,0,6);

  function resize(){
    const w=canvas.parentElement.clientWidth, h=canvas.parentElement.clientHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio,DVHPerf.lowPower ? 1 : 1.25)); renderer.setSize(w,h);
    camera.aspect=w/h; camera.updateProjectionMatrix();
    const mobile = w < 768;
    commandNode.position.set(mobile ? 1.58 : 2.35, mobile ? -.45 : -.12, 0);
    commandNode.scale.setScalar(mobile ? .72 : 1);
  }

  scene.add(new THREE.AmbientLight(0x050a12, 1));
  const ptS  = new THREE.PointLight(0xc8d6e5, 4.5, 20);  ptS.position.set(3,3,4);   scene.add(ptS);
  const ptSt = new THREE.PointLight(0x7fa8c9, 3.0, 20);  ptSt.position.set(-4,-2,3); scene.add(ptSt);
  const ptG  = new THREE.PointLight(0xa8c8dc, 2.0, 16);  ptG.position.set(0,-4,2);  scene.add(ptG);

  const commandNode = new THREE.Group();
  scene.add(commandNode);
  const matBasic=(color,opacity,extra)=>new THREE.MeshBasicMaterial(Object.assign({color,transparent:true,opacity,depthWrite:false},extra||{}));
  const matLine=(color,opacity)=>new THREE.LineBasicMaterial({color,transparent:true,opacity,depthWrite:false});

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1.2,DVHPerf.lowPower ? 32 : 64,DVHPerf.lowPower ? 32 : 64),
    new THREE.MeshPhongMaterial({color:0x0a1520,emissive:0x060c14,shininess:140,specular:0xc8d6e5})
  );
  commandNode.add(planet);

  const pWire = new THREE.Mesh(
    new THREE.SphereGeometry(1.23,DVHPerf.lowPower ? 14 : 22,DVHPerf.lowPower ? 14 : 22),
    new THREE.MeshBasicMaterial({color:0x7fa8c9,wireframe:true,transparent:true,opacity:.08})
  );
  commandNode.add(pWire);

  const atm = new THREE.Mesh(
    new THREE.SphereGeometry(1.46,DVHPerf.lowPower ? 18 : 28,DVHPerf.lowPower ? 18 : 28),
    new THREE.MeshBasicMaterial({color:0xa8d8ea,transparent:true,opacity:.055,side:THREE.BackSide})
  );
  commandNode.add(atm);

  const innerCore = new THREE.Mesh(
    new THREE.IcosahedronGeometry(.78, DVHPerf.lowPower ? 0 : 1),
    matBasic(0xc8d6e5, .18, {wireframe:true})
  );
  commandNode.add(innerCore);

  const latitudeShells=[];
  for(let i=0;i<5;i++){
    const shell=new THREE.Mesh(
      new THREE.TorusGeometry(1.05+i*.115,.006,4,DVHPerf.lowPower ? 56 : 108),
      matBasic(i%2?0x22d3ee:0xc8d6e5,.11+i*.018)
    );
    shell.rotation.x=Math.PI/2;
    shell.rotation.y=(i-2)*.23;
    shell.position.y=(i-2)*.23;
    commandNode.add(shell);
    latitudeShells.push(shell);
  }

  const orbitalArcs=[];
  [
    [1.72,.012,.38,0xc8d6e5,Math.PI*.32,Math.PI*.12,0],
    [1.98,.016,.25,0x22d3ee,Math.PI*.63,Math.PI*.28,.9],
    [2.28,.01,.28,0xa8d8ea,Math.PI*.18,Math.PI*.54,1.8],
    [2.62,.008,.18,0x4ade80,Math.PI*.48,Math.PI*.72,2.7],
  ].forEach(([r,tube,op,color,rx,ry,phase])=>{
    const arc=new THREE.Mesh(
      new THREE.TorusGeometry(r,tube,4,DVHPerf.lowPower ? 70 : 150,Math.PI*1.45),
      matBasic(color,op)
    );
    arc.rotation.set(rx,ry,phase);
    arc._speed=.08+phase*.012;
    commandNode.add(arc);
    orbitalArcs.push(arc);
  });

  const mkRing=(r,tube,op,col)=>{
    const m=new THREE.Mesh(new THREE.TorusGeometry(r,tube,5,DVHPerf.lowPower ? 44 : 80),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op}));
    m.rotation.x=Math.PI*.35; commandNode.add(m); return m;
  };
  const ring1 = mkRing(1.95,.055,.50, 0xc8d6e5);
  const ring2 = mkRing(1.95,.14, .06, 0xc8d6e5);
  const ring3 = mkRing(2.35,.025,.28, 0xd0e8f8);

  const moon1 = new THREE.Mesh(new THREE.SphereGeometry(.19,DVHPerf.lowPower ? 10 : 16,DVHPerf.lowPower ? 10 : 16),
    new THREE.MeshPhongMaterial({color:0x0a1828,emissive:0x060e18,shininess:80,specular:0x7fa8c9}));
  commandNode.add(moon1);
  const moon2 = new THREE.Mesh(new THREE.SphereGeometry(.10,DVHPerf.lowPower ? 8 : 12,DVHPerf.lowPower ? 8 : 12),
    new THREE.MeshPhongMaterial({color:0x0d1520,emissive:0x080e14,shininess:60,specular:0xc8d6e5}));
  commandNode.add(moon2);

  const satellites=[];
  function makeSatellite(phase,radius,color){
    const group=new THREE.Group();
    const body=new THREE.Mesh(new THREE.BoxGeometry(.16,.12,.22),matBasic(0xc8d6e5,.78,{wireframe:true}));
    const panelMat=matBasic(color,.18,{side:THREE.DoubleSide});
    const p1=new THREE.Mesh(new THREE.PlaneGeometry(.46,.18),panelMat);
    const p2=p1.clone();
    p1.position.x=-.36; p2.position.x=.36;
    const beacon=new THREE.Mesh(new THREE.SphereGeometry(.045,12,12),matBasic(color,.8));
    group.add(body,p1,p2,beacon);
    group._phase=phase; group._radius=radius; group._color=color;
    commandNode.add(group);
    satellites.push(group);
  }
  makeSatellite(2,3.3,0x22d3ee);
  makeSatellite(4.25,2.78,0xa8d8ea);
  makeSatellite(5.5,3.85,0x4ade80);

  const nodes=[];
  [[-2.5,1.5,0],[-3.2,-1,.5],[-1.8,-2,-.5],[.5,2.5,-1],[3.8,1.8,-.5],[-.4,-2.6,.7],[3.2,-1.8,.45],[1.2,1.2,-1.6]].forEach((p,i)=>{
    const n=new THREE.Mesh(
      new THREE.OctahedronGeometry(.07+i*.012,0),
      new THREE.MeshBasicMaterial({color:i%2?0xa8c8dc:0x7fa8c9,wireframe:true,transparent:true,opacity:.7})
    );
    n.position.set(...p); n._o=[...p]; n._ph=i*1.3; scene.add(n); nodes.push(n);
  });

  const lm=new THREE.LineBasicMaterial({color:0x7fa8c9,transparent:true,opacity:.05});
  for(let i=-3;i<=3;i++) scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i*1.2,-3.5,-2),new THREE.Vector3(i*1.2,3.5,-2)]),lm));
  for(let i=-2;i<=2;i++) scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4,i*1.2,-2),new THREE.Vector3(4,i*1.2,-2)]),lm));

  const dataLines=[];
  for(let i=0;i<nodes.length;i++){
    const next=nodes[(i+2)%nodes.length];
    const geo=new THREE.BufferGeometry().setFromPoints([nodes[i].position.clone(),next.position.clone()]);
    const line=new THREE.Line(geo,matLine(i%3?0x7fa8c9:0x22d3ee,.055));
    scene.add(line);
    dataLines.push({line,a:nodes[i],b:next,phase:i*.7});
  }

  const eRing=new THREE.Mesh(new THREE.TorusGeometry(1.5,.008,4,DVHPerf.lowPower ? 64 : 120),
    new THREE.MeshBasicMaterial({color:0xc8d6e5,transparent:true,opacity:.55}));
  commandNode.add(eRing);

  const streamCount=DVHPerf.lowPower ? 90 : 180;
  const streamPos=new Float32Array(streamCount*3);
  const streamData=[];
  for(let i=0;i<streamCount;i++){
    streamData.push({
      a:Math.random()*Math.PI*2,
      r:1.68+Math.random()*1.25,
      tilt:.18+Math.random()*.65,
      speed:.006+Math.random()*.012,
      phase:Math.random()*Math.PI*2
    });
  }
  const streamGeo=new THREE.BufferGeometry();
  streamGeo.setAttribute('position',new THREE.BufferAttribute(streamPos,3));
  const streamPoints=new THREE.Points(streamGeo,new THREE.PointsMaterial({color:0xa8d8ea,size:.035,transparent:true,opacity:.52,depthWrite:false}));
  commandNode.add(streamPoints);

  const shardGroup=new THREE.Group();
  commandNode.add(shardGroup);
  for(let i=0;i<(DVHPerf.lowPower ? 10 : 18);i++){
    const shard=new THREE.Mesh(
      new THREE.ConeGeometry(.035+Math.random()*.045,.26+Math.random()*.42,3),
      matBasic(i%3===0?0x22d3ee:0xc8d6e5,.16+Math.random()*.18,{wireframe:i%2===0})
    );
    const a=i/(DVHPerf.lowPower ? 10 : 18)*Math.PI*2;
    shard.position.set(Math.cos(a)*(1.45+Math.random()*.35),(Math.random()-.5)*1.8,Math.sin(a)*(1.45+Math.random()*.35));
    shard.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);
    shard._phase=Math.random()*Math.PI*2;
    shardGroup.add(shard);
  }

  resize(); window.addEventListener('resize', resize);

  let mx=0,my=0;
  document.addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5);},{passive:true});

  const clk=new THREE.Clock();
  (function tick(){
    requestAnimationFrame(tick);
    if (!visible.active || !canFrame()) return;
    const t=clk.getElapsedTime();
    commandNode.rotation.x += (-my*.12-commandNode.rotation.x)*.035;
    commandNode.rotation.y += (mx*.18+Math.sin(t*.18)*.04-commandNode.rotation.y)*.035;
    planet.rotation.y=t*.09; pWire.rotation.y=-t*.04; atm.rotation.y=t*.05;
    innerCore.rotation.x=t*.18; innerCore.rotation.y=-t*.23;
    latitudeShells.forEach((s,i)=>{s.rotation.z=t*(i%2?.12:-.09);s.material.opacity=.07+Math.sin(t*1.4+i)*.035+i*.018;});
    orbitalArcs.forEach((arc,i)=>{arc.rotation.z+=arc._speed*.016;arc.material.opacity=.14+Math.sin(t*1.7+i)*.08+(i===1?.08:0);});
    ring1.rotation.z=t*.07; ring2.rotation.z=ring1.rotation.z; ring3.rotation.z=-t*.04;
    eRing.material.opacity=.35+Math.sin(t*3)*.28; eRing.rotation.y=t*.2;
    moon1.position.set(Math.cos(t*.4)*2.5,Math.sin(t*.16)*.6,Math.sin(t*.4)*2.5);
    moon2.position.set(Math.cos(t*.72+1.5)*1.7,Math.cos(t*.5)*.8,Math.sin(t*.72+1.5)*1.7);
    satellites.forEach((sat,i)=>{
      const a=t*(.46+i*.13)+sat._phase;
      sat.position.set(Math.cos(a)*sat._radius,Math.sin(a*.9)*(1+i*.22),Math.sin(a)*sat._radius*.75);
      sat.lookAt(0,0,0);
      sat.rotation.z+=t*.001;
      sat.scale.setScalar(1+Math.sin(t*2+i)*.08);
    });
    nodes.forEach(n=>{n.position.y=n._o[1]+Math.sin(t*.6+n._ph)*.15;n.rotation.y=t*.5;n.rotation.x=t*.3;});
    dataLines.forEach(({line,a,b,phase})=>{
      line.geometry.setFromPoints([a.position,b.position]);
      line.material.opacity=.035+Math.max(0,Math.sin(t*1.8+phase))*.105;
    });
    for(let i=0;i<streamCount;i++){
      const d=streamData[i];
      d.a+=d.speed;
      const x=Math.cos(d.a)*d.r;
      const z=Math.sin(d.a)*d.r*Math.cos(d.tilt);
      const y=Math.sin(d.a+d.phase)*.18+Math.sin(d.a)*d.r*Math.sin(d.tilt)*.32;
      streamPos[i*3]=x; streamPos[i*3+1]=y; streamPos[i*3+2]=z;
    }
    streamGeo.attributes.position.needsUpdate=true;
    shardGroup.rotation.y=-t*.045;
    shardGroup.children.forEach((s,i)=>{s.rotation.x+=.004+i*.0003;s.rotation.y-=.003;s.position.y+=Math.sin(t*.9+s._phase)*.0008;});
    ptS.intensity  = 4.5+Math.sin(t*1.2)*.8;
    ptSt.intensity = 3.0+Math.cos(t*.9)*.7;
    camera.position.x+=(mx*.5-camera.position.x)*.04;
    camera.position.y+=(-my*.3-camera.position.y)*.04;
    camera.lookAt(scene.position);
    renderer.render(scene,camera);
  })();
}

/* ── 3. TYPING ── */
(function(){
  const el = document.getElementById('typed-role');
  let ri=0, ci=0, del=false, timer=null;

  function type(){
    const roles = ROLES[lang];
    el.textContent = del ? roles[ri].slice(0,ci--) : roles[ri].slice(0,ci++);
    if(!del && ci > roles[ri].length){ del=true; timer=setTimeout(type,1200); return; }
    if(del && ci < 0){ del=false; ri=(ri+1)%roles.length; ci=0; }
    timer = setTimeout(type, del?40:80);
  }

  resetTyping = function(){
    clearTimeout(timer);
    el.textContent='';
    ri=0; ci=0; del=false;
    type();
  };

  type();
})();

/* ── 4. COUNTER ── */
function countUp(el,target,dec,suffix,dur){
  const s=performance.now();
  (function step(now){const p=Math.min((now-s)/dur,1);el.textContent=(dec?(p*target).toFixed(1):Math.floor(p*target))+suffix;if(p<1)requestAnimationFrame(step);})(performance.now());
}
const cObs=new IntersectionObserver(es=>{
  if(!es[0].isIntersecting)return;
  countUp(document.getElementById('cnt-exp'),3,false,'+',1400);
  countUp(document.getElementById('cnt-proj'),9,false,'+',1400);
  countUp(document.getElementById('cnt-gpa'),8.5,true,'',1600);
  cObs.disconnect();
},{threshold:.3});
cObs.observe(document.getElementById('hero'));

/* ── 5. PROGRESS BARS ── */
const pObs=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.querySelectorAll('.prog-bar').forEach(b=>setTimeout(()=>{b.style.width=b.dataset.w+'%';},300));
    pObs.unobserve(e.target);
  });
},{threshold:.2});
document.querySelectorAll('.hud-card').forEach(c=>pObs.observe(c));

/* ── 6. SCROLL REVEAL ── */
const rObs=new IntersectionObserver(es=>{
  es.forEach((e,i)=>{if(!e.isIntersecting)return;setTimeout(()=>e.target.classList.add('in'),i*100);rObs.unobserve(e.target);});
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>rObs.observe(el));

/* ── 7. HAMBURGER ── */
const ham=document.getElementById('ham'),menu=document.getElementById('mob-menu');
ham.addEventListener('click',()=>{
  const open=menu.classList.toggle('open');
  ham.setAttribute('aria-expanded', String(open));
  ham.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  const sp=ham.querySelectorAll('span');
  sp[0].style.transform=open?'translateY(7px) rotate(45deg)':'';
  sp[1].style.opacity=open?'0':'1';
  sp[2].style.transform=open?'translateY(-7px) rotate(-45deg)':'';
});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  menu.classList.remove('open');
  ham.setAttribute('aria-expanded', 'false');
  ham.setAttribute('aria-label', 'Open navigation menu');
  ham.querySelectorAll('span').forEach(s=>{s.style.transform='';s.style.opacity='1';});
}));

/* ── 7A. SECTION NAV TRANSITION ── */
(function(){
  const sectionIds = new Set([...document.querySelectorAll('main section[id]')].map(section => section.id));
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  if (!sectionIds.size || !links.length) return;

  const warp = document.createElement('div');
  warp.className = 'section-warp';
  warp.setAttribute('aria-hidden', 'true');
  document.body.appendChild(warp);

  let warpTimer = 0;
  let arriveTimer = 0;
  let navRun = 0;

  function prefersReducedMotion() {
    return window.DVHPerf ? window.DVHPerf.reduceMotion : window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function sectionFromHash(hash) {
    if (!hash || hash === '#') return null;
    let id = hash.slice(1);
    try { id = decodeURIComponent(id); } catch (error) {}
    if (!sectionIds.has(id)) return null;
    return document.getElementById(id);
  }

  function scrollTopFor(target) {
    const nav = document.querySelector('nav');
    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
    const gap = target.id === 'hero' ? 0 : navHeight + 14;
    return Math.max(0, window.scrollY + target.getBoundingClientRect().top - gap);
  }

  function flashWarp() {
    clearTimeout(warpTimer);
    warp.classList.add('is-active');
    warpTimer = setTimeout(() => warp.classList.remove('is-active'), 620);
  }

  function updateHash(hash) {
    if (location.hash !== hash) history.pushState(null, '', hash);
  }

  function replaySection(target) {
    clearTimeout(arriveTimer);
    target.classList.remove('is-section-arriving');
    void target.offsetWidth;
    target.classList.add('is-section-arriving');
    arriveTimer = setTimeout(() => target.classList.remove('is-section-arriving'), 980);

    const reveals = [...target.querySelectorAll('.reveal')];
    reveals.forEach(el => el.classList.remove('in'));
    requestAnimationFrame(() => {
      reveals.forEach((el, index) => {
        setTimeout(() => el.classList.add('in'), index * 70);
      });
    });

    target.querySelectorAll('.prog-bar[data-w]').forEach(bar => {
      setTimeout(() => { bar.style.width = `${bar.dataset.w}%`; }, 260);
    });
  }

  function afterScrollArrives(targetTop, runId, callback) {
    const started = performance.now();
    const check = () => {
      const done = Math.abs(window.scrollY - targetTop) < 8 || performance.now() - started > 1350;
      if (done) {
        if (runId === navRun) callback();
        return;
      }
      requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  }

  function goToSection(hash) {
    const target = sectionFromHash(hash);
    if (!target) return false;

    const targetTop = scrollTopFor(target);
    const runId = ++navRun;
    updateHash(hash);

    if (prefersReducedMotion()) {
      window.scrollTo(0, targetTop);
      return true;
    }

    flashWarp();
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
    afterScrollArrives(targetTop, runId, () => replaySection(target));
    return true;
  }

  links.forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      if (!sectionFromHash(hash)) return;
      event.preventDefault();
      goToSection(hash);
    });
  });
})();

/* ── 7B. CONTENT HOVER HIGHLIGHT ── */
(function(){
  const targets = document.querySelectorAll([
    'main section p:not(.sec-label):not(.hud-data):not(.chat-message)',
    'main section li',
    'main section .tag',
    'main section [data-i18n-html]'
  ].join(','));
  targets.forEach(el => {
    if (el.closest('#portfolio-chat') || el.closest('nav')) return;
    el.classList.add('content-hover-target');
  });
})();

/* ── 8. CLICK BURST ── */
document.addEventListener('click',e=>{
  for(let i=0;i<8;i++){
    const p=document.createElement('div');
    const ang=i/8*Math.PI*2, dist=30+Math.random()*40;
    Object.assign(p.style,{
      position:'fixed',left:e.clientX+'px',top:e.clientY+'px',
      width:'4px',height:'4px',borderRadius:'50%',
      background:'#c8d6e5',pointerEvents:'none',zIndex:'9998',
      boxShadow:'0 0 8px #c8d6e5, 0 0 16px rgba(127,168,201,0.5)',
      transition:'all 0.55s ease',
    });
    document.body.appendChild(p);
    requestAnimationFrame(()=>{
      Object.assign(p.style,{transform:`translate(${Math.cos(ang)*dist}px,${Math.sin(ang)*dist}px)`,opacity:'0',width:'2px',height:'2px'});
      setTimeout(()=>p.remove(),580);
    });
  }
});

/* ── 9. 3D TILT ON CARDS ── */
document.querySelectorAll('#skills .hud-card, #projects .hud-card, #personal-project .hud-card').forEach(card => {
  let frame = 0, lastEvent = null;
  card.addEventListener('pointerenter', () => {
    card.style.transition = 'border-color .35s, box-shadow .35s, transform .08s ease';
  });
  card.addEventListener('pointermove', e => {
    lastEvent = e;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = (lastEvent.clientX - rect.left) / rect.width - 0.5;
      const y = (lastEvent.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x*12}deg) rotateX(${-y*12}deg) translateY(-8px)`;
      frame = 0;
    });
  }, {passive:true});
  card.addEventListener('mouseleave', () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    card.style.transform = '';
    card.style.transition = 'border-color .35s, box-shadow .35s, transform .45s ease';
  });
});

/* ── 10. CONTACT MAGNETIC HOVER ── */
document.querySelectorAll('#contact .hud-card').forEach(card => {
  let frame = 0, lastEvent = null;
  card.addEventListener('pointerenter', () => {
    card.style.transition = 'border-color .35s, box-shadow .35s, transform .1s ease';
  });
  card.addEventListener('pointermove', e => {
    lastEvent = e;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = (lastEvent.clientX - rect.left) / rect.width - 0.5;
      const y = (lastEvent.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px) scale(1.02)`;
      frame = 0;
    });
  }, {passive:true});
  card.addEventListener('mouseleave', () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    card.style.transform = '';
    card.style.transition = 'border-color .35s, box-shadow .35s, transform .5s cubic-bezier(.25,.46,.45,.94)';
  });
});

/* ── 11. PORTFOLIO AI CHAT ── */
(function portfolioChat() {
  const root = document.getElementById('portfolio-chat');
  if (!root) return;

  const toggle = document.getElementById('chat-toggle');
  const panel = document.getElementById('chat-panel');
  const companionStage = document.getElementById('chat-companion-stage');
  const companion = document.getElementById('chat-companion');
  const stateLabel = document.getElementById('chat-state-label');
  const stateHint = document.getElementById('chat-state-hint');
  const voice = document.getElementById('chat-voice');
  const close = document.getElementById('chat-close');
  const messages = document.getElementById('chat-messages');
  const input = document.getElementById('chat-input');
  const mic = document.getElementById('chat-mic');
  const send = document.getElementById('chat-send');
  const status = document.getElementById('chat-status');
  const quickButtons = root.querySelectorAll('[data-chat-prompt-en]');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let sending = false;
  let voiceEnabled = localStorage.getItem('dvh_chat_voice') !== 'off';
  let greeted = false;
  let currentUtterance = null;
  let currentAudio = null;
  let currentAudioUrl = null;
  let neuralTtsAvailable = true;
  let speechRunId = 0;
  let recognition = null;

  const tr = key => (T[lang] && T[lang][key]) || T.en[key] || key;

  function setPersonaState(state) {
    const states = ['idle', 'thinking', 'speaking', 'listening'];
    states.forEach(item => {
      companion.classList.toggle(`is-${item}`, item === state);
      companionStage.classList.toggle(`is-${item}`, item === state);
    });
    companionStage.classList.toggle('is-active', state === 'speaking' || state === 'listening' || state === 'thinking');
    stateLabel.textContent = tr(`chat_state_${state}`);
    stateHint.textContent = tr(state === 'idle' ? 'chat_state_hint' : `chat_state_hint_${state}`);
  }

  function setSpeaking(speaking) {
    companion.classList.toggle('is-speaking', speaking);
    if (speaking) setPersonaState('speaking');
    else if (!sending) setPersonaState('idle');
  }

  function updateVoiceButton() {
    voice.classList.toggle('is-active', voiceEnabled);
    voice.setAttribute('aria-pressed', String(voiceEnabled));
    voice.setAttribute('title', voiceEnabled ? tr('chat_voice_on') : tr('chat_voice_off'));
    voice.setAttribute('aria-label', voiceEnabled ? tr('chat_voice_on') : tr('chat_voice_off'));
    voice.innerHTML = `<i data-lucide="${voiceEnabled ? 'volume-2' : 'volume-x'}" style="width:17px;height:17px;"></i>`;
    if (window.lucide) lucide.createIcons();
  }

  function stopSpeaking() {
    speechRunId += 1;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.removeAttribute('src');
      currentAudio.load();
      currentAudio = null;
    }
    if (currentAudioUrl) {
      URL.revokeObjectURL(currentAudioUrl);
      currentAudioUrl = null;
    }
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    currentUtterance = null;
    setSpeaking(false);
  }

  function apiEndpoints(path) {
    const endpoints = [path];
    const isLocalPage = ['localhost', '127.0.0.1'].includes(location.hostname) || location.protocol === 'file:';
    const isPortfolioDevServer = isLocalPage && /^30\d\d$/.test(location.port || '');

    if (isLocalPage && !isPortfolioDevServer) {
      for (let port = 3000; port <= 3009; port++) {
        endpoints.push(`http://localhost:${port}${path}`);
      }
    }

    return endpoints;
  }

  function voiceScore(voiceItem) {
    const targetLang = lang === 'vi' ? 'vi' : 'en';
    const voiceLang = (voiceItem.lang || '').toLowerCase();
    const voiceName = `${voiceItem.name || ''} ${voiceItem.voiceURI || ''}`.toLowerCase();
    const premiumHints = ['natural', 'neural', 'premium', 'online'];
    const engineHints = ['google', 'microsoft', 'apple', 'samantha', 'daniel', 'serena', 'karen', 'alex', 'aria', 'jenny', 'guy', 'zira'];
    const viHints = ['vietnam', 'việt', 'tieng viet', 'hoai', 'nam', 'linh', 'an'];
    let score = 0;

    if (voiceLang === (targetLang === 'vi' ? 'vi-vn' : 'en-us')) score += 120;
    else if (voiceLang.startsWith(targetLang)) score += 95;
    else if (targetLang === 'en' && voiceLang.startsWith('en')) score += 70;
    else return -1;

    premiumHints.forEach(hint => { if (voiceName.includes(hint)) score += 20; });
    engineHints.forEach(hint => { if (voiceName.includes(hint)) score += 12; });
    if (targetLang === 'vi') viHints.forEach(hint => { if (voiceName.includes(hint)) score += 18; });
    if (voiceName.includes('compact')) score -= 24;
    if (voiceName.includes('novelty')) score -= 24;
    if (voiceItem.default) score += 8;
    if (!voiceItem.localService) score += 5;

    return score;
  }

  function pickVoice() {
    const voices = speechSynthesis.getVoices();
    return voices
      .map(voiceItem => ({ voiceItem, score: voiceScore(voiceItem) }))
      .filter(item => item.score >= 0)
      .sort((a, b) => b.score - a.score)[0]?.voiceItem || null;
  }

  function normalizeSpeechText(text) {
    return text
      .replace(/https?:\/\/\S+/g, lang === 'vi' ? 'một đường dẫn' : 'a link')
      .replace(/[`*_#>{}\[\]]/g, '')
      .replace(/[▸›↗•]/g, '. ')
      .replace(/\s+-\s+/g, '. ')
      .replace(/\bNode\.js\b/gi, 'Node J S')
      .replace(/\bNext\.js\b/gi, 'Next J S')
      .replace(/\bExpress\.js\b/gi, 'Express J S')
      .replace(/\bSocket\.IO\b/gi, 'Socket I O')
      .replace(/\bRESTful APIs\b/g, 'RESTful A P I s')
      .replace(/\bAPIs\b/g, 'A P I s')
      .replace(/\bAI\b/g, 'A I')
      .replace(/\bAWS\b/g, 'A W S')
      .replace(/\bJWT\b/g, 'J W T')
      .replace(/\bRBAC\b/g, 'R B A C')
      .replace(/\bCV\b/g, 'C V')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function splitSpeechText(text) {
    const sentences = text.match(/[^.!?;:]+[.!?;:]?/g) || [text];
    const chunks = [];
    let current = '';

    sentences.forEach(sentence => {
      const next = `${current} ${sentence}`.trim();
      if (next.length > 180 && current) {
        chunks.push(current);
        current = sentence.trim();
      } else {
        current = next;
      }
    });

    if (current) chunks.push(current);
    return chunks;
  }

  function speechSettings(opts) {
    const isSlow = opts && opts.slow;
    if (lang === 'vi') {
      return { lang: 'vi-VN', rate: isSlow ? 0.86 : 0.91, pitch: 1.04, volume: 0.95 };
    }
    return { lang: 'en-US', rate: isSlow ? 0.88 : 0.94, pitch: 1.02, volume: 0.95 };
  }

  async function playNeuralTts(speechText, runId) {
    if (!neuralTtsAvailable) return false;

    for (const endpoint of apiEndpoints('/api/tts')) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: speechText,
            language: lang,
            pageLanguage: document.documentElement.lang || lang
          })
        });

        if (!response.ok) {
          if (response.status === 501) {
            neuralTtsAvailable = false;
            return false;
          }
          continue;
        }

        const audioBlob = await response.blob();
        if (runId !== speechRunId) return true;

        neuralTtsAvailable = true;
        currentAudioUrl = URL.createObjectURL(audioBlob);
        currentAudio = new Audio(currentAudioUrl);
        currentAudio.preload = 'auto';
        currentAudio.onplay = () => setSpeaking(true);
        currentAudio.onended = () => stopSpeaking();
        currentAudio.onerror = () => {
          neuralTtsAvailable = false;
          stopSpeaking();
        };
        await currentAudio.play();
        return true;
      } catch (error) {
        // Try the next local endpoint, then fall back to browser speech.
      }
    }

    return false;
  }

  function speakWithBrowserVoice(speechText, opts, runId) {
    if (!('speechSynthesis' in window)) return;

    const chunks = splitSpeechText(speechText);
    const selectedVoice = pickVoice();
    const settings = speechSettings(opts);
    let index = 0;

    function speakNext() {
      if (runId !== speechRunId) return;
      if (index >= chunks.length) {
        currentUtterance = null;
        setSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      index += 1;
      utterance.lang = settings.lang;
      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      utterance.volume = settings.volume;
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        if (runId !== speechRunId) return;
        window.setTimeout(speakNext, opts && opts.slow ? 220 : 150);
      };
      utterance.onerror = () => setSpeaking(false);
      currentUtterance = utterance;
      speechSynthesis.speak(utterance);
    }

    speakNext();
  }

  function speak(text, opts) {
    if (!voiceEnabled || !text) return false;

    stopSpeaking();
    const speechText = normalizeSpeechText(text);
    if (!speechText) return false;
    if (!neuralTtsAvailable && !('speechSynthesis' in window)) return false;
    const runId = speechRunId;

    playNeuralTts(speechText, runId).then(played => {
      if (!played && runId === speechRunId) {
        if ('speechSynthesis' in window) speakWithBrowserVoice(speechText, opts, runId);
        else setPersonaState('idle');
      }
    });
    return true;
  }

  function primeGreeting() {
    if (greeted) return;
    greeted = true;
    speak(tr('chat_greeting'), { slow: true });
  }

  function setupFirstInteractionGreeting() {
    const fire = () => {
      primeGreeting();
      document.removeEventListener('pointerdown', fire);
      document.removeEventListener('keydown', fire);
    };
    document.addEventListener('pointerdown', fire, { once: true });
    document.addEventListener('keydown', fire, { once: true });
  }

  function setListening(listening) {
    mic.classList.toggle('is-listening', listening);
    mic.disabled = listening;
    setPersonaState(listening ? 'listening' : 'idle');
  }

  function setupSpeechRecognition() {
    if (!SpeechRecognition) {
      mic.disabled = true;
      mic.title = tr('chat_mic_unavailable');
      return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = lang === 'vi' ? 'vi-VN' : 'en-US';

    recognition.onstart = () => {
      status.textContent = tr('chat_listening');
      setListening(true);
    };
    recognition.onresult = event => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      input.value = transcript.trim();
      autoGrow();
    };
    recognition.onerror = event => {
      status.textContent = event.error || tr('chat_mic_unavailable');
      setPersonaState('idle');
    };
    recognition.onend = () => {
      setListening(false);
      if (status.textContent === tr('chat_listening')) status.textContent = '';
      if (input.value.trim()) input.focus();
    };
  }

  function chatEndpoints() {
    return apiEndpoints('/api/chat');
  }

  async function requestChat(message) {
    let lastError = null;

    for (const endpoint of chatEndpoints()) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            language: lang,
            pageLanguage: document.documentElement.lang || lang
          })
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          lastError = new Error(data.error || `${res.status} ${res.statusText}`.trim());
          continue;
        }

        return data;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error(tr('chat_error'));
  }

  function setOpen(open) {
    root.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    panel.toggleAttribute('inert', !open);
    panel.setAttribute('aria-hidden', String(!open));
    if (open) {
      setTimeout(() => input.focus(), 220);
      primeGreeting();
    }
  }

  function addMessage(type, text, opts) {
    const bubble = document.createElement('div');
    bubble.className = `chat-message ${type}`;
    if (opts && opts.typing) {
      bubble.innerHTML = '<span class="chat-typing" aria-label="Typing"><span></span><span></span><span></span></span>';
    } else {
      bubble.textContent = text;
    }
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  }

  function autoGrow() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  }

  async function sendMessage(prompt) {
    const message = (prompt || input.value).trim();
    if (!message) {
      status.textContent = tr('chat_empty');
      input.focus();
      return;
    }
    if (sending) return;

    addMessage('user', message);
    input.value = '';
    autoGrow();
    status.textContent = '';
    sending = true;
    send.disabled = true;
    setPersonaState('thinking');

    const pending = addMessage('assistant', '', { typing: true });
    status.textContent = tr('chat_loading');

    try {
      const data = await requestChat(message);
      pending.textContent = data.reply || tr('chat_unavailable');
      setPersonaState('speaking');
      if (!speak(pending.textContent)) window.setTimeout(() => setPersonaState('idle'), 900);
    } catch (error) {
      pending.textContent = tr('chat_error');
      status.textContent = error.message && error.message !== tr('chat_error') ? error.message : '';
      setPersonaState('speaking');
      if (!speak(pending.textContent)) window.setTimeout(() => setPersonaState('idle'), 900);
    } finally {
      sending = false;
      send.disabled = false;
      if (status.textContent === tr('chat_loading')) {
        status.textContent = '';
        if (!voiceEnabled && !companion.classList.contains('is-speaking')) setPersonaState('idle');
      }
      input.focus();
    }
  }

  toggle.addEventListener('click', () => setOpen(true));
  close.addEventListener('click', () => {
    stopSpeaking();
    setOpen(false);
  });
  voice.addEventListener('click', () => {
    voiceEnabled = !voiceEnabled;
    localStorage.setItem('dvh_chat_voice', voiceEnabled ? 'on' : 'off');
    if (!voiceEnabled) stopSpeaking();
    updateVoiceButton();
    status.textContent = voiceEnabled ? tr('chat_voice_on') : tr('chat_voice_off');
    if (voiceEnabled) speak(status.textContent);
  });
  mic.addEventListener('click', () => {
    if (!recognition) {
      status.textContent = tr('chat_mic_unavailable');
      return;
    }
    recognition.lang = lang === 'vi' ? 'vi-VN' : 'en-US';
    recognition.start();
  });
  send.addEventListener('click', () => sendMessage());
  input.addEventListener('input', autoGrow);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.dataset[lang === 'vi' ? 'chatPromptVi' : 'chatPromptEn'];
      sendMessage(prompt);
    });
  });
  let lookFrame = 0, lookEvent = null;
  root.addEventListener('pointermove', e => {
    lookEvent = e;
    if (lookFrame) return;
    lookFrame = requestAnimationFrame(() => {
      const rect = companion.getBoundingClientRect();
      const lookX = Math.max(-2.5, Math.min(2.5, ((lookEvent.clientX - rect.left) / rect.width - 0.5) * 5));
      const lookY = Math.max(-1.5, Math.min(1.5, ((lookEvent.clientY - rect.top) / rect.height - 0.5) * 3));
      companion.style.setProperty('--look-x', `${lookX}px`);
      companion.style.setProperty('--look-y', `${lookY}px`);
      lookFrame = 0;
    });
  }, {passive:true});
  root.addEventListener('mouseleave', () => {
    if (lookFrame) cancelAnimationFrame(lookFrame);
    lookFrame = 0;
    companion.style.setProperty('--look-x', '0px');
    companion.style.setProperty('--look-y', '0px');
  });
  window.addEventListener('dvh:lang-change', () => {
    updateVoiceButton();
    setPersonaState(companionStage.classList.contains('is-listening') ? 'listening' : companionStage.classList.contains('is-speaking') ? 'speaking' : companionStage.classList.contains('is-thinking') ? 'thinking' : 'idle');
    if (recognition) recognition.lang = lang === 'vi' ? 'vi-VN' : 'en-US';
  });
  if ('speechSynthesis' in window && speechSynthesis.addEventListener) {
    speechSynthesis.addEventListener('voiceschanged', () => {
      const selectedVoice = pickVoice();
      if (currentUtterance && selectedVoice) currentUtterance.voice = selectedVoice;
    });
  }
  updateVoiceButton();
  setPersonaState('idle');
  setupSpeechRecognition();
  setupFirstInteractionGreeting();
})();

/* ── INIT NON-CRITICAL VISUAL ENGINES ── */
function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function whenIdle(callback, timeout) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, timeout ? { timeout } : undefined);
  } else {
    setTimeout(callback, timeout || 1);
  }
}

let threeReady = null;
function ensureThree() {
  if (!threeReady) {
    threeReady = loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
  }
  return threeReady;
}

function initPrimaryScenes() {
  ensureThree()
    .then(() => {
      initSpaceScene();
      initHeroScene();
    })
    .catch(() => {});
}

whenIdle(() => {
  loadExternalScript('https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js')
    .then(() => { if (window.lucide) lucide.createIcons(); })
    .catch(() => {});
}, 1400);

if (DVHPerf.lowPower) {
  let primaryScenesStarted = false;
  const startPrimaryScenes = () => {
    if (primaryScenesStarted) return;
    primaryScenesStarted = true;
    window.removeEventListener('scroll', startPrimaryScenes);
    window.removeEventListener('pointerdown', startPrimaryScenes);
    window.removeEventListener('keydown', startPrimaryScenes);
    initPrimaryScenes();
  };
  window.addEventListener('scroll', startPrimaryScenes, { once: true, passive: true });
  window.addEventListener('pointerdown', startPrimaryScenes, { once: true, passive: true });
  window.addEventListener('keydown', startPrimaryScenes, { once: true });
  window.setTimeout(startPrimaryScenes, 900);
} else {
  whenIdle(initPrimaryScenes, 1800);
}

/* ── 12. SCI-FI 3D SECTION SCENES (lazy external) ── */
function loadSectionScenes() {
  if (window.__dvhScenesLoading) return;
  window.__dvhScenesLoading = true;
  ensureThree()
    .then(() => {
      const script = document.createElement('script');
      script.src = 'assets/js/scenes3d.js';
      script.async = true;
      document.body.appendChild(script);
    })
    .catch(() => {});
}

const sceneAnchor = document.getElementById('about');
if ('IntersectionObserver' in window && sceneAnchor) {
  const sceneLoader = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    sceneLoader.disconnect();
    loadSectionScenes();
  }, { rootMargin: '0px' });
  sceneLoader.observe(sceneAnchor);
} else {
  window.addEventListener('scroll', loadSectionScenes, { once: true, passive: true });
}
