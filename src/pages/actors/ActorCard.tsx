import { showImage } from "../../util/API"


interface iBaseActor {
  name: string,
  profile_path: string,
  known_for: {title?: string, name?: string}[]
}

export default function ActorCard<T extends iBaseActor>({person}: {person: T}): React.JSX.Element {

  const personImg = showImage(person.profile_path);
  const personName = person.name;
  const personKnownFor = person.known_for.map(title => {
    return title.title ?? title.name;
  });


  return (
    <section className="bg-[#ffffffe2] rounded-xl overflow-hidden space-y-1.5 pb-4">
      <div className="overflow-hidden">
        <img width="100%" className="object-cover" src={personImg} alt={personName} />
      </div>

      <h2 className="font-bold text-2xl mt-8 px-4">{personName}</h2>

      <p className="text-gray-700 px-4">{personKnownFor.join(", ")}</p>
    </section>
  )
}