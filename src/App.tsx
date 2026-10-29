import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import { events, REGISTER_URL } from "./events"
import { galleryPhotos } from "./gallery"

type Page = "home" | "events" | "contact" | "gallery"
type OverlayType = "poster" | "brochure" | null

const MAPS =
  "https://maps.app.goo.gl/xRoKbFhGqvAQW8T99"

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function Tape({
  items,
  className = "",
}: {
  items: string[]
  className?: string
}) {
  const row = [...items, ...items, ...items, ...items]
  return (
    <div className={`tape ${className}`} aria-hidden="true">
      <div>
        {row.map((t, i) => (
          <span key={i}>
            {t}
            <i />
          </span>
        ))}
      </div>
    </div>
  )
}

function Header({ page, setPage }: {
  page: Page
  setPage: (p: Page) => void
}) {
  const [open, setOpen] = useState(false)
  const go = (p: Page) => {
    setPage(p)
    setOpen(false)
    window.scrollTo({ top: 0 })
  }
  return (
    <header className="site-header">
      <button
        className="logo-pill"
        onClick={() => go("home")}
        aria-label="Chiguru home"
      >
        <img src="/assets/701c9.svg" alt="Chiguru 2026" />
      </button>
      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? "CLOSE" : "MENU"}
      </button>
      <nav className={open ? "open" : ""} aria-label="Main navigation">
        {(["home", "events", "contact"] as Page[]).map((p) => (
          <button
            className={page === p ? "active" : ""}
            key={p}
            onClick={() => go(p)}
          >
            {p}
          </button>
        ))}
        <a
          className="nav-cta"
          href={REGISTER_URL}
          target="_blank"
          rel="noreferrer"
        >
          Register now <Arrow />
        </a>
      </nav>
    </header>
  )
}

function Hero({
  setPage,
  setOverlay,
}: {
  setPage: (p: Page) => void
  setOverlay: (o: OverlayType) => void
}) {
  return (
    <section className="hero">
      <img className="stk stk-dancer" src="/assets/st-dancer.png" alt="" />
      <img className="stk stk-band" src="/assets/st-band.png" alt="" />
      <img className="stk stk-drummer" src="/assets/st-drummer.png" alt="" />
      <img className="stk stk-singer" src="/assets/st-singer.png" alt="" />
      <img className="stk stk-guitar" src="/assets/st-guitar.png" alt="" />

      <div className="hero-inner">
        <p className="presents">Cambridge Institute of Technology presents</p>
        <h1>
          {/* <span>Chiguru</span> */}
          <span>Chiguru</span>
        </h1>
        <div className="hero-sub">
          <b className="year">2026</b>
          <span>Inter-collegiate cultural fest</span>
        </div>
        <div className="hero-actions">
          <a
            className="btn btn-yellow"
            href={REGISTER_URL}
            target="_blank"
            rel="noreferrer"
          >
            Register now <Arrow />
          </a>
          <button
            className="btn btn-white"
            onClick={() => setOverlay("brochure")}
          >
            Peek the brochure
          </button>
        </div>
      </div>

      <div className="date-badge">
        <small>Nov</small>
        <strong>
          20<em>&amp;</em>21
        </strong>
        <small>Bengaluru</small>
      </div>
    </section>
  )
}

