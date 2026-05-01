import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { project_JSON } from "../projectdata";

const NAVBAR_HEIGHT = "40px";

/* ─── Lightbox ───────────────────────────────────────────────────────────── */
const Lightbox = ({ images, activeIndex, onClose, onPrev, onNext }) => {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose, onPrev, onNext]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95"
            onClick={onClose}
        >
            <button
                className="absolute top-5 right-6 text-white text-3xl leading-none z-10 hover:text-gray-300 transition-colors"
                onClick={onClose}
            // style={{ fontFamily: "Georgia, serif" }}
            >
                ×
            </button>
            <button
                className="absolute left-4 sm:left-8 text-white z-10 p-2 hover:text-gray-300 transition-colors"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>
            <img
                src={images[activeIndex]}
                alt={`Gallery ${activeIndex + 1}`}
                className="max-w-[90vw] max-h-[85vh] object-contain"
                onClick={(e) => e.stopPropagation()}
                style={{ boxShadow: "0 25px 80px rgba(0,0,0,0.6)" }}
            />
            <button
                className="absolute right-4 sm:right-8 text-white z-10 p-2 hover:text-gray-300 transition-colors"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>
            <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm tracking-widest opacity-60"
            // style={{ fontFamily: "Georgia, serif" }}
            >
                {activeIndex + 1} / {images.length}
            </div>
        </div>
    );
};

