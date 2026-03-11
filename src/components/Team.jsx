const team = [
    {
        name: "Ar. Hasmit Bhandari",
        role: "Founder & Principal Architect",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Ar. Amiksha Patil",
        role: "Co-Founder & Senior Architect (Mumbai)",
        img: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
        name: "Ar. Dipika Chabadiya",
        role: "Senior Architect & Visualiser (Auckland)",
        img: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
        name: "Er. Dhruvil Bhandari",
        role: "Civil Engineer",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Er. Chirag Patel",
        role: "Liaison Specialist (External Collaborator)",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Hritik Bhandari",
        role: "Graphics Designer",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
];

const Team = () => {
    return (
        <section id="team" className="py-28 bg-black px-6 text-white">

            <div className="max-w-7xl mx-auto text-center">

                <h2 className="text-4xl md:text-5xl font-semibold tracking-wide mb-4">
                    Our Design Team
                </h2>

                <p className="text-gray-400 mb-14">
                    Creative & Passionate Brains of HASMiT & ARCHiTECTS
                </p>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">

                    {team.map((member, i) => (

                        <div
                            key={i}
                            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:bg-white/10 transition duration-500 hover:-translate-y-2"
                        >

                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-28 h-28 mx-auto rounded-full object-cover mb-5 border border-white/20 group-hover:scale-105 transition"
                            />

                            <h3 className="text-xl font-semibold mb-1">
                                {member.name}
                            </h3>

                            <p className="text-gray-400 text-sm transition duration-300 group-hover:text-white group-hover:font-semibold">
                                {member.role}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default Team;