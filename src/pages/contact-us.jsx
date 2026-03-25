import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

// ── Validation ───────────────────────────────────────────────────────────────
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = {
    clientName: (v) => (!v?.trim() ? "Client name is required" : null),
    contactNumber: (v) => {
        if (!v?.trim()) return "Contact number is required";
        if (!/^\d{10}$/.test(v.trim())) return "Enter a valid 10-digit number";
        return null;
    },
    email: (v) => {
        if (!v || !v.trim()) return null; // skip validation if empty
        if (!emailRegex.test(v.trim())) return "Enter a valid email address";
        return null;
    },
    scope: (v) => (!v?.length ? "Select at least one scope of work" : null),
    projectType: (v) => (!v?.length ? "Select at least one project type" : null),
    service: (v) => (!v?.trim() ? "Select a service requirement" : null),
    location: (v) => (!v?.trim() ? "Site address is required" : null),
};

const runValidation = (form) => {
    const errors = {};
    Object.entries(schema).forEach(([field, fn]) => {
        const msg = fn(form[field]);
        if (msg) errors[field] = msg;
    });
    return errors;
};

// ── Data ─────────────────────────────────────────────────────────────────────
const SCOPE_OPTIONS = ["Architectural Design", "Interior Design", "Landscape Design", "Renovation / Remodeling", "3D Visualization"];
const PROJECT_TYPES = ["Residential", "Commercial", "Hospitality", "Housing", "Institutional", "Industrial"];
const SERVICES = ["Design Consultancy Service", "Design Consultancy + Turnkey Execution Service", "Online Consultancy Service"];

// ── Shared styles ─────────────────────────────────────────────────────────────
const inputCls = "w-full px-4 py-3.5 text-sm bg-white border border-stone-200 rounded-xl text-stone-800 placeholder-stone-300 outline-none transition-all duration-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10";

// ── Reusable pieces ───────────────────────────────────────────────────────────
const SectionLabel = ({ num, children }) => (
    <div className="flex items-center gap-3 mt-10 mb-5">
        <span className="text-2xl font-bold text-amber-600 leading-none tabular-nums">{num}</span>
        <div className="h-5 w-px bg-amber-200" />
        <span className="text-xs font-bold tracking-[0.15em] uppercase text-stone-400">{children}</span>
        <div className="flex-1 h-px bg-stone-100" />
    </div>
);

const FieldWrap = ({ error, className = "", children }) => (
    <div className={`flex flex-col gap-1.5 ${className}`}>
        {children}
        {error && (
            <p className="text-xs text-red-500 flex items-center gap-1.5 font-medium">
                <span className="text-[10px]">⚠</span> {error}
            </p>
        )}
    </div>
);

const FieldLabel = ({ required, children }) => (
    <label className="text-[11px] font-bold tracking-widest uppercase text-stone-500 select-none">
        {children}{required && <span className="text-amber-600 ml-0.5">*</span>}
    </label>
);

