"use client";

import Image from "next/image";

type CharacterCardProps = {
  id: string;
  name: string;
  image: string;
  species: string;
};

export default function CharacterCard({ id, name, image, species }: CharacterCardProps) {
  return (
    <div key={id} className="text-center p-4 border rounded-lg shadow-sm bg-white">
      <Image
        src={image}
        alt={name}
        width={128}
        height={128}
        className="rounded-full mx-auto mb-2"
      />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-500">{species}</p>
    </div>
  );
}
