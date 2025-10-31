import { useEffect, useState } from "react";
import ExperienceCard from "../components/ExperienceCard";
import { api } from "../lib/api";
import Header from "../components/Header";
import React from "react";

export default function Home() {
    const [experiences, setExperiences] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        api.getExperiences().then(setExperiences).catch(() => setExperiences([]));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header search={search} setSearch={setSearch} />
            {/* Grid */}
            <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {experiences
                        .filter((exp) => exp.name.toLowerCase().includes(search.toLowerCase()))
                        .map((exp) => (
                            <ExperienceCard key={exp.id} experience={exp} />
                        ))}
                </div>
            </main>
        </div>
    );
}


