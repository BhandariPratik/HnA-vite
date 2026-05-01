import { Link } from "react-router-dom";

const projectTypes = [
    { label: "Architecture.", slug: "architecture" },
    { label: "Interior.", slug: "interior" },
    { label: "Landscape.", slug: "landscape" },
    { label: "Master Planning.", slug: "master-planning" },
    { label: "Furniture.", slug: "furniture" },
];

const ProjectType = () => {
    return (
        <section className="min-h-[calc(100vh-68px)] bg-white mt-5 px-5 py-10 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="mb-10 w-full overflow-hidden whitespace-nowrap">
                <div className="marquee-x inline-flex min-w-max items-center gap-12 pr-12">
                    {[1, 2, 3, 4].map((item) => (
                        <span
                            key={item}
                            className="text-xl font-semibold leading-snug tracking-wide text-[#d1682c] sm:text-2xl md:text-3xl lg:text-[2rem]"
                        >
                            Constructing spatial intelligence through clarity of form, material, and intent.
                        </span>
                    ))}
                </div>
            </div>

            <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                <div
                    className="relative min-h-[320px] overflow-hidden bg-cover bg-center sm:min-h-[440px] lg:min-h-[520px]"
                    style={{
                        backgroundImage: "url('/project1_bwi.jpeg')",
                    }}
                >
                    <div className="absolute inset-0 bg-white/80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/45 to-white/85" />
                    <p className="absolute right-4 top-1/2 origin-center -translate-y-1/2 rotate-[-90deg] whitespace-nowrap text-lg font-bold tracking-wide text-stone-600 sm:right-8 sm:text-2xl">
                        Good design is as little design as possible
                    </p>
                </div>

                <div className="flex flex-col justify-center">
                    <p className=" text-lg font-semibold lowercase tracking-wide text-black/70 sm:text-xl">
                        explore our work.
                    </p>

                    <div className=" flex flex-col items-start gap-2 sm:mt-12">
                        {projectTypes.map((type) => (
                            <Link
                                key={type.slug}
                                to={`/projects/${type.slug}`}
                                className="origin-left text-left text-xl font-bold text-[#d1682c] transition duration-300 hover:scale-110 hover:text-[#b75522] focus:outline-none focus-visible:scale-110 focus-visible:text-[#b75522] sm:text-2xl"
                            >
                                {type.label}
                            </Link>
                        ))}
                    </div>

                    <p className="mt-10 max-w-md text-sm font-semibold leading-tight text-[#d1682c]/30 sm:ml-24 sm:mt-12">
                        A careful mix of structure, proportion, and a considered eye for getting things just right.
                        Because good design is obvious, but only when it's done well.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProjectType;
