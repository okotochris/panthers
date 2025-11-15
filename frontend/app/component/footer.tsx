import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import Link from 'next/link'


function Footer() {
  return (
      <footer className="bg-slate-900 border-t text-white border-amber-500/20 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-amber-400 mb-4">Panthers Football Academy</h3>
            <p className="opacity-80 text-white mb-4">Founded in 2022, Panthers FA is dedicated to developing young talents through elite training, academics, and character building at our state-of-the-art facility in Lagos, Nigeria.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-amber-400 hover:text-amber-300"><Facebook size={20} /></Link>
              <Link href="#" className="text-amber-400 hover:text-amber-300"><Instagram size={20} /></Link>
              <Link href="#" className="text-amber-400 hover:text-amber-300"><Youtube size={20} /></Link>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h4>
            <ul className="space-y-2 text-white text-sm">
              <li><Link href="/about" className="opacity-80 hover:text-amber-400 transition">About Us</Link></li>
              <li><Link href="/news" className="opacity-80 hover:text-amber-400 transition">News</Link></li>
              <li><Link href="/fixtures" className="opacity-80 hover:text-amber-400 transition">Fixtures</Link></li>
              <li><Link href="/players" className="opacity-80 hover:text-amber-400 transition">Players</Link></li>
              <li><Link href="/join" className="opacity-80 hover:text-amber-400 transition">Join Us</Link></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Contact Us</h4>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 opacity-80"><MapPin size={16} /> Lagos, Nigeria</p>
              <p className="flex items-center gap-2 opacity-80"><Phone size={16} /> +234 123 456 789</p>
              <p className="flex items-center gap-2 opacity-80"><Mail size={16} /> info@panthersfa.com</p>
            </div>
          </div>
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Stay Updated</h4>
            <p className="opacity-80 mb-4">Subscribe for match alerts and academy news.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded bg-white/10 text-white placeholder:opacity-50 border border-amber-500/20 focus:outline-none focus:border-amber-400" />
              <button type="submit" className="px-4 py-2 bg-amber-500 rounded hover:bg-amber-600 transition">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-amber-500/20 mt-8 pt-6 text-center opacity-70 text-sm">
          &copy; 2025 Panthers Football Academy. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </footer>
  )
}

export default Footer
