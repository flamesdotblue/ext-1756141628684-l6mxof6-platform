import React, { useEffect, useRef, useState } from 'react'

function NoiseOverlay() {
  return <div className="noise-layer" aria-hidden="true" />
}

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <div className="brand">
        <span className="scribble">Black Barnum</span>
        <span className="tag">circus collective</span>
      </div>
      <button className={`burger ${open ? 'is-open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span />
        <span />
      </button>
      <nav className={`menu ${open ? 'show' : ''}`} onClick={() => setOpen(false)}>
        <a href="#shows">shows</a>
        <a href="#about">about</a>
        <a href="#join">join</a>
      </nav>
    </header>
  )
}

function Hero() {
  const videoRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const canplay = () => setVideoReady(true)
    v.addEventListener('canplay', canplay)
    // try play on mount
    const tryPlay = async () => {
      try { await v.play() } catch (_) {}
    }
    tryPlay()
    return () => v.removeEventListener('canplay', canplay)
  }, [])

  return (
    <section className="hero" aria-label="Hero">
      <div className="video-wrap" aria-hidden="true">
        <video
          ref={videoRef}
          className={`bg-video ${videoReady ? 'visible' : ''}`}
          playsInline
          muted
          loop
          preload="metadata"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop stop-color='%230a0a0b'/%3E%3Cstop offset='1' stop-color='%23101012'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E"
        >
          <source src="https://cdn.pixabay.com/video/2020/01/28/31517-390733006_large.mp4" type="video/mp4" />
        </video>
        <div className="video-vignette" />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hand">Welcome to</span>
          <span className="big">The Black Barnum</span>
        </h1>
        <p className="hero-sub">immersive circus rites in forgotten rooms</p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#shows">See upcoming rites</a>
          <a className="btn btn-ghost" href="#join">Join the procession</a>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="track">
          <span>abandoned halls • shadowed tightropes • whispered drums • candlelit contortions • </span>
          <span>abandoned halls • shadowed tightropes • whispered drums • candlelit contortions • </span>
        </div>
      </div>
    </section>
  )
}

function Shows() {
  const shows = [
    {
      title: 'Rafter Ghosts',
      where: 'The Old Mill, Dockside',
      when: 'Oct 31 — Nov 2',
      blurb: 'A high-wire séance under timbered beams. Arrival windows every 20 minutes.'
    },
    {
      title: 'Glass Cathedral',
      where: 'The Greenhouse, Botanic Ruin',
      when: 'Dec 13 — 15',
      blurb: 'Contortion and mirrored illusions among fractured panes. Limited procession.'
    },
    {
      title: 'Coal Dust Waltz',
      where: 'North Quarry Sublevel',
      when: 'Jan 24 — 26',
      blurb: 'Site-specific trapeze with subterranean choir. Hard hats provided.'
    }
  ]
  return (
    <section id="shows" className="section shows">
      <h2 className="section-title"><span className="hand">Upcoming</span> Rites</h2>
      <div className="grid">
        {shows.map((s, i) => (
          <article key={i} className="card">
            <div className="card-noise" aria-hidden="true" />
            <h3 className="card-title">{s.title}</h3>
            <p className="meta">{s.where} — {s.when}</p>
            <p className="blurb">{s.blurb}</p>
            <a className="btn btn-sm" href="#tickets">Summon tickets</a>
          </article>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section about">
      <h2 className="section-title"><span className="hand">About</span> the Collective</h2>
      <p className="lede">
        We are a roaming assembly of acrobats, riggers, musicians, and scenographers who wake the sleeping bones of buildings. Our rites are intimate, our edges unsanded, our laughter a little feral.
      </p>
      <ul className="ticks">
        <li>Site-specific storytelling</li>
        <li>Safety-first rigging in unsafe-looking places</li>
        <li>Live sound, analog oddities, and shadow play</li>
      </ul>
    </section>
  )
}

function Join() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setSent(true)
  }
  return (
    <section id="join" className="section join">
      <h2 className="section-title"><span className="hand">Join</span> the Procession</h2>
      <p className="lede">Low-frequency dispatches. No spam. Secret coordinates occasionally included.</p>
      {sent ? (
        <p className="thanks hand">We\'ll find you in the shadows soon.</p>
      ) : (
        <form onSubmit={submit} className="form">
          <label className="sr-only" htmlFor="email">Email</label>
          <input id="email" type="email" required placeholder="you@under.the.bridge" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <button className="btn btn-primary" type="submit">Receive whispers</button>
        </form>
      )}
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Black Barnum — fashioned with dust and wire.</p>
      <div className="links">
        <a href="#" aria-label="Instagram" title="Instagram">IG</a>
        <a href="#" aria-label="TikTok" title="TikTok">TT</a>
        <a href="#" aria-label="Email" title="Email">Mail</a>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    const root = document.documentElement
    const move = (e) => {
      root.style.setProperty('--mx', e.clientX + 'px')
      root.style.setProperty('--my', e.clientY + 'px')
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div className="app">
      <NoiseOverlay />
      <Nav />
      <Hero />
      <Shows />
      <About />
      <Join />
      <Footer />
    </div>
  )
}
