import { useState } from "react";
import {
  Home, BookOpen, Moon, Heart, Clock,
  Settings, ChevronLeft, RotateCcw,
  MapPin, Bell, Menu, X, Sparkles
} from "lucide-react";

const sections = [
  { id: "home", name: "الرئيسية", icon: Home },
  { id: "prayer", name: "الصلاة", icon: Clock },
  { id: "quran", name: "القرآن", icon: BookOpen },
  { id: "tasbih", name: "السبحة", icon: Sparkles },
  { id: "adhkar", name: "الأذكار", icon: Moon }
];

const adhkar = [
  {
    title: "أذكار الصباح",
    text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له."
  },
  {
    title: "التسبيح",
    text: "سبحان الله وبحمده، سبحان الله العظيم."
  },
  {
    title: "الاستغفار",
    text: "أستغفر الله وأتوب إليه."
  },
  {
    title: "الصلاة على النبي ﷺ",
    text: "اللهم صل وسلم على نبينا محمد."
  }
];

export default function App() {
  const [page, setPage] = useState("home");
  const [count, setCount] = useState(0);
  const [zikr, setZikr] = useState("سبحان الله");
  const [menu, setMenu] = useState(false);
  const [done, setDone] = useState({});

  const navigate = (id) => {
    setPage(id);
    setMenu(false);
  };

  const Header = () => (
    <header className="topbar">
      <button className="icon-btn" onClick={() => setMenu(!menu)}>
        {menu ? <X /> : <Menu />}
      </button>
      <div className="brand">
        <span>غُرَبَاء</span>
        <small>GHORABAA</small>
      </div>
      <button className="icon-btn" onClick={() => navigate("settings")}>
        <Settings />
      </button>
    </header>
  );

  const HomePage = () => (
    <>
      <section className="welcome">
        <div className="welcome-content">
          <span className="eyebrow">السَّلَامُ عَلَيْكُمْ</span>
          <h1>أهلًا بك في غُرَبَاء</h1>
          <p>اجعل يومك عامرًا بذكر الله</p>
        </div>
        <div className="moon-art">☾</div>
      </section>

      <section className="prayer-card" onClick={() => navigate("prayer")}>
        <div className="section-heading">
          <span>مواقيت الصلاة</span>
          <MapPin size={17} />
        </div>
        <h2>حافظ على صلاتك</h2>
        <p>حدد موقعك لمعرفة مواقيت الصلاة الصحيحة</p>
        <button className="gold-button">عرض المواقيت <ChevronLeft /></button>
      </section>

      <div className="section-title">
        <h3>العبادات اليومية</h3>
        <span>اختر عبادتك</span>
      </div>

      <div className="feature-grid">
        <Feature icon={<BookOpen />} title="القرآن الكريم"
          subtitle="اقرأ وتدبر" onClick={() => navigate("quran")} />
        <Feature icon={<Sparkles />} title="السبحة الإلكترونية"
          subtitle="سبّح واذكر الله" onClick={() => navigate("tasbih")} />
        <Feature icon={<Moon />} title="الأذكار"
          subtitle="أذكار يومك" onClick={() => navigate("adhkar")} />
        <Feature icon={<Heart />} title="الصلاة على النبي ﷺ"
          subtitle="اللهم صل وسلم عليه" onClick={() => {
            setZikr("اللهم صل وسلم على نبينا محمد");
            setCount(0);
            navigate("tasbih");
          }} />
      </div>

      <section className="daily-message">
        <span>🤍</span>
        <p>اللهم اجعلنا من الذاكرين الشاكرين</p>
      </section>
    </>
  );

  const PrayerPage = () => (
    <section className="page-section">
      <PageTitle title="مواقيت الصلاة" />
      <div className="empty-state">
        <MapPin size={42} />
        <h2>حدد موقعك أولًا</h2>
        <p>سنستخدم موقعك لحساب مواقيت الصلاة المحلية بدقة.</p>
        <button className="gold-button"
          onClick={() => alert("سيتم إضافة خدمة تحديد الموقع وحساب المواقيت في الخطوة القادمة.")}>
          تحديد الموقع
        </button>
      </div>
    </section>
  );

  const QuranPage = () => (
    <section className="page-section">
      <PageTitle title="القرآن الكريم" />
      <div className="quran-cover">
        <BookOpen size={65} />
        <h2>القرآن الكريم</h2>
        <p>كلام الله نور القلوب</p>
      </div>
      <div className="empty-state">
        <p>سيتم ربط المصحف بنص قرآني موثوق مع التفسير والاستماع للتلاوة.</p>
      </div>
    </section>
  );

  const TasbihPage = () => (
    <section className="page-section tasbih-page">
      <PageTitle title="السبحة الإلكترونية" />
      <div className="zikr-selector">
        <label>اختر الذكر</label>
        <select value={zikr} onChange={(e) => {
          setZikr(e.target.value);
          setCount(0);
        }}>
          <option>سبحان الله</option>
          <option>الحمد لله</option>
          <option>الله أكبر</option>
          <option>أستغفر الله</option>
          <option>لا إله إلا الله</option>
          <option>اللهم صل وسلم على نبينا محمد</option>
        </select>
      </div>

      <div className="tasbih-circle" onClick={() => setCount(c => c + 1)}>
        <div className="count-number">{count}</div>
        <span>مرة</span>
        <button className="tasbih-click">تسبيح</button>
      </div>

      <h2 className="current-zikr">{zikr}</h2>
      <p className="tasbih-hint">اضغط على الدائرة للتسبيح</p>
      <button className="reset-button" onClick={() => setCount(0)}>
        <RotateCcw size={17} /> تصفير العداد
      </button>
    </section>
  );

  const AdhkarPage = () => (
    <section className="page-section">
      <PageTitle title="الأذكار" />
      <div className="adhkar-list">
        {adhkar.map((item, index) => (
          <article className="dhikr-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <button
              className={done[index] ? "done-button" : "gold-button"}
              onClick={() => setDone(prev => ({ ...prev, [index]: !prev[index] }))}
            >
              {done[index] ? "تم الذكر ✓" : "تمت القراءة"}
            </button>
          </article>
        ))}
      </div>
      <p className="source-note">
        هذه قائمة أولية، وسيتم استكمال الأذكار وتوثيق نصوصها ومصادرها قبل الإصدار.
      </p>
    </section>
  );

  const SettingsPage = () => (
    <section className="page-section">
      <PageTitle title="الإعدادات" />
      <div className="settings-card">
        <p>الإشعارات</p>
        <p>التذكير بالصلاة على النبي ﷺ</p>
        <p>المظهر: الأسود والذهبي</p>
        <p>عن غُرَبَاء</p>
        <p>تطوير WINE 🍷</p>
      </div>
    </section>
  );

  return (
    <div className="app-shell">
      <Header />

      {menu && (
        <div className="side-menu">
          {sections.map(item => (
            <button key={item.id} onClick={() => navigate(item.id)}>
              <item.icon size={19} /> {item.name}
            </button>
          ))}
        </div>
      )}

      <main className="main-content">
        {page === "home" && <HomePage />}
        {page === "prayer" && <PrayerPage />}
        {page === "quran" && <QuranPage />}
        {page === "tasbih" && <TasbihPage />}
        {page === "adhkar" && <AdhkarPage />}
        {page === "settings" && <SettingsPage />}
      </main>

      <nav className="bottom-nav">
        {sections.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={page === item.id ? "active" : ""}
              onClick={() => navigate(item.id)}
            >
              <Icon size={21} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <footer className="copyright">
        غُرَبَاء · GHORABAA
        <small>© 2026 WINE 🍷 — All Rights Reserved.</small>
      </footer>
    </div>
  );
}

function Feature({ icon, title, subtitle, onClick }) {
  return (
    <button className="feature-card" onClick={onClick}>
      <div className="feature-icon">{icon}</div>
      <strong>{title}</strong>
      <small>{subtitle}</small>
    </button>
  );
}

function PageTitle({ title }) {
  return <div className="page-title"><h1>{title}</h1></div>;
}
