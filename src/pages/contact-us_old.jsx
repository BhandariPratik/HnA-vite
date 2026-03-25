import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export default function ContactPage() {
    const [form, setForm] = useState({
        clientName: "",
        companyName: "",
        contactNumber: "",
        email: "",
        scope: [],
        scopeOther: "",
        projectType: [],
        projectTypeOther: "",
        service: "",
        description: "",
        budget: "",
        timeline: "",
        location: "",
        billingAddress: "",
    });

    const [errors, setErrors] = useState({});

    console.log("end point", apiUrl)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCheckbox = (e, field) => {
        const value = e.target.value;
        setForm((prev) => {
            const updated = prev[field].includes(value)
                ? prev[field].filter((v) => v !== value)
                : [...prev[field], value];
            return { ...prev, [field]: updated };
        });
    };

    const validate = () => {
        let err = {};

        if (!form.clientName) err.clientName = "Client name is required";
        if (!form.contactNumber) err.contactNumber = "Contact number is required";
        if (!form.email) err.email = "Email is required";
        if (form.scope.length === 0) err.scope = "Select at least one scope";
        if (form.projectType.length === 0) err.projectType = "Select project type";
        if (!form.service) err.service = "Select service";
        if (!form.location) err.location = "Location is required";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            await fetch(apiUrl + "/submit",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                });
        }
    };

    return (
        <div className="bg-black text-white">

            {/* HERO SECTION */}
            <div className="h-[60vh] bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')] bg-cover bg-center relative flex items-center justify-center">
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative text-center">
                    <h1 className="text-4xl md:text-5xl font-semibold">Start Your Project</h1>
                    <p className="mt-3 text-gray-300">Let’s build something meaningful together</p>
                </div>
            </div>

            {/* FORM */}
            <div className="max-w-5xl mx-auto p-6 -mt-20 relative z-10">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* BASIC */}
                        <div className="grid md:grid-cols-2 gap-4">

                            {/* Client Name */}
                            <div>
                                <input
                                    name="clientName"
                                    placeholder="Client Name *"
                                    className="input"
                                    onChange={handleChange}
                                />
                                {errors.clientName && (
                                    <p className="text-red-400 text-sm mt-1">{errors.clientName}</p>
                                )}
                            </div>

                            {/* Company Name */}
                            <div>
                                <input
                                    name="companyName"
                                    placeholder="Company Name"
                                    className="input"
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Contact Number */}
                            <div>
                                <input
                                    name="contactNumber"
                                    placeholder="Contact Number *"
                                    className="input"
                                    onChange={handleChange}
                                />
                                {errors.contactNumber && (
                                    <p className="text-red-400 text-sm mt-1">{errors.contactNumber}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <input
                                    name="email"
                                    placeholder="Email *"
                                    className="input"
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                        </div>

                        {/* ERRORS */}


                        {/* SCOPE */}
                        <div>
                            <label className="label">Scope of Work *</label>
                            {[
                                "Architectural Design",
                                "Renovation/Remodeling",
                                "Interior Design",
                                "Landscape Design",
                                "3D Visualization",
                            ].map((item) => (
                                <label key={item} className="block">
                                    <input
                                        type="checkbox"
                                        value={item}
                                        onChange={(e) => handleCheckbox(e, "scope")}
                                    />{" "}
                                    {item}
                                </label>
                            ))}

                            <input
                                name="scopeOther"
                                placeholder="Other..."
                                className="input mt-2"
                                onChange={handleChange}
                            />
                            <p className="text-red-400 text-sm">{errors.scope}</p>
                        </div>

                        {/* PROJECT TYPE */}
                        <div>
                            <label className="label">Project Type *</label>
                            {[
                                "Residential",
                                "Commercial",
                                "Hospitality",
                                "Housing",
                                "Institutional",
                                "Industrial",
                            ].map((item) => (
                                <label key={item} className="block">
                                    <input
                                        type="checkbox"
                                        value={item}
                                        onChange={(e) => handleCheckbox(e, "projectType")}
                                    />{" "}
                                    {item}
                                </label>
                            ))}

                            <input
                                name="projectTypeOther"
                                placeholder="Other..."
                                className="input mt-2"
                                onChange={handleChange}
                            />
                            <p className="text-red-400 text-sm">{errors.projectType}</p>
                        </div>

                        {/* SERVICE */}
                        <div>
                            <label className="label">Service Requirements *</label>
                            {[
                                "Design Consultancy Service",
                                "Design Consultancy + Turnkey Execution Service",
                                "Online Consultancy Service",
                            ].map((item) => (
                                <label key={item} className="block">
                                    <input
                                        type="radio"
                                        name="service"
                                        value={item}
                                        onChange={handleChange}
                                    />{" "}
                                    {item}
                                </label>
                            ))}
                            <p className="text-red-400 text-sm">{errors.service}</p>
                        </div>

                        {/* DESCRIPTION */}
                        <textarea
                            name="description"
                            placeholder="Project Description"
                            className="input h-28"
                            onChange={handleChange}
                        />

                        {/* BUDGET + TIMELINE */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="budget" placeholder="Budget Range" className="input" onChange={handleChange} />
                            <input name="timeline" placeholder="Timeline" className="input" onChange={handleChange} />
                        </div>

                        {/* LOCATION */}
                        <input name="location" placeholder="Project Location *" className="input" onChange={handleChange} />
                        <p className="text-red-400 text-sm">{errors.location}</p>

                        <input name="billingAddress" placeholder="Billing Address" className="input" onChange={handleChange} />

                        {/* SUBMIT */}
                        <button className="w-full py-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg transition">
                            Submit Inquiry
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}






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