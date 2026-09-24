// Hand-drawn colored illustrations (SVG) used instead of photos. One per category id.
// To add one for a new category: add an entry below with the same key as the category id.
const ART = {
  HotDrinks: (
    <>
      <path className="steam art-anim" d="M23 17 q-3-4 0-8" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <path className="steam art-anim" d="M31 17 q-3-4 0-8" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" style={{ animationDelay: "0.8s" }} />
      <path className="steam art-anim" d="M39 17 q-3-4 0-8" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" style={{ animationDelay: "1.6s" }} />
      <ellipse cx="30" cy="53" rx="23" ry="5" fill="#CBD5E1" />
      <path d="M12 24 h36 v10 a16 16 0 0 1-16 16 h-4 a16 16 0 0 1-16-16z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
      <ellipse cx="30" cy="24" rx="18" ry="3.5" fill="#7C4A2D" />
      <path d="M48 28 h4 a6 6 0 0 1 0 12 h-5" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  Crepe: (
    <>
      <ellipse cx="32" cy="50" rx="26" ry="7" fill="#E2E8F0" />
      <path d="M8 45 Q32 6 56 45 Q32 53 8 45Z" fill="#F2C078" />
      <path d="M15 43 Q32 19 49 43" fill="none" stroke="#D9974A" strokeWidth="2" />
      <path d="M19 39 q4 6 8 0 t8 0 t8 0" fill="none" stroke="#5B3A29" strokeWidth="3" strokeLinecap="round" />
      <circle cx="44" cy="30" r="5.5" fill="#EF4444" />
      <path d="M41.5 26 l2.5-3.5 l2.5 3.5z" fill="#22C55E" />
    </>
  ),
  Cocktail: (
    <>
      <path className="wobble art-anim" d="M38 5 l-6 26" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M18 14 h28 l-4 40 a4 4 0 0 1-4 4 h-12 a4 4 0 0 1-4-4z" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
      <path d="M20.4 26 h23.2 l-2.2 28 a3 3 0 0 1-3 3 h-12.8 a3 3 0 0 1-3-3z" fill="#FB923C" />
      <path d="M22 34 h20" stroke="#FDBA74" strokeWidth="2" />
      <circle className="bubble art-anim" cx="28" cy="50" r="1.8" fill="#FED7AA" />
      <circle className="bubble art-anim" cx="35" cy="47" r="1.5" fill="#FED7AA" style={{ animationDelay: "0.9s" }} />
      <circle className="bubble art-anim" cx="32" cy="52" r="1.3" fill="#FED7AA" style={{ animationDelay: "1.7s" }} />
      <circle cx="46" cy="16" r="8" fill="#FDE047" stroke="#EAB308" strokeWidth="2" />
      <path d="M46 9.5 v13 M39.5 16 h13" stroke="#EAB308" strokeWidth="1.5" />
    </>
  ),
  NaturalJuice: (
    <>
      <circle cx="32" cy="37" r="22" fill="#FB923C" />
      <circle cx="32" cy="37" r="18" fill="#FED7AA" />
      <path d="M32 37 L50 37 M32 37 L44.7 49.7 M32 37 L32 55 M32 37 L19.3 49.7 M32 37 L14 37 M32 37 L19.3 24.3 M32 37 L32 19 M32 37 L44.7 24.3" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="37" r="3" fill="#FB923C" />
      <path d="M34 14 q10-10 20-4 q-6 10-20 4z" fill="#22C55E" />
    </>
  ),
  Plates: (
    <>
      <ellipse cx="32" cy="46" rx="28" ry="10" fill="#E2E8F0" />
      <ellipse cx="32" cy="44" rx="22" ry="7" fill="#F8FAFC" />
      <circle cx="15" cy="38" r="6" fill="#FB923C" />
      <circle cx="24" cy="32" r="8" fill="#EF4444" />
      <path d="M21 25 l3 3 l3-3" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="39" cy="30" r="9" fill="#84CC16" />
      <circle cx="39" cy="30" r="4" fill="#ECFCCB" />
      <circle cx="49" cy="39" r="5" fill="#7C3AED" />
      <circle cx="42" cy="41" r="5" fill="#8B5CF6" />
    </>
  ),
  Milkshakes: (
    <>
      <path className="wobble art-anim" d="M40 3 l-4 20" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M19 23 h26 l-3 31 a4 4 0 0 1-4 4 h-12 a4 4 0 0 1-4-4z" fill="#F9A8D4" />
      <path d="M19 23 h26" stroke="#F472B6" strokeWidth="2" />
      <path d="M18 24 c0-13 28-13 28 0z" fill="#FFF7ED" stroke="#FBCFE8" strokeWidth="1.5" />
      <circle cx="32" cy="12" r="4.5" fill="#DC2626" />
      <path d="M32 8 q2-4 5-4" fill="none" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  Manakish: (
    <>
      <circle cx="32" cy="34" r="25" fill="#C98A45" />
      <circle cx="32" cy="34" r="21" fill="#E9B872" />
      <circle cx="32" cy="34" r="16" fill="#4D7C2A" />
      <g fill="#A3D977">
        <circle cx="26" cy="29" r="1.6" /><circle cx="37" cy="27" r="1.6" /><circle cx="32" cy="36" r="1.6" />
        <circle cx="41" cy="38" r="1.6" /><circle cx="25" cy="41" r="1.6" /><circle cx="34" cy="44" r="1.6" />
      </g>
    </>
  ),
  Shisha: (
    <>
      <path d="M25 5 h14 l-2 9 h-10z" fill="#B45309" />
      <circle className="steam art-anim" cx="30" cy="3" r="2" fill="#94A3B8" fillOpacity=".7" />
      <circle className="steam art-anim" cx="35" cy="2" r="1.6" fill="#94A3B8" fillOpacity=".7" style={{ animationDelay: "0.8s" }} />
      <circle className="steam art-anim" cx="32" cy="3" r="1.4" fill="#94A3B8" fillOpacity=".7" style={{ animationDelay: "1.6s" }} />
      <rect x="30" y="14" width="4" height="16" fill="#94A3B8" />
      <ellipse cx="32" cy="31" rx="8" ry="3" fill="#CBD5E1" />
      <path d="M22 34 h20 q6 6 0 18 q-10 6-20 0 q-6-12 0-18z" fill="#38BDF8" fillOpacity=".85" stroke="#0EA5E9" strokeWidth="2" />
      <path d="M42 40 q14-2 14-14 v-7" fill="none" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      <rect x="22" y="54" width="20" height="4" rx="2" fill="#94A3B8" />
    </>
  ),
};

export const hasArt = (id) => id in ART;

export default function CategoryArt({ id, className = "h-full w-full overflow-visible" }) {
  if (!ART[id]) return null;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {ART[id]}
    </svg>
  );
}