const PillToggle = ({ label, active, onChange }) => (
    <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium cursor-pointer select-none transition-all duration-150 whitespace-nowrap
    ${active
            ? "bg-amber-600 border-amber-600 text-white shadow-md shadow-amber-600/25"
            : "bg-white border-stone-200 text-stone-500 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50"
        }`}
    >
        <input type="checkbox" checked={active} onChange={onChange} className="sr-only" />
        {/* <span className={`text-xs font-bold w-3 text-center transition-transform ${active ? "scale-110" : ""}`}>
             {active ? "✓" : "+"} 
        </span> */}
        {label}
    </label>
);

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ContactPage() {
    const [form, setForm] = useState({
        clientName: "", companyName: "", contactNumber: "", email: "",
        scope: [], scopeOther: "", projectType: [], projectTypeOther: "",
        service: "", description: "", budget: "", timeline: "",
        location: "", billingAddress: "",
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const set = (name, value) => {
        setForm((p) => ({ ...p, [name]: value }));
        if (errors[name]) setErrors((p) => ({ ...p, [name]: null }));
    };

    const handleChange = (e) => set(e.target.name, e.target.value);

    const toggleArray = (field, value) => {
        const arr = form[field];
        set(field, arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = runValidation(form);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            setTimeout(() => {
                document.querySelector(".err-anchor")?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 50);
            return;
        }
        setLoading(true);
        try {
            await fetch(`${apiUrl}/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ── Success ──────────────────────────────────────────────────────────────
    if (submitted) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
                <div className="bg-white border border-stone-200 rounded-3xl p-12 max-w-lg w-full text-center shadow-2xl shadow-stone-200">
                    {/* <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl shadow-xl shadow-amber-600/30">
                        ✓
                    </div> */}
                    <h2 className="text-4xl font-bold text-stone-900 mb-3 tracking-tight">Inquiry Sent!</h2>
                    <p className="text-stone-500 leading-relaxed mb-8 text-sm">
                       Thank you for approaching H&A. We will review your project vision and reach out to you at the earliest.
                    </p>
                    <button
                        onClick={() => { setSubmitted(false); setForm({ clientName: "", companyName: "", contactNumber: "", email: "", scope: [], scopeOther: "", projectType: [], projectTypeOther: "", service: "", description: "", budget: "", timeline: "", location: "", billingAddress: "" }); }}
                        className="px-10 py-3.5 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-amber-700 transition-colors duration-200"
                    >
                        Submit Another Inquiry
                    </button>
                </div>
            </div>
        );
    }

    // ── Page ─────────────────────────────────────────────────────────────────
    return (
        <div className="bg-white min-h-screen text-stone-900">

{/*             
            <section className="relative h-screen min-h-[600px] max-h-[860px] flex flex-col items-center justify-center overflow-hidden">
                
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[14000ms] hover:scale-105"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1800&q=90')" }}
                />
             
                <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/70 to-stone-50/90" />
              
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(155,120,80,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(155,120,80,0.3) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />

               
                <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-amber-700 bg-amber-50 border border-amber-200 px-5 py-2 rounded-full mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        H &amp; A Architects
                    </span>

                    <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.02] tracking-tight text-stone-900 mb-6">
                        Start Your<br />
                        <span className="italic font-light text-amber-600">Dream Project</span>
                    </h1>

                    <p className="text-base sm:text-lg text-stone-500 leading-relaxed max-w-lg mx-auto mb-10">
                        Tell us about your vision — we'll shape it into architecture that endures for generations.
                    </p>

                    <a
                        href="#inquiry-form"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-white text-sm font-semibold rounded-2xl hover:bg-amber-700 transition-all duration-200 hover:shadow-xl hover:shadow-amber-700/30 hover:-translate-y-0.5"
                    >
                        Start Your Inquiry
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

                <div className="absolute bottom-0 left-0 right-0 border-t border-stone-100 bg-white/80 backdrop-blur-sm">
                    <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-center gap-0 divide-x divide-stone-200 flex-wrap">
                        {[["200+", "Projects Delivered"], ["15+", "Years of Excellence"], ["50+", "Cities Served"], ["98%", "Client Satisfaction"]].map(([val, label]) => (
                            <div key={label} className="flex flex-col items-center px-8 py-1 sm:py-0">
                                <strong className="text-2xl sm:text-3xl font-bold text-stone-900 leading-none tracking-tight">{val}</strong>
                                <span className="text-[10px] text-stone-400 tracking-[0.12em] uppercase mt-1">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* ══ FORM ══════════════════════════════════════════════════════════════ */}
            <section id="inquiry-form" className="bg-stone-50 py-16 px-4 sm:px-6 lg:px-8">

                {/* Section intro */}
                <div className="max-w-5xl mx-auto mb-10 text-center">
                    <p className="text-3xl font-bold tracking-[0.2em] uppercase text-amber-600 mb-2">Get in touch</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Tell Us About Your Project</h2>
                    <p className="text-stone-400 text-sm mt-2">Fill in the details below and our team will get back to you within 24 hours.</p>
                </div>

                {/* ── Two-column layout on large screens ── */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">

                        {/* ── LEFT: Main form card ── */}
                        <div className="bg-white rounded-3xl border border-stone-200 shadow-lg shadow-stone-100 overflow-hidden">

                            {/* Card top bar */}
                            <div className="bg-gradient-to-r from-stone-900 to-stone-800 px-8 py-5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-bold text-lg tracking-tight">Project Inquiry Form</h3>
                                    <p className="text-stone-400 text-xs mt-0.5">Fields marked <span className="text-amber-400">*</span> are required</p>
                                </div>
                                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-amber-500/30">
                                    New Inquiry
                                </span>
                            </div>

                            <div className="p-6 sm:p-8 lg:p-10">
                                <form onSubmit={handleSubmit} noValidate>

                                    {/* ── 01 Client ── */}
                                    <SectionLabel num="01">Client Information</SectionLabel>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <FieldWrap error={errors.clientName} className={errors.clientName ? "err-anchor" : ""}>
                                            <FieldLabel required>Client Name</FieldLabel>
                                            <input name="clientName" placeholder="John Doe" className={inputCls} onChange={handleChange} value={form.clientName} />
                                        </FieldWrap>

                                        <FieldWrap>
                                            <FieldLabel>Company Name</FieldLabel>
                                            <input name="companyName" placeholder="Optional" className={inputCls} onChange={handleChange} value={form.companyName} />
                                        </FieldWrap>

                                        <FieldWrap error={errors.contactNumber} className={errors.contactNumber ? "err-anchor" : ""}>
                                            <FieldLabel required>Contact Number</FieldLabel>
                                            <input name="contactNumber" placeholder="10-digit number" maxLength={10} className={inputCls} onChange={handleChange} value={form.contactNumber} />
                                        </FieldWrap>

                                        <FieldWrap error={errors.email}
                                        //  className={errors.email ? "err-anchor" : ""}
                                        >
                                            <FieldLabel>Email Address</FieldLabel>
                                            <input name="email" type="email" placeholder="you@example.com (Optional)" className={inputCls} onChange={handleChange} value={form.email} />
                                        </FieldWrap>

                                        <FieldWrap>
                                            <FieldLabel>Client Address</FieldLabel>
                                            <input name="billingAddress" placeholder="Full address (optional)" className={inputCls} onChange={handleChange} value={form.billingAddress} />
                                        </FieldWrap>
                                    </div>


                                    {/* ── 02 Location ── */}
                                    <SectionLabel num="02">Project &amp; Location</SectionLabel>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <FieldWrap error={errors.location} className={errors.location ? "err-anchor" : ""}>
                                            <FieldLabel required>Site Address</FieldLabel>
                                            <input name="location" placeholder="City, State" className={inputCls} onChange={handleChange} value={form.location} />
                                        </FieldWrap>
                                        {/* <FieldWrap>
                                            <FieldLabel>Client Address</FieldLabel>
                                            <input name="billingAddress" placeholder="Full address (optional)" className={inputCls} onChange={handleChange} value={form.billingAddress} />
                                        </FieldWrap> */}
                                    </div>


                                    {/* ── 02 Scope ── */}
                                    <SectionLabel num="03">Scope of Work <span className="text-amber-600 normal-case font-normal">*</span></SectionLabel>
                                    <div className="flex flex-wrap gap-2.5">
                                        {SCOPE_OPTIONS.map((item) => (
                                            <PillToggle key={item} label={item} active={form.scope.includes(item)} onChange={() => toggleArray("scope", item)} />
                                        ))}
                                    </div>
                                    <input name="scopeOther" placeholder="Other scope (optional)" className={`${inputCls} mt-3`} onChange={handleChange} value={form.scopeOther} />
                                    {errors.scope && <p className="err-anchor text-xs text-red-500 flex items-center gap-1.5 mt-2 font-medium"><span>⚠</span>{errors.scope}</p>}

                                    {/* ── 03 Project Type ── */}
                                    <SectionLabel num="04">Project Type <span className="text-amber-600 normal-case font-normal">*</span></SectionLabel>
                                    <div className="flex flex-wrap gap-2.5">
                                        {PROJECT_TYPES.map((item) => (
                                            <PillToggle key={item} label={item} active={form.projectType.includes(item)} onChange={() => toggleArray("projectType", item)} />
                                        ))}
                                    </div>
                                    <input name="projectTypeOther" placeholder="Other type (optional)" className={`${inputCls} mt-3`} onChange={handleChange} value={form.projectTypeOther} />
                                    {errors.projectType && <p className="err-anchor text-xs text-red-500 flex items-center gap-1.5 mt-2 font-medium"><span>⚠</span>{errors.projectType}</p>}

                                    {/* ── 04 Service ── */}
                                    <SectionLabel num="05">Service Requirements <span className="text-amber-600 normal-case font-normal">*</span></SectionLabel>
                                    <div className="flex flex-col gap-3">
                                        {SERVICES.map((item) => {
                                            const active = form.service === item;
                                            return (
                                                <label key={item} className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-sm font-medium cursor-pointer select-none transition-all duration-150
                                                  ${active ? "border-amber-500 bg-amber-50 text-amber-800" : "border-stone-200 bg-stone-50 text-stone-600 hover:border-amber-300 hover:bg-amber-50/40"}`}>

                                                    <input type="radio" name="service" value={item} checked={active} onChange={handleChange} className="sr-only" />

                                                    <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${active ? "border-amber-500 bg-amber-500" : "border-stone-300"}`}>
                                                        {active && <span className="w-2 h-2 rounded-full bg-white block" />}
                                                    </span>

                                                    {item}
                                                </label>
                                            );
                                        })}
                                    </div>
                                    {errors.service && <p className="err-anchor text-xs text-red-500 flex items-center gap-1.5 mt-2 font-medium"><span>⚠</span>{errors.service}</p>}

                                    {/* ── 05 Description ── */}
                                    <SectionLabel num="06">Project Details</SectionLabel>
                                    <FieldWrap>
                                        <FieldLabel>Project Description</FieldLabel>
                                        <textarea
                                            name="description"
                                            placeholder="Describe your vision, space requirements, style preferences, or any other details that would help us understand your project..."
                                            className={`${inputCls} min-h-[130px] resize-y`}
                                            onChange={handleChange}
                                            value={form.description}
                                        />
                                    </FieldWrap>

                                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                                        <FieldWrap>
                                            <FieldLabel>Budget Range</FieldLabel>
                                            <input name="budget" placeholder="e.g. ₹50L – ₹1Cr" className={inputCls} onChange={handleChange} value={form.budget} />
                                        </FieldWrap>
                                        <FieldWrap>
                                            <FieldLabel>Preferred Timeline</FieldLabel>
                                            <input name="timeline" placeholder="e.g. 6 months" className={inputCls} onChange={handleChange} value={form.timeline} />
                                        </FieldWrap>
                                    </div>



                                    {/* ── Submit ── */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full mt-10 py-4 bg-stone-900 hover:bg-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-base font-semibold rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-amber-700/25 active:translate-y-0 tracking-wide"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Submit Inquiry
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                    <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </>
                                        )}
                                    </button>

                                </form>
                            </div>
                        </div>

                        {/* ── RIGHT: Sticky sidebar ── */}
                        <div className="lg:sticky lg:top-8 flex flex-col gap-5">

                            {/* Why Us */}
                            {/* <div className="bg-white rounded-3xl border border-stone-200 shadow-lg shadow-stone-100 p-7">
                                <h4 className="font-bold text-stone-900 text-base mb-5 tracking-tight">Why Choose H&A?</h4>
                                <div className="flex flex-col gap-4">
                                    {[
                                        ["🏛", "Award-Winning Design", "Recognized for architectural excellence across India"],
                                        ["⚡", "Fast Turnaround", "Initial design concepts delivered within 7 days"],
                                        ["🤝", "Dedicated Team", "A single point of contact throughout your project"],
                                        ["💎", "Premium Quality", "Every project crafted with meticulous attention to detail"],
                                    ].map(([icon, title, desc]) => (
                                        <div key={title} className="flex gap-3">
                                            <span className="text-xl leading-none mt-0.5">{icon}</span>
                                            <div>
                                                <p className="text-sm font-semibold text-stone-800">{title}</p>
                                                <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">{desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}

                            {/* Contact info */}
                            <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-7 text-white">
                                <h4 className="font-bold text-base mb-1 tracking-tight">Prefer to call?</h4>
                                <p className="text-stone-400 text-xs mb-5">We're available Mon–Sat, 9am to 7pm</p>
                                <div className="flex flex-col gap-3">
                                    <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-stone-300 hover:text-amber-400 transition-colors">
                                        <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-base">📞</span>
                                        +91 7046075797
                                    </a>
                                    <a href="mailto:contact.hasmitarchitects@gmail.com" className="flex items-center gap-3 text-sm text-stone-300 hover:text-amber-400 transition-colors">
                                        <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-base p-3">✉️</span>
                                        contact.hasmitarchitects@gmail.com
                                    </a>
                                    <a href="#" className="flex items-center gap-3 text-sm text-stone-300 hover:text-amber-400 transition-colors">
                                        <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-base">📍</span>
                                        Umbergoan, Gujarat
                                    </a>
                                </div>
                            </div>

                            {/* Response time badge */}
                            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl flex-shrink-0">⏱</div>
                                <div>
                                    <p className="text-sm font-bold text-stone-800">Avg. Response Time</p>
                                    <p className="text-xs text-stone-500 mt-0.5">We reply within <span className="text-amber-700 font-semibold">2–4 hours</span> on business days</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}