/* ─── Main Page ──────────────────────────────────────────────────────────── */
const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = project_JSON.find((p) => p.id === parseInt(id));

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, [id]);

    if (!project) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-400 text-lg">Project not found.</p>
            </div>
        );
    }

    const openLightbox = (index) => { setActiveImg(index); setLightboxOpen(true); };
    const closeLightbox = () => setLightboxOpen(false);
    const prevImg = () => setActiveImg((i) => (i - 1 + project.galleryImages.length) % project.galleryImages.length);
    const nextImg = () => setActiveImg((i) => (i + 1) % project.galleryImages.length);

    return (
        <div style={{ paddingTop: NAVBAR_HEIGHT }}>

            {/* ── BANNER ─────────────────────────────────────────────────────── */}
            <div className="relative w-full overflow-hidden" style={{ height: "clamp(320px, 60vw, 680px)" }}>
                <img
                    src={project.bannerImage}
                    alt={project.name}
                    className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.45) 100%)",
                    }}
                />

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-5 left-5 sm:top-8 sm:left-8 flex items-center gap-2 text-white text-md font-bold tracking-widest uppercase hover:opacity-70 transition-opacity"
                //   style={{ fontFamily: "Georgia, serif" }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back
                </button>

                {/* ── META STRIP — Option A: orange top-border accent, transparent gray bg ── */}
                {/* ── META STRIP ── */}
                <div className="absolute bottom-0 left-0 right-0">

                    {/* Single orange top border across full width */}
                    <div style={{ borderTop: "2px solid #d1682c" }}>
                        <div
                            className="flex flex-row items-stretch"
                            style={{
                                background: "rgba(120,110,100,0.28)",
                                backdropFilter: "blur(10px)",
                                WebkitBackdropFilter: "blur(10px)",
                            }}
                        >

                            {/* TYPE */}
                            <div
                                className="flex-1 px-3 py-3 sm:px-8 sm:py-5 items-center text-center"
                                style={{ borderRight: "1px solid rgba(255,255,255,0.12)" }}
                            >
                                <p
                                    className="tracking-widest uppercase mb-1"
                                    style={{
                                        color: "rgba(255,255,255,0.55)",
                                        fontSize: "clamp(0.55rem, 1.2vw, 0.7rem)",
                                    }}
                                >
                                    Typology
                                </p>
                                <p
                                    className="font-semibold tracking-wide uppercase leading-tight"
                                    style={{
                                        color: "#d1682c",
                                        fontSize: "clamp(0.65rem, 1.4vw, 1rem)",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    {project.type}
                                </p>
                            </div>

                            {/* PROJECT AREA */}
                            <div
                                className="flex-1 px-3 py-3 sm:px-8 sm:py-5 items-center text-center"
                                style={{ borderRight: "1px solid rgba(255,255,255,0.12)" }}
                            >
                                <p
                                    className="tracking-widest uppercase mb-1"
                                    style={{
                                        color: "rgba(255,255,255,0.55)",
                                        fontSize: "clamp(0.55rem, 1.2vw, 0.7rem)",
                                    }}
                                >
                                    Area
                                </p>
                                <p
                                    className="font-semibold tracking-wide uppercase leading-tight"
                                    style={{
                                        color: "#d1682c",
                                        fontSize: "clamp(0.65rem, 1.4vw, 1rem)",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    {project.area}
                                </p>
                            </div>

                            {/* YEAR */}
                            <div
                                className="px-3 py-3 sm:px-8 sm:py-5 items-center text-center"
                                style={{ minWidth: "60px" }}
                            >
                                <p
                                    className="tracking-widest uppercase mb-1"
                                    style={{
                                        color: "rgba(255,255,255,0.55)",
                                        fontSize: "clamp(0.55rem, 1.2vw, 0.7rem)",
                                    }}
                                >
                                    Year
                                </p>
                                <p
                                    className="font-semibold tracking-wide leading-tight"
                                    style={{
                                        color: "#d1682c",
                                        fontSize: "clamp(0.65rem, 1.4vw, 1rem)",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    {project.year}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* ── PROJECT INFO ───────────────────────────────────────────────── */}
            <section className="bg-white px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 sm:py-16 md:py-20">
                <div className="max-w-5xl">
                    <h1
                        className="mb-1 leading-tight"
                        style={{
                            //   fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            color: "#1a1a1a",
                            fontWeight: 600,
                        }}
                    >
                        {project.name}
                    </h1>
                    <p
                        className="mb-4 sm:mb-4"
                        style={{
                            //   fontFamily: "Georgia, serif",
                            fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
                            color: "#d1682c",
                            letterSpacing: "0.04em",
                        }}
                    >
                        {project.location}
                    </p>
                    <div className="w-12 h-px mb-4 sm:mb-4" style={{ backgroundColor: "#d1682c" }} />
                    <div className="space-y-4 mb-0">
                        {project.description.map((para, i) => (
                            <p key={i} style={{
                                // fontFamily: "Georgia, serif",
                                fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                                color: "#444",
                                lineHeight: 1.2,
                            }}>
                                {para}
                            </p>
                        ))}
                    </div>
                    {/* <div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-0"
                        style={{ borderTop: "1px solid #e5e5e5", borderLeft: "1px solid #e5e5e5" }}
                    >
                        {[
                            { label: "Type", value: project.type },
                            { label: "Area", value: project.area },
                            { label: "Year", value: project.year },
                        ].map((spec) => (
                            <div key={spec.label} className="px-6 py-5"
                                style={{ borderRight: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5" }}>
                                <p className="text-xs tracking-widest uppercase mb-2"
                                    style={{
                                        color: "#d1682c",
                                        //    fontFamily: "Georgia, serif" 
                                    }}>
                                    {spec.label}
                                </p>
                                <p className="text-sm sm:text-base font-medium"
                                    style={{
                                        //  fontFamily: "'Cormorant Garamond', Georgia, serif",
                                        color: "#1a1a1a", letterSpacing: "0.03em"
                                    }}>
                                    {spec.value}
                                </p>
                            </div>
                        ))}
                    </div> */}
                </div>
            </section>

            {/* ── GALLERY ────────────────────────────────────────────────────── */}
            <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-16 sm:pb-20"
                style={{ backgroundColor: "#f9f7f5" }}>
                <div className="py-2">
                    <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase"
                        style={{
                            color: "#d1682c",
                            // fontFamily: "Georgia, serif"
                        }}>
                        Project Gallery
                    </p>
                    <div className="w-10 h-px mt-2" style={{ backgroundColor: "#d1682c" }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-2 sm:gap-y-3">
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 sm:gap-x-12 lg:gap-x-16 gap-y-2 sm:gap-y-3" > */}
                    {project.galleryImages.map((img, index) => (
                        <div
                            key={index}
                            className="overflow-hidden cursor-pointer group relative"
                            style={{ aspectRatio: "4/3" }}
                            onClick={() => openLightbox(index)}
                        >
                            <img
                                src={img}
                                alt={`${project.name} — ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                loading="lazy"
                            />
                            <div
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                style={{ background: "rgba(0,0,0,0.28)" }}
                            >
                                <div className="w-10 h-10 flex items-center justify-center"
                                    style={{ border: "1px solid rgba(255,255,255,0.8)", borderRadius: "50%" }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 3 21 3 21 9" />
                                        <polyline points="9 21 3 21 3 15" />
                                        <line x1="21" y1="3" x2="14" y2="10" />
                                        <line x1="3" y1="21" x2="10" y2="14" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {lightboxOpen && (
                <Lightbox
                    images={project.galleryImages}
                    activeIndex={activeImg}
                    onClose={closeLightbox}
                    onPrev={prevImg}
                    onNext={nextImg}
                />
            )}
        </div>
    );
};

export default ProjectDetail;
