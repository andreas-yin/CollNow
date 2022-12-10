const Intro = () => {
  return (
    <section className="bg-indigo-50 my-8 px-3 py-4 flex flex-col space-y-4 items-start overflow-hidden border border-slate-200 shadow-md rounded-lg">
      <h2 className="font-semibold text-2xl text-slate-700">
        Eine gute Frage verfassen
      </h2>
      <div className="text-slate-500">
        <p><strong className="font-semibold">Schritte:</strong></p>
        <ul className="marker:text-sky-400 list-disc px-4">
          <li>Fasse deine Frage in einem einzeiligen Titel zusammen.</li>
          <li>Füge relevante Daten deines Patienten ein.</li>
          <li>Beschreibe dein Problem.</li>
          <li>Füge "Tags" hinzu, damit deine Kollegen deine Frage schneller finden können.</li>
        </ul>
      </div>
    </section>
  );
}

export default Intro;