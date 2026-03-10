const team = [
    { name: "John Carter", role: "Architect" },
    { name: "Emily Watson", role: "Interior Designer" },
    { name: "Michael Lee", role: "Project Manager" },
];

const Team = () => {

    return (

        <section id="team" className="py-24 bg-black px-6">

            <div className="max-w-7xl mx-auto text-center">

                <h2 className="text-4xl mb-12">
                    Our Team
                </h2>

                <div className="grid md:grid-cols-3 gap-10">

                    {team.map((member, i) => (

                        <div key={i} className="p-6 border border-gray-800 rounded-lg">

                            <img
                                src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                                className="w-28 h-28 mx-auto rounded-full mb-4"
                            />

                            <h3 className="text-xl">
                                {member.name}
                            </h3>

                            <p className="text-gray-400">
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