function HomePage({
  setPage,
  setOverlay,
}: {
  setPage: (p: Page) => void
  setOverlay: (o: OverlayType) => void
}) {
  const picks = ["Indian Group Dance", "Battle of Bands", "Fashion Show"].map(
    (n) => events.find((e) => e.name === n)!,
  )
  return (
    <main>
      <Hero setPage={setPage} setOverlay={setOverlay} />
      <div className="tapes">
        <Tape
          className="tape-yellow"
          items={["Dance", "Music", "Theatre", "Fashion", "Art", "Mic"]}
        />
        <Tape
          className="tape-black"
          items={[
            "Nov 20 & 21",
            "KR Puram",
            "Bengaluru",
            "Chiguru 2026",
            "Be there",
          ]}
        />
      </div>

      <section className="vibe">
        <h2>
          <span className="hl hl-orange">2 days.</span>{" "}
          <span className="hl hl-blue">30 events.</span> One campus that{" "}
          <span className="hl hl-pink">does not sleep.</span>
        </h2>
        <p>
          Chiguru is where colleges across Bengaluru show up, show off and shut
          it down. Dance, bands, bars, ramps, reels. Bring your gang and take
          over.
        </p>
        <div className="stat-row">
          <div className="stat s1">
            <strong>2</strong>
            <span>days of chaos</span>
          </div>
          <div className="stat s2">
            <strong>30</strong>
            <span>events to win</span>
          </div>
          <div className="stat s3">
            <strong>∞</strong>
            <span>main character moments</span>
          </div>
        </div>
      </section>

      <section className="picks">
        <div className="section-head">
          <h2>
            Pick your
            <br />
            <em>chaos.</em>
          </h2>
          <button className="btn btn-black" onClick={() => setPage("events")}>
            See all events <Arrow />
          </button>
        </div>
        <div className="pick-grid">
          {picks.map((e, i) => (
            <button
              key={e.name}
              className={`pick pick-${i + 1}`}
              style={{ "--c": e.color } as CSSProperties}
              onClick={() => setPage("events")}
            >
              <span className="pick-cat">Featured</span>
              <strong>{e.name}</strong>
              <em>{e.category}</em>
              <span className="pick-go">
                See event <Arrow />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="deets">
        <h2>
          Grab the <em>deets.</em>
        </h2>
        <div className="deets-grid">
          <button className="poster-tile" onClick={() => setOverlay("poster")}>
            <img src="/assets/chiguru-poster.png" alt="Chiguru 2026 poster" />
            <span className="sticker-tag">Poster ↗</span>
          </button>
          <button className="zine-tile" onClick={() => setOverlay("brochure")}>
            <small>The official</small>
            <strong>
              Bro
              <br />
              chure
            </strong>
            <span>Schedule / rules / venues</span>
            <i className="sticker-tag">Open ↗</i>
          </button>
        </div>
      </section>

      <section className="gallery-teaser">
        <div>
          <h2>
            Previous year's <em>vibes.</em>
          </h2>
          <p>Missed it? Scroll through the chaos from the last edition.</p>
        </div>
        <button className="btn btn-black" onClick={() => setPage("gallery")}>
          Open the gallery <Arrow />
        </button>
      </section>

      <section className="where">
        <div className="where-copy">
          <h2>
            Where it's
            <br />
            going <em>down.</em>
          </h2>
          <address>
            Cambridge Institute of Technology
            <br />K R Puram, Bengaluru - 560036
          </address>
          <a
            className="btn btn-yellow"
            href={MAPS}
            target="_blank"
            rel="noreferrer"
          >
            Get directions <Arrow />
          </a>
        </div>
        <div className="map" aria-hidden="true">
          <div className="road r1" />
          <div className="road r2" />
          <div className="road r3" />
          <div className="block b1" />
          <div className="block b2" />
          <div className="block b3" />
          <div className="pin">
            <span>
              You're
              <br />
              here
            </span>
          </div>
          <img className="stk stk-tabla" src="/assets/st-tabla.png" alt="" />
        </div>
      </section>
    </main>
  )
}

function EventsPage() {
  const cats = ["All", ...Array.from(new Set(events.map((e) => e.category)))]
  const [cat, setCat] = useState("All")
  const [active, setActive] = useState<string | null>(null)
  const list = cat === "All" ? events : events.filter((e) => e.category === cat)

  return (
    <main className="events-page">
      <section className="page-title">
        <h1>
          Events<i>.</i>
        </h1>
        <p>Hover a name to see who to call. Tap on your phone.</p>
        <img className="stk stk-dancer2" src="/assets/st-dancer.png" alt="" />
      </section>

      <div className="chips">
        {cats.map((c) => (
          <button
            key={c}
            className={cat === c ? "on" : ""}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <section className="ev-list">
        {list.map((e) => {
          const isOn = active === e.name
          const num = events.indexOf(e) + 1
          return (
            <article
              key={e.name}
              className={`ev ${isOn ? "on" : ""}`}
              style={{ "--c": e.color } as CSSProperties}
              onMouseEnter={() => setActive(e.name)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="ev-row">
                <span className="ev-n">{String(num).padStart(2, "0")}</span>
                <button
                  className="ev-name"
                  onClick={() => setActive(isOn ? null : e.name)}
                  onFocus={() => setActive(e.name)}
                  aria-expanded={isOn}
                >
                  {e.name}
                </button>
                <span className="ev-cat">{e.category}</span>
                <a
                  className="ev-reg"
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Register <Arrow />
                </a>
              </div>
              {isOn && (
                <div className="ev-card">
                  <span className="ev-card-tag">{e.category}</span>
                  <h3>{e.name}</h3>
                  <dl>
                    {e.coordinators.map(([name, phone], i) => (
                      <div key={name + phone}>
                        <dt>Coordinator {i + 1}</dt>
                        <dd>
                          {name}
                          <a href={`tel:${phone.replace(/\s/g, "")}`}>
                            {phone}
                          </a>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    className="btn btn-black"
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Register now <Arrow />
                  </a>
                </div>
              )}
            </article>
          )
        })}
      </section>

      <Tape
        className="tape-black"
        items={["30 events", "Pick your stage", "Chiguru 2026"]}
      />
    </main>
  )
}

const galleryColors = ["#ff6b1a", "#35b8f0", "#ffd23f", "#ff4fa3", "#1fa35c"]

function GalleryRow({
  row,
  reverse,
}: {
  row: number
  reverse?: boolean
}) {
  const n = galleryPhotos.length
  const order = Array.from({ length: n }, (_, i) => (i + row * 3) % n)
  return (
    <div className={`g-row ${reverse ? "rev" : ""}`}>
      <div>
        {[...order, ...order].map((p, k) => (
          <figure
            key={k}
            className={`g-tile t${(p + row) % 3} ${galleryPhotos[p].includes("-full") ? "full" : ""}`}
            style={
              {
                "--c": galleryColors[(p * 2 + row) % galleryColors.length],
              } as CSSProperties
            }
          >
            <img src={`/gallery/${galleryPhotos[p]}`} alt="Chiguru last year" />
          </figure>
        ))}
      </div>
    </div>
  )
}

function GalleryPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main className="gallery-page">
      <section className="page-title">
        <h1>
          Gallery<i>.</i>
        </h1>
        <p>Previous year's chaos, frozen in time.</p>
      </section>
      <section className="g-wall">
        <GalleryRow row={0} />
        <GalleryRow row={1} reverse />
        <GalleryRow row={2} />
      </section>
      <section className="g-cta">
        <h2>
          This year is <em>bigger.</em>
        </h2>
        <div>
          <a
            className="btn btn-yellow"
            href={REGISTER_URL}
            target="_blank"
            rel="noreferrer"
          >
            Register now <Arrow />
          </a>
          <button className="btn btn-white" onClick={() => setPage("events")}>
            See events
          </button>
        </div>
      </section>
    </main>
  )
}

function ContactPage() {
  return (
    <main className="contact-page">
      <section className="page-title">
        <h1>
          Say hi<i>.</i>
        </h1>
        <p>Doubts about events, registration or the venue? Hit us up.</p>
        <img className="stk stk-guitar2" src="/assets/st-guitar.png" alt="" />
      </section>

      <section className="contact-cards">
        <a className="c-card cc1" href="mailto:chiguru@cambridge.edu.in">
          <small>Email</small>
          <strong>chiguru@cambridge.edu.in</strong>
          <Arrow />
        </a>
        <a className="c-card cc2" href="tel:+918310486203">
          <small>For Registrations</small>
          <strong>+91 83104 86203</strong>
          <Arrow />
        </a>
        <a className="c-card cc3" href="https://www.instagram.com/cit.chiguru/">
          <small>Instagram</small>
          <strong>@cit.chiguru</strong>
          <Arrow />
        </a>
      </section>

      {/* <section className="crew">
        <h2>
          The <em>crew.</em>
        </h2>
        <div className="crew-grid">
          {[
            ["Fest lead", "Name here", "+91 98765 43210"],
            ["Registrations", "Name here", "+91 98765 43211"],
            ["Events", "Name here", "+91 98765 43212"],
            ["Hospitality", "Name here", "+91 98765 43213"],
          ].map(([role, name, phone], i) => (
            <div className={`id-card id${i + 1}`} key={role}>
              <span>{role}</span>
              <strong>{name}</strong>
              <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
            </div>
          ))}
        </div>
      </section> */}

      <section className="where where-contact">
        <div className="where-copy">
          <h2>
            Come
            <br />
            find <em>us.</em>
          </h2>
          <address>
            Cambridge Institute of Technology
            <br />K R Puram, Bengaluru - 560036
          </address>
          <a
            className="btn btn-yellow"
            href={MAPS}
            target="_blank"
            rel="noreferrer"
          >
            Open in Maps <Arrow />
          </a>
        </div>
        <div className="map" aria-hidden="true">
          <div className="road r1" />
          <div className="road r2" />
          <div className="road r3" />
          <div className="block b1" />
          <div className="block b2" />
          <div className="block b3" />
          <div className="pin">
            <span>
              You're
              <br />
              here
            </span>
          </div>
          <img className="stk stk-tabla" src="/assets/st-tabla.png" alt="" />
        </div>
      </section>
    </main>
  )
}

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0 })
  }
  return (
    <footer>
      <div className="foot-big">CHIGURU</div>
      <div className="foot-row">
        <div className="foot-links">
          <button onClick={() => go("home")}>Home</button>
          <button onClick={() => go("events")}>Events</button>
          <button onClick={() => go("gallery")}>Gallery</button>
          <button onClick={() => go("contact")}>Contact</button>
        </div>
        <div className="foot-links">
          <a href="https://www.instagram.com/cit.chiguru">Instagram</a>
          <a href="https://www.youtube.com/@CITBengaluru">YouTube</a>
        </div>
        <p>Nov 20 & 21, 2026 / Cambridge Institute of Technology</p>
      </div>
    </footer>
  )
}

function Overlay({ type, close }: {
  type: OverlayType
  close: () => void
}) {
  useEffect(() => {
    if (!type) return
    const key = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", key)
    return () => window.removeEventListener("keydown", key)
  }, [type, close])

  if (!type) return null
  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <button className="close-btn" onClick={close} aria-label="Close">
        ✕
      </button>
      {type === "poster" && (
        <div className="poster-modal">
          <img src="/assets/chiguru-poster.png" alt="Chiguru 2026 poster" />
          <a
            className="btn btn-yellow"
            href="/assets/chiguru-poster.png"
            download
          >
            Download poster ↓
          </a>
        </div>
      )}
      {type === "brochure" && (
        <div className="zine-modal">
          <div className="zine-cover">
            <small>Cambridge Institute of Technology</small>
            <img src="/assets/701c9.svg" alt="Chiguru 2026" />
            <strong>The brochure</strong>
          </div>
          <div className="zine-body">
            <h2>
              Your fest
              <br />
              <em>cheat sheet.</em>
            </h2>
            <p>The full PDF is landing soon. Here is what's inside.</p>
            <ul>
              <li>Event rules and rounds</li>
              <li>Day-wise schedule</li>
              <li>Venue map and how to reach</li>
            </ul>
            <button className="btn btn-black" onClick={close}>
              Cool, got it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>(() => {
    const h = window.location.hash.slice(1)
    return (["events", "contact", "gallery"].includes(h) ? h : "home") as Page
  })
  const [overlay, setOverlay] = useState<OverlayType>(null)

  return (
    <div className="app">
      <Header page={page} setPage={setPage} />
      {page === "home" && (
        <HomePage setPage={setPage} setOverlay={setOverlay} />
      )}
      {page === "events" && <EventsPage />}
      {page === "gallery" && <GalleryPage setPage={setPage} />}
      {page === "contact" && <ContactPage />}
      <Footer setPage={setPage} />
      <Overlay type={overlay} close={() => setOverlay(null)} />
    </div>
  )
}
