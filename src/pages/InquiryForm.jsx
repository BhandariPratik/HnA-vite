import { useState } from "react";
import { SOCIAL_LINKS } from "../data/siteData";
import "./InquiryForm.css";

// ── API ───────────────────────────────────────────────────────────────────────
const apiUrl = import.meta.env.VITE_API_URL;

// ── Validation ────────────────────────────────────────────────────────────────
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = {
  clientName: (v) => (!v?.trim() ? "Client name is required" : null),
  contactNumber: (v) => {
    if (!v?.trim()) return "Contact number is required";
    if (!/^\d{10}$/.test(v.trim())) return "Enter a valid 10-digit number";
    return null;
  },
  email: (v) => {
    if (!v?.trim()) return null;
    if (!emailRegex.test(v.trim())) return "Enter a valid email address";
    return null;
  },
  location: (v) => (!v?.trim() ? "Site address is required" : null),
  scope: (v) => (!v?.length ? "Select at least one scope of work" : null),
  projectType: (v) => (!v?.length ? "Select a project type" : null),
  service: (v) => (!v?.trim() ? "Select a service requirement" : null),
};

const runValidation = (data) => {
  const errors = {};
  Object.entries(schema).forEach(([field, fn]) => {
    const msg = fn(data[field]);
    if (msg) errors[field] = msg;
  });
  return errors;
};

// ── Static data ───────────────────────────────────────────────────────────────
const SCOPES = ["Architectural Design", "Interior Design", "Landscape Design", "Renovation / Remodeling", "3D Visualization"];
const TYPES = ["Residential", "Commercial", "Hospitality", "Housing", "Institutional", "Industrial"];
const SERVICES = [
  { value: "Design Consultancy", label: "Design Consultancy Service" },
  { value: "Design Turnkey Execution", label: "Design Consultancy + Turnkey Execution Service" },
  { value: "Online Consultancy", label: "Online Consultancy Service" },
];

