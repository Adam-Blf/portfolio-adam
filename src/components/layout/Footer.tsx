import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[--border] py-12">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo-adam.svg"
                alt="Adam Beloucif"
                width={48}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-[--text-secondary] text-sm max-w-xs">
              Data Engineer & Fullstack Developer.
              Building data systems that drive decisions.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-caption mb-4">Navigation</p>
            <div className="space-y-2">
              {['Accueil', 'Parcours', 'Projets', 'Compétences', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Accueil' ? '/' : `/${item.toLowerCase().replace('é', 'e')}`}
                  className="block text-sm text-[--text-secondary] hover:text-accent transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-caption mb-4">Contact</p>
            <a
              href="mailto:adam.beloucif@efrei.net"
              className="block text-sm text-[--text-secondary] hover:text-accent transition-colors mb-4"
            >
              adam.beloucif@efrei.net
            </a>
            <div className="flex gap-4">
              <a
                href="https://github.com/Adam-Blf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[--text-secondary] hover:text-accent transition-colors"
                aria-label="GitHub d'Adam Beloucif (nouvelle fenetre)"
              >
                GitHub<span className="sr-only"> (ouvre dans une nouvelle fenetre)</span>
              </a>
              <a
                href="https://www.linkedin.com/in/adambeloucif/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[--text-secondary] hover:text-accent transition-colors"
                aria-label="LinkedIn d'Adam Beloucif (nouvelle fenetre)"
              >
                LinkedIn<span className="sr-only"> (ouvre dans une nouvelle fenetre)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[--border] flex flex-wrap justify-between items-center gap-4">
          <p className="text-caption">
            © {currentYear} Adam Beloucif
          </p>
          <p className="text-caption">
            Paris, France
          </p>
        </div>
      </div>
    </footer>
  )
}