const EMPTY_FORM = {
  clientName: "", companyName: "", contactNumber: "", email: "",
  billingAddress: "", location: "", scopeOther: "", projectTypeOther: "",
  description: "", budget: "", timeline: "",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function InquiryForm() {
  const [scope, setScope] = useState([]);
  const [projectType, setProjectType] = useState("");
  const [service, setService] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  console.log("error-------->", errors)

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((err) => ({ ...err, [k]: null }));
  };

  const toggle = (arr, setArr, val, field) => {
    const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
    setArr(next);
    if (errors[field]) setErrors((err) => ({ ...err, [field]: null }));
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setScope([]); setProjectType(""); setService("");
    setErrors({}); setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build payload with arrays for validation
    const payload = { ...form, scope, projectType, service };
    const errs = runValidation(payload);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      setTimeout(() => {
        document.querySelector(".field-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }

    setLoading(true);
    try {
      await fetch(`${apiUrl}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          scope: [...scope, form.scopeOther].filter(Boolean),
          projectType: projectType,
          service,
        }),
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <main className="inquiry-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div style={{ textAlign: "center", maxWidth: "32rem" }}>
          <h2 style={{ color: "var(--title-tone)", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 700, marginBottom: "1rem" }}>
            Inquiry Sent!
          </h2>
          <p style={{ color: "var(--ink)", fontSize: "small", lineHeight: 1.8, marginBottom: "2rem" }}>
            Thank you for approaching Hasmit and Architects. We will reach out to you at the earliest.
          </p>
          <button className="btn-submit-action" onClick={reset}>
            <span>Submit Another Inquiry</span>
          </button>

          <button className="btn-submit-action" style={{ margin: "10px" }} onClick={() => window.open("/", "_self")}>
            <span>Explore our work</span>
          </button>
        </div>
      </main>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <main className="inquiry-card">
      <div className="studio-branding-tag">HASMiT &amp; ARCHiTECTS</div>

      <div className="header-main-block">
        <div className="inquiry-header-row">
          <div className="inquiry-title-wrap"><h1>Project Inquiry Form</h1></div>
          <button type="button" className="btn-capsule-secondary" onClick={reset}>
            New Project Form
          </button>
        </div>
        <div className="form-narrative-intro">
          Welcome! Please take a moment to fill out this form and share your project needs with us.
          Your input will guide us in creating customised design solutions tailored to your requirements. Thank you!
        </div>
      </div>

      <div className="header-divider-line" />
      <div className="required-fields-label">Fields marked <span>*</span> are required</div>

      <form className="inquiry-form" onSubmit={handleSubmit} noValidate>

        {/* 01 Client Info */}
        <section className="form-step-section">
          <div className="step-heading">
            <span className="step-number">01</span>
            <h2 className="step-title">Client Information</h2>
          </div>
          <div className="fields-grid">
            <div className="field-group">
              <label htmlFor="client_name">Client Name <span>*</span></label>
              <input type="text" id="client_name" className={`input-control${errors.clientName ? " input-error" : ""}`} placeholder="John Doe" value={form.clientName} onChange={set("clientName")} />
              {errors.clientName && <p className="field-error">{errors.clientName}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="company_name">Company Name</label>
              <input type="text" id="company_name" className="input-control" placeholder="Optional" value={form.companyName} onChange={set("companyName")} />
            </div>

            <div className="field-group">
              <label htmlFor="contact_number">Contact Number <span>*</span></label>
              <input type="tel" id="contact_number" className={`input-control${errors.contactNumber ? " input-error" : ""}`} placeholder="10-digit number" maxLength={10} value={form.contactNumber} onChange={set("contactNumber")} />
              {errors.contactNumber && <p className="field-error">{errors.contactNumber}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="email_address">Email Address</label>
              <input type="email" id="email_address" className={`input-control${errors.email ? " input-error" : ""}`} placeholder="you@example.com (Optional)" value={form.email} onChange={set("email")} />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="field-group full-width">
              <label htmlFor="client_address">Client Address</label>
              <input type="text" id="client_address" className="input-control" placeholder="Full address (optional)" value={form.billingAddress} onChange={set("billingAddress")} />
            </div>
          </div>
        </section>

        {/* 02 Project & Location */}
        <section className="form-step-section">
          <div className="step-heading">
            <span className="step-number">02</span>
            <h2 className="step-title">Project &amp; Location</h2>
          </div>
          <div className="fields-grid">
            <div className="field-group full-width">
              <label htmlFor="site_address">Site Address <span>*</span></label>
              <input type="text" id="site_address" className={`input-control${errors.site_address ? " input-error" : ""}`} placeholder="City, State" value={form.location} onChange={set("location")} />
              {errors.location && <p className="field-error">{errors.location}</p>}
            </div>
          </div>
        </section>

        {/* 03 Scope */}
        <section className="form-step-section">
          <div className="step-heading">
            <span className="step-number">03</span>
            <h2 className="step-title">Scope of Work <span>*</span></h2>
          </div>
          <div className="chips-matrix">
            {SCOPES.map((s) => (
              <label key={s} className="chip-item">
                <input type="checkbox" checked={scope.includes(s)} onChange={() => toggle(scope, setScope, s, "scope")} />
                <span className="chip-surface">{s}</span>
              </label>
            ))}
          </div>
          <div className="field-group" style={{ marginTop: ".65rem" }}>
            <input type="text" className="input-control" placeholder="Other scope (optional)" value={form.scopeOther} onChange={set("scopeOther")} />
          </div>
          {errors.scope && <p className="field-error">{errors.scope}</p>}
        </section>

        {/* 04 Project Type */}
        <section className="form-step-section">
          <div className="step-heading">
            <span className="step-number">04</span>
            <h2 className="step-title">Project Type <span>*</span></h2>
          </div>
          <div className="chips-matrix">
            {TYPES.map((t) => (
              <label key={t} className="chip-item">
                <input type="radio" name="projectType" checked={projectType === t} onChange={() => { setProjectType(t), setErrors((err) => ({ ...err, projectType: null })) }} />
                <span className="chip-surface">{t}</span>
              </label>
            ))}
          </div>
          <div className="field-group" style={{ marginTop: ".65rem" }}>
            <input type="text" className="input-control" placeholder="Other type (optional)" value={form.projectTypeOther} onChange={set("projectTypeOther")} />
          </div>
          {errors.projectType && <p className="field-error">{errors.projectType}</p>}
        </section>

        {/* 05 Service */}
        <section className="form-step-section">
          <div className="step-heading">
            <span className="step-number">05</span>
            <h2 className="step-title">Service Requirements <span>*</span></h2>
          </div>
          <div className="services-panel-list">
            {SERVICES.map((s) => (
              <label key={s.value} className="service-panel-card">
                <input type="radio" name="service" value={s.value} checked={service === s.value} onChange={() => { setService(s.value); if (errors.service) setErrors((err) => ({ ...err, service: null })); }} />
                <div className="service-panel-surface">
                  <span className="radio-indicator-ring" />
                  <span className="service-title-text">{s.label}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.service && <p className="field-error">{errors.service}</p>}
        </section>

        {/* 06 Details */}
        <section className="form-step-section">
          <div className="step-heading">
            <span className="step-number">06</span>
            <h2 className="step-title">Project Details</h2>
          </div>
          <div className="fields-grid">
            <div className="field-group full-width">
              <label htmlFor="project_description">Project Description</label>
              <textarea id="project_description" className="input-control" placeholder="Describe your vision, space requirements, style preferences..." value={form.description} onChange={set("description")} />
            </div>
            <div className="field-group">
              <label htmlFor="budget_range">Budget Range</label>
              <input type="text" id="budget_range" className="input-control" placeholder="e.g. ₹50L – ₹1Cr" value={form.budget} onChange={set("budget")} />
            </div>
            <div className="field-group">
              <label htmlFor="preferred_timeline">Preferred Timeline</label>
              <input type="text" id="preferred_timeline" className="input-control" placeholder="e.g. 6 months" value={form.timeline} onChange={set("timeline")} />
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="action-submit-row">
          <button type="submit" className="btn-submit-action" disabled={loading}>
            {loading ? (
              <div className="submit-overlay" role="alert" aria-live="assertive">
                <div className="submit-overlay-card">
                  <span className="submit-spinner" aria-hidden="true" />
                  <h2 className="submit-overlay-title">{'Hang tight!'}</h2>
                  <p className="submit-overlay-text">{"We're finishing up. Please don't refresh or close this page."}</p>
                </div>
              </div>
            ) : (
              <>
                <span>Submit Inquiry</span>
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </>
            )}
          </button>
        </div>
      </form>

      <footer className="form-footer-contact-block">
        <div className="footer-contact-item"><h3>Phone</h3><a href="tel:+917567363999">+91 75673 63999</a></div>
        <div className="footer-contact-item"><h3>Email</h3><a href="mailto:hasmitandarchitects@gmail.com">hasmitandarchitects@gmail.com</a></div>
        <div className="footer-contact-item"><h3>Location</h3><a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Get Studio Directions →</a></div>
      </footer>

      <div className="social-footer-container">
        <div className="social-icons-bubble-bar">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon-round-link" aria-label={s.label}>
              <i className={s.faIcon}></i>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}